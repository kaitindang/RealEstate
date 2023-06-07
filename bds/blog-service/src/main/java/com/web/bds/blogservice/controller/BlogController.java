package com.web.bds.blogservice.controller;

import com.web.bds.blogservice.entity.Blog;
import com.web.bds.blogservice.service.BlogServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/admin/blog")
public class BlogController {

    @Autowired
    BlogServices blogServices;

    @GetMapping("")
    public List<Blog> showBill() {

        return  blogServices.listAll();

    }

    @PostMapping("")
    public void add(@RequestBody Blog blog) {
        blogServices.add(blog);
    }

    @PutMapping("/{id_blog}")
    public ResponseEntity<Blog> update(@PathVariable int id_blog, @RequestBody Blog blog) {
        blog = blogServices.update(id_blog,blog);
        return ResponseEntity.ok(blog);
    }

    @GetMapping("/{id_blog}")
    public ResponseEntity<Blog> getById(@PathVariable int id_blog){
        Blog blog = null;
        blog = blogServices.findOne(id_blog);
        return ResponseEntity.ok(blog);
    }

    @DeleteMapping("/{id_blog}")
    public ResponseEntity<String> delete(@PathVariable int id_blog){

        Blog blog = null;
        blog = blogServices.findOne(id_blog);
        blog.setStatus_blog(false);
        blogServices.update(blog);
        return ResponseEntity.ok("deleted");
    }
}
