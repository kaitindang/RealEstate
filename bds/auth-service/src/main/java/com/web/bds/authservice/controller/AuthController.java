package com.web.bds.authservice.controller;



import com.web.bds.authservice.Enum.ERole;
import com.web.bds.authservice.entity.Account;
import com.web.bds.authservice.entity.Role;
import com.web.bds.authservice.payload.request.LoginRequest;
import com.web.bds.authservice.payload.request.SignupRequest;
import com.web.bds.authservice.payload.response.JwtResponse;
import com.web.bds.authservice.payload.response.MessageResponse;
import com.web.bds.authservice.repo.AccountRepo;
import com.web.bds.authservice.repo.RoleRepo;
import com.web.bds.authservice.security.jwt.JwtUtils;
import com.web.bds.authservice.security.services.UserDetailsImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    AccountRepo accountRepo;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    RoleRepo roleRepo;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping(value = "/signin", consumes = {"application/json"})
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);


        UserDetailsImpl accountDetailIs = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = accountDetailIs.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        Account account = accountRepo.findById(accountDetailIs.getId()).get();
        account.setLast_login(new Timestamp(System.currentTimeMillis()));
        String jwt = jwtUtils.generateJwtToken(authentication,roles);

        accountRepo.save(account);


        return ResponseEntity.ok(new JwtResponse(jwt,
                accountDetailIs.getId(),
                accountDetailIs.getUsername(),
                accountDetailIs.getEmail(),
                roles));


    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signupRequest){
        if(accountRepo.existsByUsername(signupRequest.getUsername())){
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already exist!"));
        }

        if(accountRepo.existsByEmail(signupRequest.getEmail())){
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        Account account = new Account(
                signupRequest.getUsername(),
                signupRequest.getFirstname(),
                signupRequest.getLastname(),
                signupRequest.getEmail(),
                passwordEncoder.encode(signupRequest.getPassword()),
                signupRequest.getAvatar(),
                signupRequest.getPhone(),
                signupRequest.getDateOfBirth()

        );

        Set<String> strRoles = signupRequest.getRole();
        Set<Role> roles = new HashSet<>();

        if(strRoles == null){
            Role userRole = roleRepo.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found"));
            roles.add(userRole);
        }else{
            strRoles.forEach(role -> {
                switch (role){
                    case "admin":
                        Role adminRole = roleRepo.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found"));
                        roles.add(adminRole);
                        break;
                    default:
                        Role userRole = roleRepo.findByName(ERole.ROLE_USER)
                                .orElseThrow(()-> new RuntimeException("Error: Role is not found"));
                        roles.add(userRole);
                }

            });
        }
        account.setRoles(roles);
        account.setCreate_date(new Timestamp(System.currentTimeMillis()));
        accountRepo.save(account);

        return  ResponseEntity.ok(new MessageResponse("User registered successful"));
    }


}
