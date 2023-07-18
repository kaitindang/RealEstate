package com.web.bds.productservice.rabbitmq.publisher;

import com.web.bds.productservice.entity.Listing;
import com.web.bds.productservice.entity.RequestPayment;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class RabbitMQJsonProducer {
    @Value("${rabbitmq.exchange.name}")
    private String exchange;

    @Value("${rabbitmq.routing.json.key}")
    private String routingjsonkey;

    private static final Logger LOGGER = LoggerFactory.getLogger(RabbitMQJsonProducer.class);
    private RabbitTemplate rabbitTemplate;

    public RabbitMQJsonProducer(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void sendJsonMessager(RequestPayment payment) {
        LOGGER.info(String.format("Json message sent -> %s",payment.toString()));
        rabbitTemplate.convertAndSend(exchange,routingjsonkey,payment);
    }
}
