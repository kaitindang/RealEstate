package com.web.bds.productservice.service;

import com.web.bds.productservice.exeption.FileNotSupportedException;
import com.web.bds.productservice.entity.FileDetails;
import com.web.bds.productservice.dto.FileUploadResponse;
import com.web.bds.productservice.repo.FileDetailsRepository;
import com.web.bds.productservice.service.impl.FileUploadService;
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
public class FileUploadSerivceImpl implements FileUploadService {

    public FileUploadSerivceImpl() throws IOException {}

    @Autowired
    private FileDetailsRepository fileDetailsRepository;

    private final Path UPLOAD_PATH =
            Paths.get(new ClassPathResource("").getFile().getAbsolutePath()
                    + File.separator + "static"
                    + File.separator + "image");

    @Override
    public FileUploadResponse uploadFile(MultipartFile file,
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

        FileDetails fileDetails = new FileDetails(file.getOriginalFilename(),
                                                fileUri,
                                                id_product);

        this.fileDetailsRepository.save(fileDetails);

        FileUploadResponse fileUploadResponse =
                new FileUploadResponse(fileDetails.getId(),
                        file.getOriginalFilename(), fileUri,
                        id_product);

        return fileUploadResponse;
    }

    @Override
    public List<FileDetails> getAllFiles() {
        return this.fileDetailsRepository.findAll();
    }

    @Override
    public List<FileDetails> getFilesById(int id) {
        return this.fileDetailsRepository.findFileDetailsById_product(id);
    }

}