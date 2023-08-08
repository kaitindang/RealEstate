package com.web.bds.productservice.service.impl;

import com.web.bds.productservice.entity.Listing;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface IListingService<T> {

    Page<T> findAllListing(Pageable pageable);
    Page<T> findAllListingApproved(Pageable pageable);

    Optional<T> findListingById(int id);

    T findOne(int id);

    T addListing(T t);

    T updateListing(int id, T t);

    void update(T t);

    void deleteListing(int id);

    List<T> listProductWaitingApprove();

    List<Listing> findListingByAddress(String address);
}
