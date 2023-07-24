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

    @GetMapping(value = "/cal-tax")
    public String getAllListingApproved(@RequestParam(value = "loan") double loan,
                                     @RequestParam(value = "rate") double rate,
                                     @RequestParam(value = "month") double month) {

        NumberFormat formatter = new DecimalFormat("###.#####");

        double interestOfMonth;
        double loanOfMonth;
        double moneyOfMonth;

        interestOfMonth = loan/month;
        loanOfMonth = (loan*(rate/100))/month;
        moneyOfMonth = interestOfMonth + loanOfMonth;

        String result = formatter.format(moneyOfMonth);

        return result;
    }

    @PostMapping
    public List<FinanceResponse> CalculateInterest(@RequestBody FinanceRequest financeRequest) {

        List<FinanceResponse> financeResponses = new ArrayList<FinanceResponse>();

        Bank bank = new Bank();

        bank = financeService.findBank(financeRequest.getId_bank());

        financeRequest.setInterest_rate(bank.getBank_rate());

        float remain_loan = financeRequest.getLoan_amount();

        if (financeRequest.getRepayment_method() == 1) {

            for (int term = 1; term <= financeRequest.getLoan_term(); term++){

                FinanceResponse financeResponse = new FinanceResponse();

                float interestOfMonth = financeRequest.getLoan_amount()/financeRequest.getLoan_term();
                float loanOfMonth = (financeRequest.getLoan_amount()*(financeRequest.getInterest_rate()/100))/financeRequest.getLoan_term();
                float moneyOfMonth = interestOfMonth + loanOfMonth;

                financeResponse.setTerm(term);
                financeResponse.setPrepay_amount(financeRequest.getPrices_property()-financeRequest.getLoan_amount());
                financeResponse.setPrincipal_amount(remain_loan);
                financeResponse.setOriginal_payment(financeRequest.getLoan_amount()/financeRequest.getLoan_term());
                remain_loan -= (financeRequest.getLoan_amount()/financeRequest.getLoan_term());
                financeResponse.setRemaining_balance(remain_loan);
                financeResponse.setInterest_payment(loanOfMonth);
                financeResponse.setInterest_amount(financeRequest.getLoan_amount()*(financeRequest.getInterest_rate()/100));
                financeResponse.setInterest_month(moneyOfMonth);
                financeResponse.setTotal_amount(financeRequest.getPrices_property()+financeResponse.getInterest_amount());

                financeResponses.add(financeResponse);

            }
        } else {
            for (int term = 1; term <= financeRequest.getLoan_term(); term++) {

                FinanceResponse financeResponse = new FinanceResponse();

                float interestOfMonth = financeRequest.getLoan_amount() / financeRequest.getLoan_term();
                float loanOfMonth = (remain_loan * (financeRequest.getInterest_rate() / 100)) / financeRequest.getLoan_term();
                float moneyOfMonth = interestOfMonth + loanOfMonth;

                financeResponse.setTerm(term);
                financeResponse.setPrepay_amount(financeRequest.getPrices_property() - financeRequest.getLoan_amount());
                financeResponse.setPrincipal_amount(remain_loan);
                financeResponse.setOriginal_payment(financeRequest.getLoan_amount() / financeRequest.getLoan_term());
                remain_loan -= (financeRequest.getLoan_amount() / financeRequest.getLoan_term());
                financeResponse.setRemaining_balance(remain_loan);
                financeResponse.setInterest_payment(loanOfMonth);
                financeResponse.setInterest_amount(financeRequest.getLoan_amount() * (financeRequest.getInterest_rate() / 100));
                financeResponse.setInterest_month(moneyOfMonth);
                financeResponse.setTotal_amount(financeRequest.getPrices_property() + financeResponse.getInterest_amount());

                financeResponses.add(financeResponse);
            }
        }

        return financeResponses;
    }
}
