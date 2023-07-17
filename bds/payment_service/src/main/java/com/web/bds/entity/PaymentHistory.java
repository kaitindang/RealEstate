package com.web.bds.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_paymenthistory;

    @Column
    private int id_payment;

    @Column
    private double pre_amount;

    @Column
    private double pay_money;

    @Column
    private double aft_amount;

    @Column
    private int person_modified;

    @Column
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date date_modified;
}
