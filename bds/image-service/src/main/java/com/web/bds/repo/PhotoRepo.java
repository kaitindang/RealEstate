package com.web.bds.repo;

import com.web.bds.model.Photo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhotoRepo extends MongoRepository<Photo,Integer> {
}
