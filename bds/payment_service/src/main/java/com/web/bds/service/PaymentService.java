package com.web.bds.service;

import com.web.bds.entity.Payment;
import com.web.bds.repo.PaymentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    @Autowired
    PaymentRepo paymentRepo;

    public Payment findPaymentByAccountId (int id){
        return paymentRepo.findByAccountId(id);
    }
}
