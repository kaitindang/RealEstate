package com.example.crawldata.service;

import com.example.crawldata.model.FileDetails;
import com.example.crawldata.model.Listing;
import com.example.crawldata.repo.CrawlRepo;
import com.example.crawldata.repo.FileDetailsRepo;
import com.example.crawldata.repo.PhotoRepo;
import jakarta.annotation.PostConstruct;
import jakarta.persistence.criteria.Predicate;
import lombok.AllArgsConstructor;
import org.apache.commons.io.IOUtils;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.DecimalFormat;
import java.time.Duration;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Random;
import java.util.concurrent.TimeUnit;

import  com.example.crawldata.model.Photo;


@Service
@AllArgsConstructor
public class CrawlService {

    public static final String URLSellData = "https://batdongsan.com.vn/nha-dat-ban";
    public static final String URLRentData = "https://batdongsan.com.vn/nha-dat-cho-thue";
    private static final DecimalFormat decfor = new DecimalFormat("0.00");

    private final ChromeDriver chromeDriver;

    @Autowired
    CrawlRepo crawlRepo;

    @Autowired
    PhotoRepo photoRepo;

    @Autowired
    SequenceGeneratorService service;

    @Autowired
    FileDetailsRepo fileDetailsRepo;

    public void add(Listing a) {
        crawlRepo.save(a);
    }

    @PostConstruct
    void postContruct() throws InterruptedException,IOException {
        chromeDriver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
        crawlData();
    }

    public void crawlData() throws InterruptedException {
        //crawlSellData(URLSellData);
        crawlRentData(URLRentData);
    }


    public void crawlSellData(String URL) {

        chromeDriver.get(URL);

        Random random = new Random();

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        calendar.add(Calendar.DAY_OF_YEAR, 7);
        Date newDate = calendar.getTime();

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
        List<WebElement> imageparent = chromeDriver.findElements(By.xpath("//div[@class='re__card-image ']//div[1]//img"));
        List<WebElement> imagechild1 = chromeDriver.findElements(By.xpath("//div[@class='re__card-image ']//div[2]//img"));
        List<WebElement> imagechild2 = chromeDriver.findElements(By.xpath("//div[@class='re__card-image ']//div[3]//img"));
        List<WebElement> imagechild3 = chromeDriver.findElements(By.xpath("//div[@class='re__card-image ']//div[4]//img"));


        List<WebElement> imagechild4 = chromeDriver.findElements(By.xpath("//*[@id=\"product-lists-web\"]/div[1]/a/div[1]/div[1]/div/div/img"));

        for (int i = 1; i < 20; i++) {


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
            System.out.println(imageparent.get(i).getAttribute("src"));
            System.out.println(imagechild1.get(i).getAttribute("src"));
            System.out.println(imagechild2.get(i).getAttribute("src"));
            System.out.println(imagechild3.get(i).getAttribute("src"));
            System.out.println("image: "+imagechild4.get(i).getAttribute("src"));

            Listing listing = Listing.builder()
                    .name(titles.get(i).getText())
                    .address(address.get(i).getText())
                    .detail_product(description.get(i).getText())
                    .price(random.nextInt(10000)+100)
                    .area(Integer.parseInt(numberArea))
                    .room(random.nextInt(5)+1)
                    .floor_space(random.nextInt(5)+1)
                    .person_modified(dealer.get(i).getText())
                    .id_productcate(random.nextInt(5)+1)
                    .id_producttype(1)
                    .priority_type(1)
                    .date_expired(newDate)
                    .priority(false)
                    .enable_product(true)
                    .approve(true)
                    .build();

            listing = crawlRepo.save(listing);
            int id_product = listing.getId_product();

            FileDetails fileDetails = new FileDetails(imageparent.get(i).getAttribute("src"),
                    imageparent.get(i).getAttribute("src"),id_product);

            fileDetailsRepo.save(fileDetails);

            FileDetails fileDetails1 = new FileDetails(imagechild1.get(i).getAttribute("src"),
                    imageparent.get(i).getAttribute("src"),id_product);

            fileDetailsRepo.save(fileDetails1);

            FileDetails fileDetails2 = new FileDetails(imagechild2.get(i).getAttribute("src"),
                    imageparent.get(i).getAttribute("src"),id_product);

            fileDetailsRepo.save(fileDetails2);

            FileDetails fileDetails3 = new FileDetails(imagechild3.get(i).getAttribute("src"),
                    imageparent.get(i).getAttribute("src"),id_product);

            fileDetailsRepo.save(fileDetails3);



//            listing = crawlRepo.save(listing);
//            int groupId = listing.getId_product();
//
//            URL url = new URL(imageparent.get(i).getAttribute("src"));
//            InputStream is = url.openStream();
//            Photo photo = Photo.builder()
//                    .groupId(groupId)
//                    .title("parentImage")
//                    .image(new Binary(BsonBinarySubType.BINARY,IOUtils.toByteArray(is)))
//                    .build();
//
//            photo.setId(service.getSequenceNumber(Listing.SEQUENCE_NAME));
//            photoRepo.save(photo);

//            URL url1 = new URL(imagechild1.get(i).getAttribute("src"));
//            InputStream is1 = url1.openStream();
//            Photo photo1 = Photo.builder()
//                    .groupId(groupId)
//                    .title("child1Image")
//                    .image(new Binary(BsonBinarySubType.BINARY,IOUtils.toByteArray(is1)))
//                    .build();
//            photo1.setId(service.getSequenceNumber(Listing.SEQUENCE_NAME));
//            photoRepo.save(photo1);
//
//            URL url2 = new URL(imagechild2.get(i).getAttribute("src"));
//            InputStream is2 = url2.openStream();
//            Photo photo2 = Photo.builder()
//                    .groupId(groupId)
//                    .title("child2Image")
//                    .image(new Binary(BsonBinarySubType.BINARY,IOUtils.toByteArray(is2)))
//                    .build();
//            photo2.setId(service.getSequenceNumber(Listing.SEQUENCE_NAME));
//            photoRepo.save(photo2);
//
//            URL url3 = new URL(imagechild3.get(i).getAttribute("src"));
//            InputStream is3 = url3.openStream();
//            Photo photo3 = Photo.builder()
//                    .groupId(groupId)
//                    .title("child3Image")
//                    .image(new Binary(BsonBinarySubType.BINARY,IOUtils.toByteArray(is3)))
//                    .build();
//            photo3.setId(service.getSequenceNumber(Listing.SEQUENCE_NAME));
//            photoRepo.save(photo3);


        }
        chromeDriver.quit();
    }

    public void crawlRentData(String URL) {

        chromeDriver.get(URL);

        Random random = new Random();

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        calendar.add(Calendar.DAY_OF_YEAR, 7);
        Date newDate = calendar.getTime();

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
        List<WebElement> imageparent = chromeDriver.findElements(By.xpath("//div[@class='re__card-image ']//div[1]//img"));
        List<WebElement> imagechild1 = chromeDriver.findElements(By.xpath("//div[@class='re__card-image ']//div[2]//img"));
        List<WebElement> imagechild2 = chromeDriver.findElements(By.xpath("//div[@class='re__card-image ']//div[3]//img"));
        List<WebElement> imagechild3 = chromeDriver.findElements(By.xpath("//div[@class='re__card-image ']//div[4]//img"));

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
            System.out.println(imageparent.get(i).getAttribute("src"));
            System.out.println(imagechild1.get(i).getAttribute("src"));
            System.out.println(imagechild2.get(i).getAttribute("src"));
            System.out.println(imagechild3.get(i).getAttribute("src"));

            Listing listing = Listing.builder()
                    .name(titles.get(i).getText())
                    .address(address.get(i).getText())
                    .detail_product(description.get(i).getText())
                    .price(random.nextInt(10000)+100)
                    .area(Integer.parseInt(numberArea))
                    .room(random.nextInt(5)+1)
                    .floor_space(random.nextInt(5)+1)
                    .person_modified(dealer.get(i).getText())
                    .id_productcate(random.nextInt(5)+1)
                    .id_producttype(2)
                    .priority_type(1)
                    .date_expired(newDate)
                    .priority(false)
                    .enable_product(true)
                    .approve(true)
                    .build();

            listing = crawlRepo.save(listing);
            int id_product = listing.getId_product();

            FileDetails fileDetails = new FileDetails(imageparent.get(i).getAttribute("src"),
                    imageparent.get(i).getAttribute("src"),id_product);

            fileDetailsRepo.save(fileDetails);

            FileDetails fileDetails1 = new FileDetails(imagechild1.get(i).getAttribute("src"),
                    imageparent.get(i).getAttribute("src"),id_product);

            fileDetailsRepo.save(fileDetails1);

            FileDetails fileDetails2 = new FileDetails(imagechild2.get(i).getAttribute("src"),
                    imageparent.get(i).getAttribute("src"),id_product);

            fileDetailsRepo.save(fileDetails2);

            FileDetails fileDetails3 = new FileDetails(imagechild3.get(i).getAttribute("src"),
                    imageparent.get(i).getAttribute("src"),id_product);

            fileDetailsRepo.save(fileDetails3);

        }

        chromeDriver.quit();
    }


    void waitForLoad(WebDriver driver) {
        new WebDriverWait(driver, Duration.ofSeconds(10)).until((ExpectedCondition<Boolean>) wd ->
                ((JavascriptExecutor) wd).executeScript("return document.readyState").equals("complete"));
    }

}
