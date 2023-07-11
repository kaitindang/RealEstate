package com.example.crawldata;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.io.IOException;


@SpringBootApplication
@EntityScan(basePackages = "com.example.crawldata.model")
@EnableJpaRepositories(basePackages = "com.example.crawldata.repo")
public class CrawldataApplication {

	public static void main(String[] args) throws IOException {
		SpringApplication.run(CrawldataApplication.class, args);

	}

}
