package com.web.bds.productservice.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RequestPayment {

    private String name_payment;

    private int id_account;

    private String content_payment;

    private Double amount;

}
