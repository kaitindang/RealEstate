package com.web.bds.financeservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Bank")
@Data
public class Bank {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_bank;
    @Column
    private String bank_name;
    @Column
    private float bank_rate;
    @Column
    private int maximum_term;
    @Column
    private int maximum_rate;
}
