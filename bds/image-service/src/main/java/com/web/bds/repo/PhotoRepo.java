package com.web.bds.repo;

import com.web.bds.model.FileDetails;
import com.web.bds.model.Photo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PhotoRepo extends MongoRepository<Photo,Integer> {

    List<Photo> findPhotosByGroupId(int groupId);
}
