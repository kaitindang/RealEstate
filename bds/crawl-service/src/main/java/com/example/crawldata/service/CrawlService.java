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

import java.text.DecimalFormat;
import java.time.Duration;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Random;
import java.util.concurrent.TimeUnit;

@Service
@AllArgsConstructor
public class CrawlService {

    public static final String URL = "https://batdongsan.com.vn/nha-dat-ban";
    private static final DecimalFormat decfor = new DecimalFormat("0.00");

    private final ChromeDriver chromeDriver;

    @Autowired
    CrawlRepo crawlRepo;

    public void add(Listing a) {
        crawlRepo.save(a);
    }

    @PostConstruct
    void postContruct() {
        chromeDriver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
        crawl();
    }


    public void crawl() {
        Random random = new Random();

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        calendar.add(Calendar.DAY_OF_YEAR, 7);
        Date newDate = calendar.getTime();

        chromeDriver.get(URL);

        System.out.println(chromeDriver.getTitle());
        //WebElement elements = chromeDriver.findElement(By.xpath("//*[@id=\"btnSearch\"]"));
        //elements.click();


        List<WebElement> listings = chromeDriver.findElements(By.xpath("//*[@id=\"product-lists-web\"]"));
//        System.out.println(elements.getText());

        List<WebElement> titles = chromeDriver.findElements(By.className("pr-title"));
        List<WebElement> prices = chromeDriver.findElements(By.className("re__card-config-price"));
        List<WebElement> area = chromeDriver.findElements(By.className("re__card-config-area"));
        //List<WebElement> room = chromeDriver.findElements(By.className("re__card-config-bedroom"));
        //List<WebElement> floor = chromeDriver.findElements(By.className("re__card-config-toilet"));
        List<WebElement> address = chromeDriver.findElements(By.className("re__card-location"));
        List<WebElement> description = chromeDriver.findElements(By.className("re__card-description"));
        List<WebElement> dealer = chromeDriver.findElements(By.className("re__card-published-info-agent-profile-name"));

        for (int i = 0; i < 20; i++) {

            String strPrice = prices.get(i).getText();
            String numberPrice = strPrice.replaceAll("[^0-9]", "");

            String strArea = area.get(i).getText();
            String numberArea = strArea.replaceAll("[^0-9]", "");

            //String strRoom = room.get(i).getText();
            //String numberRoom = strRoom.replaceAll("[^0-9]", "");

            //String strFloor = floor.get(i).getText();
            //String numberFloor = strFloor.replaceAll("[^0-9]", "");

            System.out.println(titles.get(i).getText());
            System.out.println(address.get(i).getText());
            System.out.println(description.get(i).getText());
            System.out.println(numberPrice);
            System.out.println(numberArea);
            //System.out.println(numberRoom);
            //System.out.println(numberFloor);
            System.out.println(dealer.get(i).getText());
            System.out.println("--------------------------------");

            Listing listing = Listing.builder()
                    .name(titles.get(i).getText())
                    .address(address.get(i).getText())
                    .detail_product(description.get(i).getText())
                    .price(random.nextInt(20)+1)
                    .area(Integer.parseInt(numberArea))
                    .room(random.nextInt(5)+1)
                    .floor_space(random.nextInt(5)+1)
                    .person_modified(dealer.get(i).getText())
                    .id_productcate(random.nextInt(5)+1)
                    .id_producttype(random.nextInt(2)+1)
                    .priority_type(random.nextInt(2)+1)
                    .date_expired(newDate)
                    .priority(false)
                    .enable_product(true)
                    .approve(true)
                    .build();

            crawlRepo.save(listing);
        }


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
