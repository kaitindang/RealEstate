package com.web.bds.controller;

import com.web.bds.entity.Payment;
import com.web.bds.entity.PaymentHistory;
import com.web.bds.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin("http://localhost:3000")
public class PaymentController {

    @Autowired
    PaymentService paymentService;

    @PostMapping("/cashIn")
    public ResponseEntity<Payment> cashIn(@RequestBody Payment payment){
        return ResponseEntity.ok(paymentService.cashIn(payment));
    }

    @GetMapping("/payment-history/{id_payment}")
    public ResponseEntity<List<PaymentHistory>> paymentHistory(@PathVariable int id_payment){
        return ResponseEntity.ok(paymentService.getPaymentHistory(id_payment));
    }

    @GetMapping("/findByAccountId/{id_account}")
    public ResponseEntity<Payment> findByAccountId(@PathVariable int id_account){
        return ResponseEntity.ok(paymentService.findByAccountId(id_account));
    }
}
