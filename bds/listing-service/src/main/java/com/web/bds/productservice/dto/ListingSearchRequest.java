package com.web.bds.productservice.dto;

import lombok.Data;

@Data
public class ListingSearchRequest {
    public String price_start;
    public String price_end;
    public String area_start;
    public String area_end;
    public String floor_spaceStart;
    public String floor_spaceEnd;
    public String room_start;
    public String room_end;
    public String address;
    public String listing_categories;
    public String listing_type;
}
