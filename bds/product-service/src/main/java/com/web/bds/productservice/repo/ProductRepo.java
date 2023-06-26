package com.web.bds.productservice.repo;

import com.web.bds.productservice.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepo extends JpaRepository<Product,Integer> {
    @Query(value = "SELECT * FROM product p WHERE p.enable_product = :enable_product AND p.approve = true",nativeQuery = true)
    public Page<Product> findAll(Pageable pageable, @Param("enable_product") boolean enable_product);

    @Query(value = "SELECT * FROM product p WHERE p.approve = false",nativeQuery = true)
    public List<Product> findProductWaitingApprove();
    List<Product> findByName(String name);
    Boolean existsByName(String name);

    @Query("SELECT p FROM Product p WHERE " +
            "p.enable_product = true " +
            "And p.name LIKE CONCAT('%',:keyword, '%') " +
            "Or p.detail_product LIKE CONCAT('%', :keyword, '%')")
    List<Product> searchProductsByKeyword(String keyword);

    @Query("SELECT p FROM Product p " +
            "WHERE (coalesce(:price, null) IS NULL OR p.price = :price)" +
            "AND (coalesce(:area, null) IS NULL OR p.area = :area)" +
            "AND (coalesce(:floor_space, null) IS NULL OR p.floor_space = :floor_space)" +
            "AND (coalesce(:room, null) IS NULL OR p.room = :room)")
    List<Product> findPerfumesByFilterParams(@Param("price") double price,
                                             @Param("area") int area,
                                             @Param("floor_space") int floor_space,
                                             @Param("room") int room);

}
