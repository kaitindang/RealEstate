package com.web.bds.blogservice.service;

import com.web.bds.blogservice.entity.Blog;
import com.web.bds.blogservice.repo.BlogRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
public class BlogServices implements Services<Blog>{

    @Autowired
    BlogRepo blogRepo;

    @Override
    public void delete(int id) {
        // TODO Auto-generated method stub
        blogRepo.deleteById(id);
    }

    @Override
    public void add(Blog b) {
        // TODO Auto-generated method stub
        blogRepo.save(b);
    }

    @Override
    public Blog findOne(int id) {
        // TODO Auto-generated method stub
        Blog blog =  blogRepo.findById(id).get();


        if(blog.getId_blog() == id) {
            return blog;
        }
        return null;
    }

    @Override
    public void update(Blog b) {
        // TODO Auto-generated method stub
        blogRepo.save(b);

    }

    @Override
    public Blog update(int id, Blog blog) {
        Blog b =  blogRepo.findById(id).get();
        b.setContent_blog(blog.getContent_blog());
        b.setId_blogcate(blog.getId_blogcate());
        b.setName_blog(blog.getName_blog());
        b.setPerson_modified(blog.getPerson_modified());
        b.setDate_modified(new Timestamp(System.currentTimeMillis()));
        blogRepo.save(b);
        return b;
    }

    @Override
    public List<Blog> listAll() {
        // TODO Auto-generated method stub
        List<Blog> blogs = blogRepo.findAll(true);

        return blogs;
    }

    @Override
    public List<Blog> listById(int id) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public List<Blog> listByName(String name) {
        // TODO Auto-generated method stub
        return null;
    }

    public List<Blog> listByString(String arg){
        List<Blog> bills = null;

        return null;
    }
}
