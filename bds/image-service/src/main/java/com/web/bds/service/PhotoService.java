package com.web.bds.service;

import com.web.bds.model.Photo;
import com.web.bds.repo.PhotoRepo;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class PhotoService {
    @Autowired
    private PhotoRepo photoRepo;

    public int addPhoto(String title, MultipartFile file) throws IOException {
        Photo photo = new Photo();
        photo.setImage(
                new Binary(BsonBinarySubType.BINARY, file.getBytes()));
        photo = photoRepo.insert(photo);
        return photo.getId();
    }

    public Photo getPhoto(int id) {
        return photoRepo.findById(id).get();
    }

}
