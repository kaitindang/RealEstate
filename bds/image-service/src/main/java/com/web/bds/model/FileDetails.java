package com.web.bds.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Getter
@Setter
@Document(collection = "photo")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FileDetails {

    @Id
    private int id;

    private String fileName;

    private String fileUri;

    private int id_product;

    public FileDetails(String fileName, String fileUri, int id_product) {

        this.fileName = fileName;
        this.fileUri = fileUri;
        this.id_product = id_product;
    }
}