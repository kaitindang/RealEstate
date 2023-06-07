package com.web.bds.productservice.repo;

import com.web.bds.productservice.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepo extends JpaRepository<Product,Integer> {
    @Query(value = "SELECT * FROM product p WHERE p.enable_product = :enable_product",nativeQuery = true)
    public List<Product> findAll(@Param("enable_product") boolean enable_product);

    Product findByName(String name);
    Boolean existsByName(String name);
}
