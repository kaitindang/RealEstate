package com.web.bds.productservice.service;

import com.web.bds.productservice.repo.ListingRepo;
import com.web.bds.productservice.entity.Listing;
import com.web.bds.productservice.service.impl.IListingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Service
public class ListingService implements IListingService<Listing> {

    @Autowired
    ListingRepo listingRepo;

    @Override
    public Page<Listing> findAllListing(Pageable pageable) {
        return listingRepo.findAll(pageable);
    }

    @Override
    public Page<Listing> findAllListingApproved(Pageable pageable) {
        return listingRepo.findAll(pageable, true);
    }

    @Override
    public Listing addListing(Listing listing) {

        return listingRepo.save(listing);
    }

    @Override
    public Optional<Listing> findListingById(int id) {
        return this.listingRepo.findById(id);
    }

    @Override
    public Listing findOne(int id) {
        // TODO Auto-generated method stub
        Listing d =  listingRepo.findById(id).get();

        return d;
    }

    @Override
    public Listing updateListing(int id, Listing listing) {

        Listing updateListing = listingRepo.findById(id).orElse(null);

        updateListing.setDetail_product(listing.getDetail_product());
        updateListing.setAddress(listing.getAddress());
        updateListing.setFloor_space(listing.getFloor_space());
        updateListing.setPrice(listing.getPrice());
        updateListing.setId_productcate(listing.getId_productcate());
        updateListing.setName(listing.getName());
        updateListing.setArea(listing.getArea());
        updateListing.setRoom(listing.getRoom());
        updateListing.setOwner_project(listing.getOwner_project());
        updateListing.setImage_product(listing.getImage_product());
        updateListing.setId_producttype(listing.getId_producttype());
        updateListing.setDate_modified(new Timestamp(System.currentTimeMillis()));

        return listingRepo.save(updateListing);
    }

    @Override
    public void update(Listing t) {
        if(t == null){
            return;
        }
        listingRepo.save(t);
    }

    @Override
    public void deleteListing(int id) {
        listingRepo.deleteById(id);
    }

    @Override
    public List<Listing> listProductWaitingApprove() {
        return listingRepo.findListingWaitingApprove();

    }

}
