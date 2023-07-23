package com.web.bds.financeservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FinanceResponse {
    public float principal_amount;
    public float original_payment;
    public float interest_payment;
    public float interest_amount;
    public float interest_month;
    public float remaining_balance;
    public float prepay_amount;
    public float total_amount;


}
