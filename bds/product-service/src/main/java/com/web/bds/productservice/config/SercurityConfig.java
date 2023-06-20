package com.web.bds.productservice.config;
import com.web.bds.productservice.security.jwt.AuthEntryPointJwt;
import com.web.bds.productservice.security.jwt.AuthTokenFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class SercurityConfig {

    private LogoutHandler logoutHandler;
    @Autowired
    private AuthEntryPointJwt unauthorizedHandler;

    @Bean
    public AuthTokenFilter authenticationJwtTokenFilter() {
        return new AuthTokenFilter();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.headers().httpStrictTransportSecurity().disable().and().cors().and().csrf().disable().addFilterAfter(authenticationJwtTokenFilter(),UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .authorizeHttpRequests().requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/test/**").permitAll().requestMatchers("/api/v1/**").permitAll()
                .requestMatchers("/admin/**").permitAll()
                .requestMatchers("/").permitAll()
                .requestMatchers(HttpMethod.GET,"/error").permitAll()
                .requestMatchers(HttpMethod.POST,"/error").permitAll()
                .anyRequest().authenticated();
//                .and()
//                .authenticationProvider(authenticationProvider)
//                .logout()
//                .logoutUrl("/api/v1/auth/logout")
//                .addLogoutHandler(logoutHandler)
//                .logoutSuccessHandler((request, response, authentication) -> SecurityContextHolder.clearContext());
//                .requestMatchers("/api/auth/**").permitAll()
//                .requestMatchers("/api/test/**").permitAll().
//                anyRequest().authenticated();



        return http.build();
    }
}
