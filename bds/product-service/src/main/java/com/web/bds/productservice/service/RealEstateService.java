package com.web.bds.productservice.service;

import com.web.bds.productservice.entity.Product;
import com.web.bds.productservice.repo.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RealEstateService implements RealEstate<Product>{

    @Autowired
    ProductRepo productRepo;

    @Override
    public List<Product> findAllRealEstate() {
        return productRepo.findAll();
    }

    @Override
    public Product addRealEstate(Product realEstate) {

        return productRepo.save(realEstate);
    }

    @Override
    public Optional<Product> findRealEstateById(int id) {
        return this.productRepo.findById(id);
    }

    @Override
    public Product updateRealEstate(int id, Product realEstate) {

        Product updateRealEstate = productRepo.findById(id).orElse(null);

        updateRealEstate.setDetail_product(realEstate.getDetail_product());
        updateRealEstate.setAddress(realEstate.getAddress());
        updateRealEstate.setFloor_space(realEstate.getFloor_space());
        updateRealEstate.setPrice(realEstate.getPrice());
        updateRealEstate.setId_productcate(realEstate.getId_productcate());
        updateRealEstate.setName(realEstate.getName());
        updateRealEstate.setArea(realEstate.getArea());
        updateRealEstate.setRoom(realEstate.getRoom());
        updateRealEstate.setOwner_project(realEstate.getOwner_project());
        updateRealEstate.setImage_product(realEstate.getImage_product());
        updateRealEstate.setId_producttype(realEstate.getId_producttype());

        return productRepo.save(updateRealEstate);
    }

    @Override
    public void delete(int id) {
        productRepo.deleteById(id);
    }

    @Override
    public List<Product> searchProductsByKeyword(String keyword) {
        List<Product> products = productRepo.searchProductsByKeyword(keyword);
        return products;
    }
}
