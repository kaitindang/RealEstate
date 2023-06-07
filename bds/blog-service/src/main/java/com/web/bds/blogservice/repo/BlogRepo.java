package com.web.bds.blogservice.repo;

import com.web.bds.blogservice.entity.Blog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogRepo extends JpaRepository<Blog,Integer> {
    @Query(value = "SELECT * FROM blog b WHERE b.status_blog = :status_blog",nativeQuery = true)
    public List<Blog> findAll(@Param("status_blog") boolean status_blog);
}
