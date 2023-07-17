package com.web.bds.repo;

import com.web.bds.entity.PaymentHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentHistoryRepo extends JpaRepository<PaymentHistory,Integer> {
}
