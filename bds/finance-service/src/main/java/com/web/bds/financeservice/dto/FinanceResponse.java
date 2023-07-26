package com.web.bds.financeservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FinanceResponse {
    public int term;
    public double principal_amount;
    public double original_payment;
    public double interest_payment;
    public double interest_amount;
    public double interest_month;
    public double remaining_balance;
    public double prepay_amount;
    public double total_amount;


}
