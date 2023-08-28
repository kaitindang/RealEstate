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

    @Query(value = "SELECT * FROM Account as ac WHERE " +
            "ac.enable_account = true " +
            "And ac.id_account != :id " +
            "And ac.address LIKE CONCAT('%',:address, '%') ",nativeQuery = true)
    public List<Account> findAccountByAddress(int id, String address);
}
