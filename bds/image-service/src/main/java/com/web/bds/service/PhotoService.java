package com.web.bds.service;

import com.web.bds.exeption.FileNotSupportedException;
import com.web.bds.model.Listing;
import com.web.bds.model.Photo;
import com.web.bds.repo.ListingRepo;
import com.web.bds.repo.PhotoRepo;
import org.apache.commons.io.IOUtils;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class PhotoService {
    @Autowired
    private PhotoRepo photoRepo;
    @Autowired
    private ListingRepo listingRepo;
    @Autowired
    private SequenceGeneratorService sequenceGeneratorService;

    public PhotoService() throws IOException {
    }

    public int addPhoto(String title, MultipartFile file) throws IOException {
        Photo photo = new Photo();
        photo.setImage(
                new Binary(BsonBinarySubType.BINARY, file.getBytes()));
        photo = photoRepo.insert(photo);
        return photo.getId();
    }

    public List<Photo> getPhoto(int id) {
        return photoRepo.findPhotosByGroupId(id);
    }

    private final Path UPLOAD_PATH =
            Paths.get(new ClassPathResource("").getFile().getAbsolutePath()
                    + File.separator + "static"
                    + File.separator + "image");


    public Photo uploadPhoto(MultipartFile file,
                                         int id_product) throws IOException {
        if (!Files.exists(UPLOAD_PATH)) {
            Files.createDirectories(UPLOAD_PATH);
        }

        // file format validation
        if (!file.getContentType().equals("image/jpeg") && !file.getContentType().equals("image/png")) {
            throw new FileNotSupportedException("only .jpeg and .png images are " + "supported");
        }

        String timeStampedFileName = new SimpleDateFormat("ssmmHHddMMyyyy")
                .format(new Date()) + "_" + file.getOriginalFilename();

        Path filePath = UPLOAD_PATH.resolve(timeStampedFileName);
        Files.copy(file.getInputStream(), filePath);

        String fileUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/image/").path(timeStampedFileName).toUriString();

//        FileDetails fileDetails = new FileDetails(file.getOriginalFilename(),
//                fileUri,
//                id_product);

        Photo photo = Photo.builder()
                .id(sequenceGeneratorService.getSequenceNumber(Photo.SEQUENCE_NAME))
                .groupId(id_product)
                .title(file.getOriginalFilename())
                .image(new Binary(BsonBinarySubType.BINARY,IOUtils.toByteArray(file.getOriginalFilename())))
                .fileUri(fileUri)
                .build();

        Listing updateListing = listingRepo.findById(id_product).orElse(null);
        updateListing.setImage_product(fileUri);
        listingRepo.save(updateListing);

        return photoRepo.save(photo);
    }


}
