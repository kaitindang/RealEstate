package com.example.crawldata.repo;

import com.example.crawldata.model.FileDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FileDetailsRepo extends JpaRepository<FileDetails, Integer> {

}