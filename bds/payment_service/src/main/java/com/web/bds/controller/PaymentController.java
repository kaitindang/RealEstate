package com.web.bds.controller;

import com.web.bds.entity.Payment;
import com.web.bds.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    PaymentService paymentService;

    @PostMapping("/cashIn")
    public ResponseEntity<Payment> cashIn(Payment payment){
        return ResponseEntity.ok(paymentService.cashIn(payment));
    }
}
