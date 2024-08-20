package com.homefinder.homefinder.repositories;

import com.homefinder.homefinder.entity.Properties;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

public interface PropertyRepository extends JpaRepository<Properties,Long> {

    List<Properties> findAllByPropertyFor(String propertyFor);

    List<Properties> findAllByOwnerId(Long userId);
}
