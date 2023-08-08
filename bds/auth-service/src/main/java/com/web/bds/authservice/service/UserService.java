package com.web.bds.authservice.service;

import com.ctc.wstx.util.StringUtil;
import com.web.bds.authservice.entity.Account;
import com.web.bds.authservice.repo.AccountRepo;
import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    AccountRepo accountRepo;

    @Autowired
    PasswordEncoder passwordEncoder;

    public UserService() throws IOException {
    }

    public List<Account> findAllUser() {

        return accountRepo.findAll();
    }

    public Page<Account> findAllUser(Pageable pageable) {
        return accountRepo.findAll(pageable);
    }

    public Optional<Account> findUserById(int id) {

        return this.accountRepo.findById(id);
    }

    public Account updateUser(int id, Account account) {

        Account updateAccount = accountRepo.findById(id).orElse(null);

        updateAccount.setFirstname(account.getFirstname());
        updateAccount.setLastname(account.getLastname());
        updateAccount.setEmail(account.getEmail());
        updateAccount.setDateOfBirth(account.getDateOfBirth());
        updateAccount.setPhone(account.getPhone());

        return accountRepo.save(updateAccount);
    }

    public boolean isTruePassword(int id, String oldPassword) {

        Account account = accountRepo.findById(id).orElse(null);

        if(account != null) {
            boolean check = passwordEncoder.matches(oldPassword, account.getPassword());

            return check;
        } else {
            return false;
        }
    }

    public int updatePassword(int id, String newPassword, String oldPassword) {

        Account account = accountRepo.findById(id).orElse(null);

        boolean checkPassword = isTruePassword(id, oldPassword);

        if(checkPassword) {
            account.setPassword(passwordEncoder.encode(newPassword));

            accountRepo.save(account);

            return 1;
        }

        return 0;

    }

    public void deleteUser(int id) {
        accountRepo.deleteById(id);
    }

    private final Path UPLOAD_PATH =
            Paths.get(new ClassPathResource("").getFile().getAbsolutePath()
                    + File.separator + "static"
                    + File.separator + "image");

    public Account uploadAvatar(int id, MultipartFile file) throws IOException {

        if (!Files.exists(UPLOAD_PATH)) {
            Files.createDirectories(UPLOAD_PATH);
        }

        String timeStampedFileName = new SimpleDateFormat("ssmmHHddMMyyyy")
                .format(new Date()) + "_" + file.getOriginalFilename();

        Path filePath = UPLOAD_PATH.resolve(timeStampedFileName);
        Files.copy(file.getInputStream(), filePath);

        String fileUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/image/").path(timeStampedFileName).toUriString();

        Account avatar = accountRepo.findById(id).orElse(null);
        avatar.setAvatar(fileUri);

        return accountRepo.save(avatar);
    }
}
