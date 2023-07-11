package com.web.bds.productservice.repo;

import com.web.bds.productservice.entity.FileDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FileDetailsRepository extends JpaRepository<FileDetails, Integer> {


    @Query(value = "SELECT p FROM FileDetails p " +
                    "WHERE p.id_product = :id_product ")
    List<FileDetails> findFileDetailsById_product(int id_product);
}