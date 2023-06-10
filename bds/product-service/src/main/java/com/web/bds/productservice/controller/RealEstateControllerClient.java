package com.web.bds.productservice.controller;

import com.web.bds.productservice.exeption.ResourceNotFoundException;
import com.web.bds.productservice.entity.Product;
import com.web.bds.productservice.service.RealEstateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/realestates")
public class RealEstateControllerClient {

    @Autowired
    private RealEstateService realEstateService;

    /** GET request to return all real estates **/
    @GetMapping(value = "/all-list")
    public List<Product> getAllRealEstates() {
        return realEstateService.findAllRealEstate();
    }

    @PostMapping("")
    public Product createRealEstate(@RequestBody Product realEstate) {
        return realEstateService.addRealEstate(realEstate);
    }

    @GetMapping(value = {"/{id}" })
    public Product getRealEstate(@PathVariable int id) {
        return realEstateService.findRealEstateById(id).get();
    }

    @PutMapping("{id}")
    public ResponseEntity<Product> updateRealEstate(@PathVariable int id, @RequestBody Product realEstateDetails) {

        Product updateEmployee = realEstateService.findRealEstateById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Real Estate not exist with id: " + id));

        realEstateService.updateRealEstate(id, realEstateDetails);

        return ResponseEntity.ok(realEstateDetails);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteEmployee(@PathVariable int id){

        Product employee = realEstateService.findRealEstateById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Real Estate not exist with id: " + id));

        realEstateService.delete(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }
}
