package com.homefinder.homefinder.service;

import com.homefinder.homefinder.dto.PropertiesImageDTO;
import com.homefinder.homefinder.dto.PropertyDTO;
import com.homefinder.homefinder.entity.OwnerImage;
import com.homefinder.homefinder.entity.Properties;
import com.homefinder.homefinder.entity.PropertyImage;
import com.homefinder.homefinder.entity.User;
import com.homefinder.homefinder.exception.CustomException;
import com.homefinder.homefinder.repositories.PropertyRepository;
import com.homefinder.homefinder.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PropertiesService {

    private static final Logger logger = LoggerFactory.getLogger(PropertiesService.class);

    private final PropertyRepository propertyRepository;
    private final UserRepository userRepository;
    private final OwnerImageService ownerImageService;
    private final PropertyImageService propertyImageService;

    @Autowired
    public PropertiesService(PropertyRepository propertyRepository, UserRepository userRepository,
                             OwnerImageService ownerImageService, PropertyImageService propertyImageService) {
        this.propertyRepository = propertyRepository;
        this.userRepository = userRepository;
        this.ownerImageService = ownerImageService;
        this.propertyImageService = propertyImageService;
    }

    @Transactional
    public PropertyDTO saveProperty(PropertyDTO propertyDTO, Long userId){

        logger.info("Saving property with DTO: {} for user ID: {}", propertyDTO, userId);

        User owner = userRepository.findById(userId)
                .orElseThrow(() -> {
                    String errorMessage = "User not found with ID: " + userId;
                    logger.error(errorMessage);
                    return new CustomException(errorMessage);
                });


        Properties properties = dtoToEntity(propertyDTO);
        properties.setOwner(owner);

        List<PropertyImage> images = propertyImageService.saveImages(propertyDTO.getProperty_images(), properties);
        properties.setPropertyImages(images);

        if (propertyDTO.getOwner_image() != null) {
            OwnerImage ownerImage = ownerImageService.saveOwnerImage(propertyDTO.getOwner_image());
            properties.setOwnerImage(ownerImage);
        }

        Properties savedProperty = propertyRepository.save(properties);
        logger.info("Property saved with ID: {}", savedProperty.getId());
        return entityToDto(savedProperty);

    }

    public List<PropertyDTO> getAllProperties() {
        logger.info("Fetching all properties");
        List<PropertyDTO> properties = propertyRepository.findAll().stream()
                .map(this::entityToDto)
                .collect(Collectors.toList());
        logger.info("Fetched {} properties", properties.size());
        return properties;
    }

    public PropertyDTO getPropertyById(Long id) {
        logger.info("Fetching property with ID: {}", id);
        Properties property = propertyRepository.findById(id)
                .orElseThrow(() -> {
                    String errorMessage = "Property not found with id: " + id;
                    logger.error(errorMessage);
                    return new CustomException(errorMessage);
                });
        return entityToDto(property);
    }

    public List<PropertyDTO> getAllPropertiesByUser(Long userId) {
        logger.info("Fetching all properties of user with id {}", userId);

        // Fetch all properties by userId. This should return a List<Properties>.
        List<Properties> properties = propertyRepository.findAllByOwnerId(userId);

        // Check if properties list is empty. If so, throw an exception.
        if (properties.isEmpty()) {
            String errorMessage = "No properties found for user with id: " + userId;
            logger.error(errorMessage);
            throw new CustomException(errorMessage);
        }

        // Convert entity list to DTO list.
        return properties.stream()
                .map(this::entityToDto)  // Convert each Properties entity to PropertyDTO
                .collect(Collectors.toList());
    }



    public List<PropertyDTO> getPropertiesByPropertyFor(String propertyFor) {
        logger.info("Fetching all properties for {}", propertyFor);
        List<PropertyDTO> properties = propertyRepository.findAllByPropertyFor(propertyFor).stream()
                .map(this::entityToDto)
                .collect(Collectors.toList());
        logger.info("Fetched {} properties", properties.size());
        return properties;
    }

    public void deleteProperty(Long id) {
        logger.info("Deleting property with ID: {}", id);
        if (!propertyRepository.existsById(id)) {
            String errorMessage = "Property not found with id: " + id;
            logger.error(errorMessage);
            throw new CustomException(errorMessage);
        }
        propertyRepository.deleteById(id);
        logger.info("Property with ID: {} deleted", id);
    }

    public PropertyDTO updateProperty(Long id, PropertyDTO propertyDTO) {
        logger.info("Updating property with ID: {}", id);

        Properties property = propertyRepository.findById(id)
                .orElseThrow(() -> {
                    String errorMessage = "Property not found with id: " + id;
                    logger.error(errorMessage);
                    return new CustomException(errorMessage);
                });

        updateEntityFromDto(property, propertyDTO);

        Properties updatedProperty = propertyRepository.save(property);
        logger.info("Property with ID: {} updated", updatedProperty.getId());
        return entityToDto(updatedProperty);
    }

    private Properties dtoToEntity(PropertyDTO dto) {
        Properties property = new Properties();
        property.setPropertyFor(dto.getProperty_for());
        property.setPropertyType(dto.getProperty_type());
        property.setLocation(dto.getLocation());
        property.setPrice(dto.getPrice());
        property.setNegotiable(dto.isNegotiable());
        property.setPropertySize(dto.getProperty_size());
        property.setPropertyDescription(dto.getProperty_description());
        property.setAgreementDuration(dto.getAgreement_duration());
        property.setOwner_phone(dto.getOwner_phone());
        return property;
    }

    private PropertyDTO entityToDto(Properties property) {
        PropertyDTO dto = new PropertyDTO();
        dto.setId(property.getId());
        dto.setProperty_for(property.getPropertyFor());
        dto.setProperty_type(property.getPropertyType());
        dto.setLocation(property.getLocation());
        dto.setPrice(property.getPrice());
        dto.setNegotiable(property.isNegotiable());
        dto.setProperty_size(property.getPropertySize());
        dto.setProperty_description(property.getPropertyDescription());
        dto.setAgreement_duration(property.getAgreementDuration());
        dto.setOwner_phone(property.getOwner_phone());

        List<PropertiesImageDTO> imageDTOs = property.getPropertyImages().stream()
                .map(propertyImageService::entityToDto)
                .collect(Collectors.toList());
        dto.setProperty_images(imageDTOs);

        if (property.getOwnerImage() != null) {
            dto.setOwner_image(ownerImageService.entityToDto(property.getOwnerImage()));
        }

        return dto;
    }

    private void updateEntityFromDto(Properties property, PropertyDTO dto) {
        property.setPropertyFor(dto.getProperty_for());
        property.setPropertyType(dto.getProperty_for());
        property.setLocation(dto.getLocation());
        property.setPrice(dto.getPrice());
        property.setNegotiable(dto.isNegotiable());
        property.setPropertySize(dto.getProperty_size());
        property.setPropertyDescription(dto.getProperty_description());
        property.setAgreementDuration(dto.getAgreement_duration());
        property.setOwner_phone(dto.getOwner_phone());
    }



}
