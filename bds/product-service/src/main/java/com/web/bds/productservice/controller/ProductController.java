package com.web.bds.productservice.controller;

import com.web.bds.productservice.entity.Product;
import com.web.bds.productservice.service.ProductService;
import org.hibernate.validator.constraints.CreditCardNumber;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/product")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {
    @Autowired
    private ProductService productServices;

    @GetMapping("")
    public List<Product> showBill() {

        return  productServices.listAll();

    }

    @PostMapping("")
    public void add(@RequestBody Product product) {
        productServices.add(product);
    }

    @PutMapping("/{id_product}")
    public ResponseEntity<Product> update(@PathVariable int id_product, @RequestBody Product product) {
        product = productServices.update(id_product,product);
        return ResponseEntity.ok(product);
    }

    @GetMapping("/{id_product}")
    public ResponseEntity<Product> getById(@PathVariable int id_product){
        Product product = null;
        product = productServices.findOne(id_product);
        return ResponseEntity.ok(product);
    }

    @DeleteMapping("/{id_product}")
    public ResponseEntity<String> delete(@PathVariable int id_product){

        Product product = null;
        product = productServices.findOne(id_product);
        product.setEnable_product(false);
        productServices.update(product);
        return ResponseEntity.ok("deleted");
    }

    @PutMapping("/enable-product/{id_product}")
    public ResponseEntity<String> EnableProduct(@PathVariable int id_product){

        Product product = null;
        product = productServices.findOne(id_product);

        if(product.isEnable_product() == true){
            product.setEnable_product(false);
        } else {
            product.setEnable_product(true);
        }

        productServices.update(product);
        return ResponseEntity.ok("deleted");
    }
}
