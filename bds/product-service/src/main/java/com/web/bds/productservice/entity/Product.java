package com.web.bds.productservice.entity;

import java.util.Date;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.*;


@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "product")
@Data
public class Product {
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
    private int person_modified;
    @Column
    private boolean enable_product = false;
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
}


