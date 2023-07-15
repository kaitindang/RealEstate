package com.web.bds.controller;

import com.web.bds.exeption.FileNotSupportedException;
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
import java.io.UncheckedIOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/photo")
public class PhotoController {
    @Autowired
    private PhotoService photoService;

    @PostMapping("/add")
    public ResponseEntity<Void> addPhoto(@RequestParam("title") String title,
                                           @RequestParam("image") MultipartFile image) throws IOException {
        int id = photoService.addPhoto(title, image);
        return ResponseEntity.ok().build();
    }

    @PostMapping(value = "/upload")
    public ResponseEntity<Object> uploadPhotos(@RequestParam("id_product") int id_product
            , @RequestParam("files") MultipartFile[] files) {

        try {
            List<Photo> photos =
                    Arrays.stream(files).map(file -> {
                        try {
                            return photoService.uploadPhoto(file, id_product);
                        } catch (IOException e) {
                            throw new UncheckedIOException(e);
                        }
                    }).collect(Collectors.toList());

            return new ResponseEntity<>(photos, HttpStatus.OK);
        } catch (UncheckedIOException e) {
            return new ResponseEntity<>(e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (FileNotSupportedException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<Photo>> getPhoto(@PathVariable int id) {
        return ResponseEntity.ok(photoService.getPhoto(id));
    }

}
