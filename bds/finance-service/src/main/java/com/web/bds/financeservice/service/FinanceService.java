package com.web.bds.financeservice.service;

import com.web.bds.financeservice.entity.Bank;
import com.web.bds.financeservice.repo.FinanceRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class FinanceService {

    @Autowired
    FinanceRepo financeRepo;

    public Bank findBank(int id_bank) {

        Bank bank =  financeRepo.findById(id_bank).get();

        return bank;
    }


}
