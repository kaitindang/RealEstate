package com.example.crawldata.service;

import com.example.crawldata.model.Listing;
import com.example.crawldata.repo.CrawlRepo;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import org.jsoup.select.Elements;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import java.sql.Timestamp;
import java.time.Duration;
import java.util.List;
import java.util.Random;
import java.util.concurrent.TimeUnit;

@Service
@AllArgsConstructor
public class CrawlService  {

    public static final  String URL = "https://batdongsan.com.vn/";

    private final ChromeDriver chromeDriver;

    @Autowired
    CrawlRepo crawlRepo;

    public void add(Listing a){
        crawlRepo.save(a);
    }

    @PostConstruct
    void postContruct(){
        crawl("");
    }


    public void crawl(final String value){
        Random random = new Random() ;
        chromeDriver.get(URL);
//        waitForLoad(chromeDriver);

//        List<WebElement> f = new WebDriverWait(chromeDriver, Duration.ofSeconds(10))
//            .until(ExpectedConditions.presenceOfAllElementsLocatedBy(By.xpath("//div[@class='re__product-item re__interested-product-card js__product-item']")));



        WebElement elements = chromeDriver.findElement(By.className("re__main"))
                            .findElement(By.cssSelector("div[class='re__home new-home-2020']"));
                                //.findElement(By.cssSelector("div[class='re__content-block re__home__bds-for-you-block re__bg-grey-50']"))
                                    //.findElement(By.className("re__content-container"))
                                            //.findElement(By.className("re__product-container"))
                                                    //.findElement(By.cssSelector("div[class='home-product product-4-you']"))
//                                                            .findElement(By.xpath("//div[1]"))
//                                                                .findElements(By.xpath("//div[@class='re__product-item re__interested-product-card js__product-item']"));




//        List<WebElement> f = new WebDriverWait(chromeDriver, Duration.ofSeconds(10))
//                .until(ExpectedConditions.presenceOfNestedElementsLocatedBy(By.xpath("//div[@class='js__interested-product re__interested-product-cards']")
//                        ,By.xpath("//div[@class='re__product-item re__interested-product-card js__product-item']")));

//
//        List<WebElement> list = chromeDriver.findElements(By.xpath("//div[@class='re__product-item re__interested-product-card js__product-item show']"));
        System.out.println(elements.getText());
//        for (WebElement e : elements
//             ) {
//            System.out.println(e.findElements(By.className("js__card")));
//        }

//        String data = elements.get(0).toString();
//        System.out.println(data);

//        for(int i = 1 ; i< 10;i++){
//
//            Listing listing = Listing.builder()
//                    .name(elements.get(i).findElement(By.className("js__card"))
//                            .findElement(By.className("js__product-link-for-product-id"))
//                            .findElement(By.className("re__card-info"))
//                            .findElement(By.className("re__card-info-content"))
//                            .findElement(By.className("re__card-title"))
//                            .findElement(By.className("js__card-title")).getText())
//                    .image_product(elements.get(i).findElement(By.className("js__card"))
//                            .findElement(By.className("js__product-link-for-product-id"))
//                            .findElement(By.className("re__card-image"))
//                            .findElement(By.className("pr-img"))
//                            .getAttribute("src").toString())
//                    .address(elements.get(i).findElement(By.className("js__card"))
//                            .findElement(By.className("js__product-link-for-product-id"))
//                            .findElement(By.className("re__card-info"))
//                            .findElement(By.className("re__card-info-content"))
//                            .findElement(By.className("re__card-location"))
//                            .findElement(By.tagName("span")).getText())
//                    .room(random.nextInt((1000-3)+1)+3)
//                    .price(random.nextDouble((10000000-100000)+1)+3)
//                    .area(random.nextInt((500 - 20)+1)+20)
//                    .floor_space(random.nextInt((100-1)+1)+1)
//                    .id_productcate(random.nextInt((5-1)+1)+1)
//                    .id_producttype(random.nextInt((2-1)+1)+1)
//                    .date_create(new Timestamp(System.currentTimeMillis()))
//                    .date_modified(new Timestamp(System.currentTimeMillis()))
//                    .person_modified(1)
//                    .build();
//            System.out.println(listing);
//        }



    }
    void waitForLoad(WebDriver driver) {
        new WebDriverWait(driver, Duration.ofSeconds(10)).until((ExpectedCondition<Boolean>) wd ->
                ((JavascriptExecutor) wd).executeScript("return document.readyState").equals("complete"));
    }
}
