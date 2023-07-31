package com.web.bds.authservice.controller;

import com.web.bds.authservice.entity.Account;
import com.web.bds.authservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping(value = "/all-users")
    public Map<String, Object> getAllUser(@RequestParam(value = "page", defaultValue = "0") int page,
                                                     @RequestParam(value = "size", defaultValue = "5") int size) {
        List<Account> users = new ArrayList<Account>();
        Pageable pagination = PageRequest.of(page, size);
        Page<Account> userPage;

        userPage = userService.findAllUser(pagination);

        users = userPage.getContent();
        Map<String, Object> response = new HashMap<String, Object>();
        response.put("users", users);
        response.put("totalPages", userPage.getTotalPages());
        return response;
    }

    @GetMapping(value = "/all-user")
    public List<Account> getAllUser() {

        return userService.findAllUser();
    }

    @PostMapping(value = {"/upload-avatar/{id}" })
    public Account saveAvatar(@PathVariable int id, @RequestParam("file") MultipartFile file) {

        try {
            return userService.uploadAvatar(id, file);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping(value = {"/get-user/{id}" })
    public Account getListing(@PathVariable int id) {
        return userService.findUserById(id).get();
    }

    @PutMapping("/update-user/{id}")
    public ResponseEntity<Account> updateUser(@PathVariable int id, @RequestBody Account account) {

        Account updateAccount = userService.findUserById(id).get();

        userService.updateUser(id, account);

        return ResponseEntity.ok(account);
    }

    @DeleteMapping("/delete-user/{id}")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable int id){

        Account updateAccount = userService.findUserById(id).get();

        userService.deleteUser(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }

}
