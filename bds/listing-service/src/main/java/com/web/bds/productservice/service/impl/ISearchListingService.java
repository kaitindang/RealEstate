package com.web.bds.productservice.service.impl;

import java.util.List;
import com.web.bds.productservice.entity.Listing;

public interface ISearchListingService<T> {

    List<Listing> searchListingByKeyword(String keyword);

    List<Listing> findListingByFilterParams(double price, int area, int floor_space, int room);
}
