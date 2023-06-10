package com.web.bds.authservice.repo;
import com.web.bds.authservice.Enum.ERole;
import com.web.bds.authservice.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepo extends JpaRepository<Role,Integer> {
    Optional<Role> findByName(ERole name);
}
