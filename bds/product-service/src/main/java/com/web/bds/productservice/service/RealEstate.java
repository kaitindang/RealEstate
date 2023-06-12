package com.web.bds.productservice.service;

import com.web.bds.productservice.entity.Product;

import java.util.List;
import java.util.Optional;

public interface RealEstate<T> {

    public List<Product> findAllRealEstate();

    public Product addRealEstate(T t);

    Optional<Product> findRealEstateById(int id);
    public Product updateRealEstate(int id, T t);

    public void delete(int id);

    List<Product> searchProductsByKeyword(String keyword);
}
