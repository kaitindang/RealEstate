package com.web.bds.productservice.service;

import com.web.bds.productservice.entity.Product;

import com.web.bds.productservice.repo.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService implements Servicese<Product> {
    @Autowired
    ProductRepo productRepo;

    @Override
    public void delete(int id) {
        // TODO Auto-generated method stub
        Product product = null;
        product = productRepo.findById(id).get();
        product.setEnable_product(false);
        productRepo.save(product);

    }

    @Override
    public void add(Product t) {

        t.setEnable_product(true);
        productRepo.save(t);
    }

    @Override
    public Product findOne(int id) {
        // TODO Auto-generated method stub
        Product d =  productRepo.findById(id).get();

        return d;
    }

    @Override
    public void update(Product t) {
        // TODO Auto-generated method stub
        if(t == null){
            return;
        }
        productRepo.save(t);
    }

    @Override
    public Product update(int id, Product product) {
        Product p = productRepo.findById(id).get();
        p.setName(product.getName());
        p.setPrice(product.getPrice());
        p.setImage_product(product.getImage_product());
        p.setDetail_product(product.getDetail_product());
        p.setId_productcate(product.getId_productcate());
        p.setDate_create(product.getDate_create());
        p.setDate_modified(new Timestamp(System.currentTimeMillis()));
        p.setPerson_modified(product.getPerson_modified());
        p.setEnable_product(product.isEnable_product());


        productRepo.save(p);
        return p;
    }

    @Override
    public List<Product> listAll() {
        // TODO Auto-generated method stub

        return productRepo.findAll(true);

    }

    @Override
    public List<Product> listById(int id) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public List<Product> listByName(String name) {
        // TODO Auto-generated method stub
        return null;
    }

}
