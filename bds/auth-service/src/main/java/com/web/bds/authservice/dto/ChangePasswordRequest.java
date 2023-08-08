package com.web.bds.authservice.dto;

import lombok.Data;

@Data
public class ChangePasswordRequest {
    private int id;
    private String oldPassword;
    private String newPassword;
}
