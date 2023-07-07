package com.web.bds.productservice.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "listing")
@Data
public class Listing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_product;
    @Column
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date date_create;
    @Column
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date date_modified;
    @Column
    private Date date_expired;
    @Column(name = "name_product")
    private String name;
    @Column
    private String detail_product;
    @Column
    private String image_product;
    @Column
    private int id_productcate;
    @Column
    private double price;
    @Column
    private String person_modified;
    @Column
    private boolean enable_product = true;
    @Column
    private String address;
    @Column
    private int area;
    @Column
    private int floor_space;
    @Column
    private int room;
    @Column
    private String owner_project;
    @Column
    private int id_producttype;
    @Column
    private boolean approve = false;
    @Column
    private boolean priority = false;
    @Column
    private int priority_type;
}


