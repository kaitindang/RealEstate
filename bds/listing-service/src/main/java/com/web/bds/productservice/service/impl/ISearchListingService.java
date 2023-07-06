package com.web.bds.productservice.service.impl;

import java.util.List;

import com.web.bds.productservice.dto.ListingSearchRequest;
import com.web.bds.productservice.entity.Listing;

public interface ISearchListingService<T> {

    List<Listing> searchListingByKeyword(String keyword);

    List<Listing> findListingsByFilterParams(ListingSearchRequest filter);

    List<Listing> findListingByFilterParam(ListingSearchRequest filter);
}
