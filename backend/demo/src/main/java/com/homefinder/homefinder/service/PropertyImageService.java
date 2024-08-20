package com.homefinder.homefinder.service;

import com.homefinder.homefinder.dto.PropertiesImageDTO;
import com.homefinder.homefinder.entity.Properties;
import com.homefinder.homefinder.entity.PropertyImage;
import com.homefinder.homefinder.repositories.PropertyImageRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PropertyImageService {

    private static final Logger logger = LoggerFactory.getLogger(PropertyImageService.class);

    private final PropertyImageRepository propertyImageRepository;

    @Autowired
    public PropertyImageService(PropertyImageRepository propertyImageRepository) {
        this.propertyImageRepository = propertyImageRepository;
    }

    public List<PropertyImage> saveImages(List<PropertiesImageDTO> imageDTOs, Properties property) {

        logger.info("Saving images for property ID: {}", property.getId());

        List<PropertyImage> savedImages = imageDTOs.stream()
                .map(dto -> {
                    PropertyImage image = dtoToEntity(dto);
                    image.setProperty(property);
                    PropertyImage savedImage = propertyImageRepository.save(image);
                    logger.debug("Saved image: {} with ID: {}", savedImage.getName(), savedImage.getId());
                    return savedImage;
                })
                .collect(Collectors.toList());

        logger.info("Saved {} images for property ID: {}", savedImages.size(), property.getId());
        return savedImages;
    }

    private PropertyImage dtoToEntity(PropertiesImageDTO dto) {
        logger.debug("Converting DTO to entity: {}", dto);
        PropertyImage image = new PropertyImage();
        image.setName(dto.getName());
        image.setBase64(dto.getBase64());
        return image;
    }


    public PropertiesImageDTO entityToDto(PropertyImage image) {
        logger.debug("Converting entity to DTO: {}", image);
        PropertiesImageDTO dto = new PropertiesImageDTO();
        dto.setName(image.getName());
        dto.setBase64(image.getBase64());
        return dto;
    }

}
