package com.web.bds.financeservice.security.jwt;

import com.web.bds.authservice.security.services.UserDetailsImpl;
import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class JwtUtils {

    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    @Value("${spring.web.jwtSecret}")
    private String jwtSecret;

    @Value("${spring.web.jwtExpirationms}")
    private int jwtExpirationms;

    public String generateJwtToken(Authentication authentication){
        UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();
        return Jwts.builder()
                .setSubject(userPrincipal.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + jwtExpirationms))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();

    }

    public String getUserNameFromJwtToken(String token){
            return Jwts.parserBuilder().setSigningKey(jwtSecret).build().parseClaimsJws(token).getBody().getSubject();
    }

    public Collection<? extends GrantedAuthority> getAuthories(String token){
        List<String> object = (List<String> ) Jwts.
                parserBuilder().setSigningKey(jwtSecret).build().parseClaimsJws(token).getBody().get("roles");

        ArrayList<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();

        for (int i = 0 ; i < object.size();i++) {
            authorities.add(new SimpleGrantedAuthority(object.get(i)));
        }

        return authorities;
    }

    public boolean validateJwtToken(String authToken){
        try{
            Jwts.parserBuilder().setSigningKey(jwtSecret).build().parseClaimsJws(authToken);
            return  true;
        }catch (SecurityException e){
            logger.error("Invalid JWT signature: {}",e.getMessage());
        }catch (MalformedJwtException e){
            logger.error("Invalid JWT token: {}",e.getMessage());
        }catch (ExpiredJwtException e){
            logger.error("JWT token is expired: {}",e.getMessage());
        }catch (UnsupportedJwtException e){
            logger.error("JWT token is unsupported",e.getMessage());
        }catch (IllegalArgumentException e){
            logger.error("JWT claims string is empty: {}",e.getMessage());
        }
        return  false;
    }


}
