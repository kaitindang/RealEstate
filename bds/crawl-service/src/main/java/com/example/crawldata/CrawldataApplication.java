package com.example.crawldata;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.io.IOException;


@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.example.crawldata.repo")
public class CrawldataApplication {

	public static void main(String[] args) throws IOException {
		SpringApplication.run(CrawldataApplication.class, args);

	}

}
