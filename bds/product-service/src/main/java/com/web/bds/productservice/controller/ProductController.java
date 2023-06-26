package com.web.bds.productservice.controller;

import com.web.bds.productservice.entity.Product;
import com.web.bds.productservice.service.ProductService;
import org.hibernate.validator.constraints.CreditCardNumber;
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
@RequestMapping("/admin/product")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {
    @Autowired
    private ProductService productServices;

    @GetMapping("")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
    public Map<String, Object> showBill(@RequestParam(value = "page", defaultValue = "0") int page,
                                        @RequestParam(value = "size", defaultValue = "2") int size) {

        List<Product> products = new ArrayList<Product>();
        Pageable pagination = PageRequest.of(page, size);
        Page<Product> productPage;

        productPage = productServices.listAll(pagination);

        products = productPage.getContent();
        Map<String, Object> response = new HashMap<String, Object>();
        response.put("products", products);
        response.put("totalPages", productPage.getTotalPages());
        return response;

    }

    @GetMapping("/product-waiting")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public List<Product> getAllProductWaitingApprove() {

        return  productServices.listProductWaitingApprove();

    }

    @PostMapping("")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void add(@RequestBody Product product) {
        productServices.add(product);
    }

    @PutMapping("/{id_product}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Product> update(@PathVariable int id_product, @RequestBody Product product) {
        product = productServices.update(id_product,product);
        return ResponseEntity.ok(product);
    }

    @GetMapping("/{id_product}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Product> getById(@PathVariable int id_product){
        Product product = null;
        product = productServices.findOne(id_product);
        return ResponseEntity.ok(product);
    }

    @DeleteMapping("/{id_product}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<String> delete(@PathVariable int id_product){

        Product product = null;
        product = productServices.findOne(id_product);
        product.setEnable_product(false);
        productServices.update(product);
        return ResponseEntity.ok("deleted");
    }

    @PutMapping("/enable-product/{id_product}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
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

    @PutMapping("/approve-product/{id_product}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<String> ApproveProduct(@PathVariable int id_product){

        Product product = null;
        product = productServices.findOne(id_product);

        if(product.isEnable_product() == true){
            product.setApprove(false);
        } else {
            product.setApprove(true);
        }

        productServices.update(product);
        return ResponseEntity.ok("deleted");
    }
}
