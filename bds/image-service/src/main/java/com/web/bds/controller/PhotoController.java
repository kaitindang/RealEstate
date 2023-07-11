package com.web.bds.controller;

import com.web.bds.model.Photo;
import com.web.bds.service.PhotoService;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.IOException;

@RestController
@RequestMapping("/api/photo")
public class PhotoController {
    @Autowired
    private PhotoService photoService;

    @PostMapping("/add")
    public ResponseEntity<Void> addPhoto(@RequestParam("title") String title,
                                           @RequestParam("image") MultipartFile image) throws IOException {
        int id = photoService.addPhoto(title, image);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Photo> getPhoto(@PathVariable int id) {
        Photo photo = photoService.getPhoto(id);
        return new ResponseEntity<Photo>(photo, HttpStatus.OK);
    }
}
