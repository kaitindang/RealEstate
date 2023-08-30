package com.web.bds.repo;

import com.web.bds.entity.PaymentHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PaymentHistoryRepo extends JpaRepository<PaymentHistory,Integer> {

    @Query(value = "SELECT * FROM paymenthistory where id_payment=:id_payment",nativeQuery = true)
    public List<PaymentHistory> getPaymentHistoryfromIdPayment(@Param("id_payment") int id_payment);
}
