package com.web.bds.productservice.repo;

import com.web.bds.productservice.entity.Listing;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public interface ListingRepo extends JpaRepository<Listing,Integer> {

    @Query(value = "SELECT * FROM listing p " +
            "WHERE p.enable_product = true " +
            "AND p.approve = true " +
            "AND DATE(p.date_expired) >= DATE(NOW())" +
            "ORDER BY priority DESC",nativeQuery = true)
    public Page<Listing> findAll(Pageable pageable, @Param("enable_product") boolean enable_product);

    @Query(value = "SELECT * FROM listing p WHERE p.approve = false",nativeQuery = true)
    public List<Listing> findListingWaitingApprove();

    List<Listing> findByName(String name);
    Boolean existsByName(String name);

    @Query("SELECT p FROM Listing p WHERE " +
            "p.enable_product = true " +
            "And p.name LIKE CONCAT('%',:keyword, '%') " +
            "Or p.detail_product LIKE CONCAT('%', :keyword, '%')")
    List<Listing> searchProductsByKeyword(String keyword);

    @Query("SELECT p FROM Listing p " +
            "WHERE p.enable_product = true " +
            "AND p.approve = true " +
            "AND DATE(p.date_expired) >= DATE(NOW())" +
            "AND (coalesce(:price_start, null) IS NULL OR p.price BETWEEN :price_start AND :price_end)" +
            "AND (coalesce(:area_start, null) IS NULL OR p.area BETWEEN :area_start AND :area_end)" +
            "AND (coalesce(:floor_spaceStart, null) IS NULL OR p.floor_space BETWEEN :floor_spaceStart AND :floor_spaceEnd)" +
            "AND (coalesce(:room_start, null) IS NULL OR p.room BETWEEN :room_start AND :room_end)" +
            "AND (coalesce(:address, null) IS NULL OR p.address LIKE CONCAT('%', :address, '%'))" +
            "AND (coalesce(:listing_categories, null) IS NULL OR p.id_productcate = :listing_categories)")
    List<Listing> findListingsByFilterParams(@Param("price_start") String price_start,
                                             @Param("price_end") String price_end,
                                            @Param("area_start") String area_start,
                                             @Param("area_end") String area_end,
                                            @Param("floor_spaceStart") String floor_spaceStart,
                                             @Param("floor_spaceEnd") String floor_spaceEnd,
                                            @Param("room_start") String room_start,
                                             @Param("room_end") String room_end,
                                            @Param("address") String address,
                                             @Param("listing_categories") String listing_categories);

}
