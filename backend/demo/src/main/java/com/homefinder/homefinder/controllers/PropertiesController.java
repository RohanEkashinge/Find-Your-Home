package com.homefinder.homefinder.controllers;

import com.homefinder.homefinder.dto.PropertyDTO;
import com.homefinder.homefinder.service.PropertiesService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/properties")
public class PropertiesController {

    private final PropertiesService propertiesService;
    private static final Logger logger = LoggerFactory.getLogger(PropertiesController.class);


    public PropertiesController(PropertiesService propertiesService) {
        this.propertiesService = propertiesService;
    }

    @PostMapping
    public ResponseEntity<PropertyDTO> createProperty(@RequestBody @Valid PropertyDTO propertyDTO, @RequestParam Long userId) {
        logger.info("Creating property with userId: {}", userId);
        PropertyDTO createdProperty = propertiesService.saveProperty(propertyDTO, userId);
        logger.info("Property created with ID: {}", createdProperty.getId());
        return new ResponseEntity<>(createdProperty, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<PropertyDTO>> getAllProperties() {
        logger.info("Fetching all properties");
        List<PropertyDTO> properties = propertiesService.getAllProperties();
        return new ResponseEntity<>(properties, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PropertyDTO> getPropertyById(@PathVariable Long id) {
        logger.info("Fetching property with ID: {}", id);
        PropertyDTO property = propertiesService.getPropertyById(id);
        if (property == null) {
            logger.warn("Property with ID: {} not found", id);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(property, HttpStatus.OK);
    }

    @GetMapping("/property-for")
    public ResponseEntity<List<PropertyDTO>> getProperties(@RequestParam String propertyFor) {
        logger.info("Fetching all properties for {}", propertyFor);
        List<PropertyDTO> properties = propertiesService.getPropertiesByPropertyFor(propertyFor);
        return new ResponseEntity<>(properties, HttpStatus.OK);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<List<PropertyDTO>> getAllPropertiesByUser(@PathVariable Long id) {
        logger.info("Fetching all properties for user with id {}", id);

        List<PropertyDTO> properties = propertiesService.getAllPropertiesByUser(id);

        return new ResponseEntity<>(properties, HttpStatus.OK);
    }


    @PutMapping("/{id}")
    public ResponseEntity<PropertyDTO> updateProperty(@PathVariable Long id, @RequestBody @Valid PropertyDTO propertyDTO) {
        logger.info("Updating property with ID: {}", id);
        PropertyDTO updatedProperty = propertiesService.updateProperty(id, propertyDTO);
        if (updatedProperty == null) {
            logger.warn("Property with ID: {} not found", id);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        logger.info("Property with ID: {} updated", id);
        return new ResponseEntity<>(updatedProperty, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProperty(@PathVariable Long id) {
        logger.info("Deleting property with ID: {}", id);
        propertiesService.deleteProperty(id);
        logger.info("Property with ID: {} deleted", id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
