package com.web.bds.productservice.service;

import com.web.bds.productservice.repo.ListingRepo;
import com.web.bds.productservice.entity.Listing;
import com.web.bds.productservice.service.impl.ISearchListingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SearchService implements ISearchListingService<Listing> {

    @Autowired
    ListingRepo listingRepo;

    @Override
    public List<Listing> searchListingByKeyword(String keyword) {
        List<Listing> products = listingRepo.searchProductsByKeyword(keyword);
        return products;
    }

    @Override
    public List<Listing> findListingByFilterParams(double price, int area, int floor_space, int room) {

        List<Listing> listings = listingRepo.findListingByFilterParams(
                price,
                area,
                floor_space,
                room
        );

        return listings;
    }
}
