package com.web.bds.financeservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FinanceRequest {
    public float loan_amount;
    public float loan_term;
    public float interest_rate;
    public int repayment_method;
    public int id_bank;
    public float prices_property;

}
