package com.example.crawldata.repo;

import com.example.crawldata.model.Photo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface PhotoRepo extends MongoRepository<Photo,Integer> {

    @Query("{groupId:?0}")
    List<Photo> getPhotosByGroupId(int groupId);

}
