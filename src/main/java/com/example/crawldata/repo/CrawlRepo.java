package com.example.crawldata.repo;

import com.example.crawldata.model.Listing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CrawlRepo extends JpaRepository<Listing,Integer> {
}
