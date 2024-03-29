package com.example.crawldata.config;

import jakarta.annotation.PostConstruct;
import org.openqa.selenium.PageLoadStrategy;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SeleniumConfig {

    @PostConstruct
    void postConstruct(){
        System.setProperty("webdriver.chrome.driver","D://Eclipse/cntt2/chromedriver.exe");
    }


    @Bean
    public ChromeDriver driver(){
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--remote-allow-origins=*");
        options.setPageLoadStrategy(PageLoadStrategy.EAGER);

        return new ChromeDriver(options);
    }
}
