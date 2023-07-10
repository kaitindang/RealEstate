package com.web.bds.productservice.service.impl;

import com.web.bds.productservice.entity.FileDetails;
import com.web.bds.productservice.dto.FileUploadResponse;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;

public interface FileUploadService {

    public FileUploadResponse uploadFile(MultipartFile file,
                                         int id_product) throws IOException;

    public List<FileDetails> getAllFiles();
}