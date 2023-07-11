package com.example.crawldata.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.*;
import org.bson.types.Binary;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Service;

@Data
@Getter
@Setter
@Document(collection = "imagecollection")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Photo {
    @Id
    private int id;

    private int groupId;

    private String title;

    private Binary image;


}
