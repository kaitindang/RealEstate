package com.web.bds.productservice.dto;

import lombok.Data;

@Data
public class ListingSearchRequest {
    public String price;
    public String area;
    public String floor_space;
    public String room;
}
