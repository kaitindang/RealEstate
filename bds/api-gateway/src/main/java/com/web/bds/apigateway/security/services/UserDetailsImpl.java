package com.web.bds.apigateway.security.services;

import com.web.bds.authservice.entity.Account;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.sql.Timestamp;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;


public class UserDetailsImpl implements UserDetails {

    private static final long serialVersionUID = 1L;

    private int id;

    private String username;


    private String firstname;

    private String lastname;

    private String email;

    private String password;

    private Timestamp dateOfBirth;

    private int phone;

    private String avatar;


    private Timestamp create_date;


    private Timestamp last_login;



    private Collection<? extends GrantedAuthority> authorities;


    public UserDetailsImpl(int id, String username, String firstname, String lastname, String email, String password,
                           Timestamp dateOfBirth,
                           int phone,
                           String avatar,
                           Timestamp create_date,
                           Timestamp last_login,
                           Collection<? extends GrantedAuthority> authorities){
        this.id = id;
        this.username =username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.dateOfBirth = dateOfBirth;
        this.phone = phone;
        this.avatar = avatar;
        this.create_date = create_date;
        this.last_login = last_login;
        this.authorities = authorities;

    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    public String getFirstname() {
        return firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public int getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }


    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(Object o){
        if(this == o){
            return true;
        }
        if(o == null || getClass() != o.getClass())
            return false;
        UserDetailsImpl account = (UserDetailsImpl) o;
        return Objects.equals(id,account.id);
    }


}
