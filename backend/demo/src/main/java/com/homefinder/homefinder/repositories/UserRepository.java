package com.homefinder.homefinder.repositories;

import com.homefinder.homefinder.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {

    User findByEmail(String email);
    String findPasswordByEmail(String email);
}
