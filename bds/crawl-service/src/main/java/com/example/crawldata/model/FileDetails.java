package com.example.crawldata.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "filedetails")
@Data
@Getter
@Setter
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