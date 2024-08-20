package com.homefinder.homefinder.service;

import com.homefinder.homefinder.entity.User;
import com.homefinder.homefinder.repositories.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user){
        logger.debug("Attempting to register with email : {}", user.getEmail());
        System.out.println(("User input : "+user.getEmail()));
        System.out.println("finding user by email : "+userRepository.findByEmail(user.getEmail()));
        // Checking if the email already exists
        if(userRepository.findByEmail(user.getEmail()) != null){

            logger.warn("Email already registered {}", user.getEmail());
            throw new RuntimeException("Email already registered...!");
        }

        // Save the user
        User savedUser = userRepository.save(user);
        logger.info("User registered successfully with email: {}", user.getEmail());
        return savedUser;

    }

    public boolean authenticateUser(User user){
        logger.debug("Attempting to authenticate user with email : {}",user.getEmail());

        String email = user.getEmail();
        String rawPassword = user.getPassword();

        User userFromDb = userRepository.findByEmail(email);
        if(userFromDb != null && userFromDb.getPassword().equals(rawPassword)){
            logger.info("User authenticated successfully with email: {}", email);
            return true;
        }
        logger.info("Authentication failed for email: {}", email);
        return false;
    }


    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
