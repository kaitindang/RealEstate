package com.web.bds.authservice.repo;
import com.web.bds.authservice.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountRepo extends JpaRepository<Account, Integer> {

    Optional<Account> findByUsername(String username);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);

    @Query("SELECT ac FROM Account ac WHERE " +
            "ac.enable_account = true " +
            "And ac.id != :id " +
            "And ac.address LIKE CONCAT('%',:address, '%') ")
    public List<Account> findAccountByAddress(int id, String address);
}
