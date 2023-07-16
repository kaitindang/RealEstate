package com.web.bds.rabbitmq.consumer;
import com.web.bds.entity.Payment;
import com.web.bds.repo.PaymentRepo;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


@Component
public class RabbitMQJsonConsumer {

    @Autowired
    PaymentRepo paymentRepo;

    @RabbitListener(queues = "${rabbitmq.queue.name}")
    public void consumeJsonMessage(Payment payment){

    }
}
