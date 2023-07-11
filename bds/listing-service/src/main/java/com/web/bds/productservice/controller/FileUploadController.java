package com.web.bds.productservice.controller;

import com.web.bds.productservice.exeption.FileNotSupportedException;
import com.web.bds.productservice.entity.FileDetails;
import com.web.bds.productservice.dto.FileUploadResponse;
import com.web.bds.productservice.service.impl.FileUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.io.UncheckedIOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "file")
@CrossOrigin(origins = "http://localhost:3000")
public class FileUploadController {

    @Autowired
    private FileUploadService fileUploadService;

    @GetMapping
    @ResponseStatus(code = HttpStatus.OK)
    public List<FileDetails> getAllFiles() {
        return this.fileUploadService.getAllFiles();
    }

    @GetMapping(value = "/images-product/{id_product}")
    @ResponseStatus(code = HttpStatus.OK)
    public List<FileDetails> getFilesByProduct(@PathVariable("id_product") int id_product) {
        return this.fileUploadService.getFilesById(id_product);
    }

    @PostMapping(value = "/upload")
    public ResponseEntity<Object> uploadFiles(@RequestParam("id_product") int id_product
            , @RequestParam("files") MultipartFile[] files) {

        try {
            List<FileUploadResponse> fileUploadResponses =
                    Arrays.stream(files).map(file -> {
                        try {
                            return fileUploadService.uploadFile(file, id_product);
                        } catch (IOException e) {
                            throw new UncheckedIOException(e);
                        }
                    }).collect(Collectors.toList());

            return new ResponseEntity<>(fileUploadResponses, HttpStatus.OK);
        } catch (UncheckedIOException e) {
            return new ResponseEntity<>(e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (FileNotSupportedException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}