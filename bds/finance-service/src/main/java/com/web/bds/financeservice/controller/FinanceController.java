package com.web.bds.financeservice.controller;

import com.web.bds.financeservice.dto.FinanceRequest;
import com.web.bds.financeservice.dto.FinanceResponse;
import com.web.bds.financeservice.entity.Bank;
import com.web.bds.financeservice.service.FinanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/finance")
public class FinanceController {

    @Autowired
    FinanceService financeService;

    @GetMapping(value = "/all-bank")
    public List<Bank> getAllBank() {

        return financeService.findAllBank();
    }

    @PostMapping
    public List<FinanceResponse> CalculateInterest(@RequestBody FinanceRequest financeRequest) {

        List<FinanceResponse> financeResponses = new ArrayList<FinanceResponse>();

        Bank bank = new Bank();

        bank = financeService.findBank(financeRequest.getId_bank());

        financeRequest.setInterest_rate(bank.getBank_rate());

        double remain_loan = Math.round(financeRequest.getLoan_amount());
        double Interest_amount = 0;

        if (financeRequest.getRepayment_method() == 1) {

            for (int term = 1; term <= financeRequest.getLoan_term(); term++){

                FinanceResponse financeResponse = new FinanceResponse();

                double interestOfMonth = Math.round(financeRequest.getLoan_amount()/financeRequest.getLoan_term());
                double loanOfMonth = Math.round((financeRequest.getLoan_amount()*(financeRequest.getInterest_rate()/100))/12);
                double moneyOfMonth = Math.round(interestOfMonth + loanOfMonth);


                financeResponse.setTerm(term);
                financeResponse.setPrepay_amount(Math.round(financeRequest.getPrices_property()-financeRequest.getLoan_amount()));
                financeResponse.setPrincipal_amount(Math.round(remain_loan));
                if(term == financeRequest.getLoan_term()) {
                    financeResponse.setOriginal_payment(Math.round(financeResponse.getPrincipal_amount()));
                } else {
                    financeResponse.setOriginal_payment(Math.round(financeRequest.getLoan_amount()/financeRequest.getLoan_term()));
                }

                remain_loan -= Math.round(financeResponse.getOriginal_payment());
                financeResponse.setRemaining_balance(Math.round(remain_loan));
                financeResponse.setInterest_payment(Math.round(loanOfMonth));
                financeResponse.setInterest_month(Math.round(financeResponse.getOriginal_payment()+financeResponse.getInterest_payment()));
                Interest_amount += Math.round(financeResponse.getInterest_payment());
                financeResponse.setInterest_amount(Math.round(Interest_amount));
                financeResponse.setTotal_amount(Math.round(financeRequest.getPrices_property()+financeResponse.getInterest_amount()));

                financeResponses.add(financeResponse);

            }
        } else {
            for (int term = 1; term <= financeRequest.getLoan_term(); term++) {

                FinanceResponse financeResponse = new FinanceResponse();

                float interestOfMonth = Math.round(financeRequest.getLoan_amount() / financeRequest.getLoan_term());
                float loanOfMonth = Math.round((remain_loan * (financeRequest.getInterest_rate() / 100)) / 12);
                float moneyOfMonth = Math.round(interestOfMonth + loanOfMonth);

                financeResponse.setTerm(term);
                financeResponse.setPrepay_amount(Math.round(financeRequest.getPrices_property()-financeRequest.getLoan_amount()));
                financeResponse.setPrincipal_amount(Math.round(remain_loan));
                if(term == financeRequest.getLoan_term()) {
                    financeResponse.setOriginal_payment(Math.round(financeResponse.getPrincipal_amount()));
                } else {
                    financeResponse.setOriginal_payment(Math.round(financeRequest.getLoan_amount()/financeRequest.getLoan_term()));
                }

                remain_loan -= Math.round(financeResponse.getOriginal_payment());
                financeResponse.setRemaining_balance(Math.round(remain_loan));
                financeResponse.setInterest_payment(Math.round(loanOfMonth));
                financeResponse.setInterest_month(Math.round(financeResponse.getOriginal_payment()+financeResponse.getInterest_payment()));
                Interest_amount += Math.round(financeResponse.getInterest_payment());
                financeResponse.setInterest_amount(Math.round(Interest_amount));
                financeResponse.setTotal_amount(Math.round(financeRequest.getPrices_property()+financeResponse.getInterest_amount()));

                financeResponses.add(financeResponse);
            }
        }

        return financeResponses;
    }
}
