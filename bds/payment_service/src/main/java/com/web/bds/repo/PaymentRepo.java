package com.web.bds.repo;

import com.web.bds.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepo extends JpaRepository<Payment,Integer> {
    @Query(value = "SELECT * FROM payment WHERE id_account = :id",nativeQuery = true)
    Payment findByAccountId(int id);
}
