package com.web.bds.productservice.repo;

import com.web.bds.productservice.entity.Listing;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.FluentQuery;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;

@Repository
public class SearchRepo{

    @PersistenceContext
    private EntityManager em;

    public List<Listing> findListingByFilterParam(String price_start,
                                                  String price_end,
                                                  String area_start,
                                                  String area_end,
                                                  String floor_spaceStart,
                                                  String floor_spaceEnd,
                                                  String room_start,
                                                  String room_end,
                                                  String address,
                                                  String listing_categories,
                                                  String listing_type) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Listing> cq = cb.createQuery(Listing.class);

        Root<Listing> book = cq.from(Listing.class);
        List<Predicate> predicates = new ArrayList<>();

        if (price_start != null && price_end != null) {
            predicates.add(cb.between(book.get("price"), price_start, price_end));
        }

        if (area_start != null && area_end != null) {
            predicates.add(cb.between(book.get("area"), area_start, area_end));
        }

        if (floor_spaceStart != null && floor_spaceEnd != null) {
            predicates.add(cb.between(book.get("floor_space"), floor_spaceStart, floor_spaceEnd));
        }

        if (room_start != null && room_end != null) {
            predicates.add(cb.between(book.get("room"), room_start, room_end));
        }

        if (address != null) {
            predicates.add(cb.like(book.get("address"), "%" + address + "%"));
        }

        if (listing_categories != null) {
            predicates.add(cb.equal(book.get("id_productcate"), listing_categories));
        }

        if (listing_type != null) {
            predicates.add(cb.equal(book.get("id_producttype"), listing_type));
        }

        cq.where(predicates.toArray(new Predicate[0]));

        return em.createQuery(cq).getResultList();
    }


}
