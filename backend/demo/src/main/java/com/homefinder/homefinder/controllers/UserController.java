package com.homefinder.homefinder.controllers;

import com.homefinder.homefinder.entity.User;
import com.homefinder.homefinder.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/api")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<Map<String, String>> signup(@RequestBody User user) {
        logger.debug("Received signup request for email: {}", user.getEmail());

        try {

            User registeredUser =  userService.registerUser(user);
            logger.info("User registered successfully with email: {}", user.getEmail());
            Map<String, String> response = new HashMap<>();
            response.put("message", "User registered successfully");
            Long id = registeredUser.getId();
            String strId = id.toString();
            response.put("userId", strId);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            logger.error("Error registering user with email: {}", user.getEmail(), e);
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String,String>> login(@RequestBody User user) {
        logger.debug("Received login request for email: {}", user.getEmail());
        Map<String, String> response = new HashMap<>();
        try {
            boolean result = userService.authenticateUser(user);

            if (result) {
                User authenticatedUser = userService.getUserByEmail(user.getEmail());
                logger.info("User authenticated successfully with email: {}", user.getEmail());
                response.put("message", "Authentication successful");
                Long id = authenticatedUser.getId();
                response.put("userId", id.toString());
                return ResponseEntity.ok(response);
            } else {
                logger.warn("Authentication failed for email: {}", user.getEmail());
                response.put("message", "Authentication failed");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }
        } catch (Exception e) {
            logger.error("Error during authentication for email: {}", user.getEmail(), e);
            response.put("message", "Internal server error");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
