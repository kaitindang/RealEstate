package com.web.bds.service;

import com.web.bds.entity.Payment;
import com.web.bds.entity.PaymentHistory;
import com.web.bds.repo.PaymentHistoryRepo;
import com.web.bds.repo.PaymentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    @Autowired
    PaymentRepo paymentRepo;

    @Autowired
    PaymentHistoryRepo paymentHistoryRepo;

    public Payment cashIn(Payment payment){
        Payment paymentFromDb = paymentRepo.findByAccountId(payment.getId_account());
        if (paymentFromDb == null){
            Payment payment2 = new Payment();
            payment2.setId_account(payment.getId_account());
            payment2.setAmount(payment.getAmount());
            paymentRepo.save(payment2);
            return payment2;
        }
        paymentFromDb.setId_account(payment.getId_account());
        paymentFromDb.setAmount(paymentFromDb.getAmount() + payment.getAmount());
        Payment payment1 = paymentRepo.save(paymentFromDb);

        PaymentHistory paymentHistory = new PaymentHistory();
        paymentHistory.setId_payment(payment.getId_payment());
        paymentHistory.setPre_amount(paymentFromDb.getAmount());
        paymentHistory.setPay_money(payment.getAmount());
        paymentHistory.setAft_amount(payment1.getAmount());

        paymentHistoryRepo.save(paymentHistory);

        return paymentFromDb;
    }
}
