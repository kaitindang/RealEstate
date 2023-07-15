package com.web.bds.model;

import jakarta.persistence.Id;
import jakarta.persistence.Transient;
import lombok.*;
import org.bson.types.Binary;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Getter
@Setter
@Document(collection = "photo")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Photo {

    @Transient
    public static final String SEQUENCE_NAME="photo_sequence";
    @Id
    private int id;

    private int groupId;

    private String title;

    private Binary image;

    private String fileUri;

}
