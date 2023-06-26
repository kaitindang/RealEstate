package com.web.bds.blogservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableDiscoveryClient
@EnableJpaRepositories(basePackages = "com.web.bds.blogservice.repo")
public class BlogServiceApplication {
    public static void main(String args[]){
        SpringApplication.run(BlogServiceApplication.class,args);
    }
}
