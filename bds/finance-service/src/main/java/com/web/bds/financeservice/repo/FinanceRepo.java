package com.web.bds.financeservice.repo;

import com.web.bds.financeservice.entity.Bank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FinanceRepo extends JpaRepository<Bank,Integer> {


}
