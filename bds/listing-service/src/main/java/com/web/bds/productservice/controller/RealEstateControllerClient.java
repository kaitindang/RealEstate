package com.web.bds.productservice.controller;

import com.web.bds.productservice.dto.ListingSearchRequest;
import com.web.bds.productservice.entity.Listing;
import com.web.bds.productservice.exeption.ResourceNotFoundException;
import com.web.bds.productservice.service.ListingService;
import com.web.bds.productservice.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import java.util.Calendar;
import java.util.Date;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/realestates")
public class RealEstateControllerClient {

    @Autowired
    private ListingService listingService;
    @Autowired
    private SearchService searchService;

    @GetMapping(value = "/all-listings")
    /*@PreAuthorize("hasRole('ROLE_ANONYMOUS') or hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")*/
    public Map<String, Object> getAllListingApproved(@RequestParam(value = "page", defaultValue = "0") int page,
                                                     @RequestParam(value = "size", defaultValue = "5") int size) {
        List<Listing> listings = new ArrayList<Listing>();
        Pageable pagination = PageRequest.of(page, size);
        Page<Listing> productPage;

        productPage = listingService.findAllListingApproved(pagination);

        listings = productPage.getContent();
        Map<String, Object> response = new HashMap<String, Object>();
        response.put("listings", listings);
        response.put("totalPages", productPage.getTotalPages());
        return response;
    }

    @PostMapping("/create-listing")
    public ResponseEntity<Listing> createListing(@RequestBody Listing listing) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        calendar.add(Calendar.DAY_OF_YEAR, 7);
        Date newDate = calendar.getTime();
        System.out.println(newDate);

        calendar.add(Calendar.DAY_OF_YEAR, 8);
        Date newDate2 = calendar.getTime();
        System.out.println(newDate2);

        if(listing.getPriority_type() == 3){
            listing.setPriority(true);
            listing.setDate_expired(newDate2);

        }
        else if(listing.getPriority_type() == 2){
            listing.setDate_expired(newDate2);

        }
        else {
            listing.setDate_expired(newDate);
        }
        System.out.println(listing.getDate_expired());


        return ResponseEntity.ok(listingService.addListing(listing));
    }

    @GetMapping(value = {"/get-listing/{id}" })
    @PreAuthorize("hasRole('ROLE_ANONYMOUS') or hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public Listing getListing(@PathVariable int id) {
        return listingService.findListingById(id).get();
    }

    @PutMapping("/update-listing/{id}")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<Listing> updateListing(@PathVariable int id, @RequestBody Listing realEstateDetails) {

        Listing updateListing = listingService.findListingById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Real Estate not exist with id: " + id));

        listingService.updateListing(id, realEstateDetails);

        return ResponseEntity.ok(realEstateDetails);
    }

    @DeleteMapping("/delete-listing/{id}")
    public ResponseEntity<HttpStatus> deleteListing(@PathVariable int id){

        Listing listing = listingService.findListingById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Real Estate not exist with id: " + id));

        listingService.deleteListing(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }

    @GetMapping("/search-keywork")
    @PreAuthorize("hasRole('ROLE_ANONYMOUS') or hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<Listing>> searchProductsByKeyword(@RequestParam("keyword") String keyword){
        return ResponseEntity.ok(searchService.searchListingByKeyword(keyword));
    }

    @PostMapping("/search-filter")
    public ResponseEntity<List<Listing>> searchListingsByFilterParams(@RequestBody ListingSearchRequest filter){
        return ResponseEntity.ok(searchService.findListingByFilterParam(filter));
    }

    @GetMapping("/listing-address")
    public ResponseEntity<List<Listing>> getListingsByAdress(@RequestParam("id") int id, @RequestParam("addressParam") String address){
        return ResponseEntity.ok(listingService.findListingByAddress(id, address));
    }

/*    @GetMapping("/listing-users/{id}")
    public ResponseEntity<List<Listing>> getListingsByUser(@PathVariable int id){
        return ResponseEntity.ok(listingService.findListingByUser(id));
    }*/

    @GetMapping(value = "/listing-users/{id}")
    /*@PreAuthorize("hasRole('ROLE_ANONYMOUS') or hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")*/
    public Map<String, Object> getListingsByUser(@RequestParam(value = "page", defaultValue = "0") int page,
                                                     @RequestParam(value = "size", defaultValue = "5") int size,
                                                 @PathVariable int id) {
        List<Listing> listings = new ArrayList<Listing>();
        Pageable pagination = PageRequest.of(page, size);
        Page<Listing> productPage;

        productPage = listingService.findListingByUser(id, pagination);

        listings = productPage.getContent();
        Map<String, Object> response = new HashMap<String, Object>();
        response.put("listings", listings);
        response.put("totalPages", productPage.getTotalPages());
        return response;
    }
}
