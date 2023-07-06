package com.web.bds.productservice.service;

import com.web.bds.productservice.repo.ListingRepo;
import com.web.bds.productservice.entity.Listing;
import com.web.bds.productservice.repo.SearchRepo;
import com.web.bds.productservice.service.impl.ISearchListingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.web.bds.productservice.dto.ListingSearchRequest;

import java.util.List;

@Service
public class SearchService implements ISearchListingService<Listing> {

    @Autowired
    ListingRepo listingRepo;
    @Autowired
    SearchRepo searchRepo;

    @Override
    public List<Listing> searchListingByKeyword(String keyword) {
        List<Listing> products = listingRepo.searchProductsByKeyword(keyword);
        return products;
    }

    @Override
    public List<Listing> findListingsByFilterParams(ListingSearchRequest filter) {

        List<Listing> listings = listingRepo.findListingsByFilterParams(
                filter.price_start,
                filter.price_end,
                filter.area_start,
                filter.area_end,
                filter.floor_spaceStart,
                filter.floor_spaceEnd,
                filter.room_start,
                filter.room_end,
                filter.address,
                filter.listing_categories
        );

        return listings;
    }

    @Override
    public List<Listing> findListingByFilterParam(ListingSearchRequest filter) {

        List<Listing> listings = searchRepo.findListingByFilterParam(
                filter.price_start,
                filter.price_end,
                filter.area_start,
                filter.area_end,
                filter.floor_spaceStart,
                filter.floor_spaceEnd,
                filter.room_start,
                filter.room_end,
                filter.address,
                filter.listing_categories,
                filter.listing_type
        );

        return listings;
    }
}
