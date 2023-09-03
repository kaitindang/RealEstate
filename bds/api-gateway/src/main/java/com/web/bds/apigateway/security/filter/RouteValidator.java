package com.web.bds.apigateway.security.filter;

import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

import java.util.function.Predicate;

import java.util.List;

@Component
public class RouteValidator {
    public static final List<String> openApiEndpoints = List.of(
            "/api/auth/signin",
            "/api/auth/token",
            "/api/auth/signup",
            "/eureka",
            "/realestates/all-listing",
            "/admin/realestate",
            "/photo",
            "/api/payment",
            "/finance",
            "/user"
    );

    public Predicate<ServerHttpRequest> isSecured =
            request -> openApiEndpoints
                    .stream()
                    .noneMatch(uri -> request.getURI().getPath().contains(uri));
}
