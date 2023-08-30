package com.web.bds.rabbitmq.consumer;
import com.web.bds.entity.Payment;
import com.web.bds.entity.PaymentHistory;
import com.web.bds.repo.PaymentHistoryRepo;
import com.web.bds.repo.PaymentRepo;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;


@Component
public class RabbitMQJsonConsumer {

    @Autowired
    PaymentRepo paymentRepo;

    @Autowired
    PaymentHistoryRepo paymentHistoryRepo;

    @RabbitListener(queues = "${rabbitmq.queue.name}")
    public void consumeJsonMessage(Payment payment){
        Payment paymentFromDb = paymentRepo.findByAccountId(payment.getId_account());
        double money = paymentFromDb.getAmount();
        double paymoney = payment.getAmount();
        if(paymentFromDb == null){
          throw new RuntimeException("Tài khoản không tồn tại");
        }else if(money <= 0){
            throw new RuntimeException("Hiện không có số dư trong tài khoản");
        }
        else if(money < payment.getAmount()){
            throw new RuntimeException("Tài khoản không đủ để đăng ký gói");
        }

        payment.setId_payment(paymentFromDb.getId_payment());
        payment.setAmount(money - payment.getAmount());
        Payment payment1 = paymentRepo.save(payment);

        //Update History

        PaymentHistory paymentHistory = new PaymentHistory();
        paymentHistory.setId_payment(payment.getId_account());
        paymentHistory.setPre_amount(money);
        paymentHistory.setPay_money(paymoney);
        paymentHistory.setAft_amount(payment1.getAmount());
        paymentHistory.setDate_modified(new Timestamp(System.currentTimeMillis()));
        paymentHistory.setPerson_modified(payment.getId_account());

        paymentHistoryRepo.save(paymentHistory);
    }
}
