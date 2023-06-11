package com.web.bds.authservice.security.services;


import com.web.bds.authservice.entity.Account;
import com.web.bds.authservice.repo.AccountRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    AccountRepo accountRepo;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Account user = accountRepo.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found with username"));
        return UserDetailsImpl.build(user);
    }
}
