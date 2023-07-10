package com.web.bds.productservice.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;

@Entity
@Table(name = "filedetails")
@Data
@NoArgsConstructor
public class FileDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column
    private String fileName;
    @Column
    private String fileUri;

    @Column
    private int id_product;

    public FileDetails(String fileName, String fileUri, int id_product) {

        this.fileName = fileName;
        this.fileUri = fileUri;
        this.id_product = id_product;
    }
}