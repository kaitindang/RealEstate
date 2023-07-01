package com.web.bds.productservice.controller;

import com.web.bds.productservice.entity.Listing;
import com.web.bds.productservice.service.ListingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin/realestate")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {
    @Autowired
    private ListingService listingService;

    @GetMapping("")
    /*@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")*/
    public Map<String, Object> getAllListing(@RequestParam(value = "page", defaultValue = "0") int page,
                                             @RequestParam(value = "size", defaultValue = "2") int size) {

        List<Listing> listings = new ArrayList<Listing>();
        Pageable pagination = PageRequest.of(page, size);
        Page<Listing> productPage;

        productPage = listingService.findAllListing(pagination);

        listings = productPage.getContent();
        Map<String, Object> response = new HashMap<String, Object>();
        response.put("listings", listings);
        response.put("totalPages", productPage.getTotalPages());
        return response;

    }

    @GetMapping("/product-waiting")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public List<Listing> getAllListingWaitingApprove() {

        return  listingService.listProductWaitingApprove();

    }

    @PutMapping("/enable-product/{id_product}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<String> EnableProduct(@PathVariable int id_product){

        Listing listing = null;
        listing = listingService.findOne(id_product);

        if(listing.isEnable_product() == true){
            listing.setEnable_product(false);
        } else {
            listing.setEnable_product(true);
        }

        listingService.update(listing);
        return ResponseEntity.ok("Listing Enabled Successful");
    }

    @PutMapping("/approve-product/{id_product}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<String> Approve(@PathVariable int id_product){

        Listing listing = null;
        listing = listingService.findOne(id_product);

        if(listing.isApprove() == true){
            listing.setApprove(false);
        } else {
            listing.setApprove(true);
        }

        listingService.update(listing);
        return ResponseEntity.ok("Listing Approved Successful");
    }
}
