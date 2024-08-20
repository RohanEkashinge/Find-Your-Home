package com.homefinder.homefinder.service;

import com.homefinder.homefinder.dto.OwnerImageDTO;
import com.homefinder.homefinder.entity.OwnerImage;
import com.homefinder.homefinder.repositories.OwnerImageRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OwnerImageService {

    private static final Logger logger = LoggerFactory.getLogger(OwnerImageService.class);

    private final OwnerImageRepository ownerImageRepository;

    @Autowired
    public OwnerImageService(OwnerImageRepository ownerImageRepository) {
        this.ownerImageRepository = ownerImageRepository;
    }

    public OwnerImage saveOwnerImage(OwnerImageDTO ownerImageDTO) {
        logger.info("Saving owner image with name: {}", ownerImageDTO.getName());

        OwnerImage ownerImage = dtoToEntity(ownerImageDTO);
        OwnerImage savedImage = ownerImageRepository.save(ownerImage);

        logger.info("Saved owner image with ID: {}", savedImage.getId());
        return savedImage;
    }


    private OwnerImage dtoToEntity(OwnerImageDTO dto) {
        logger.debug("Converting OwnerImageDTO to OwnerImage: {}", dto);
        OwnerImage image = new OwnerImage();
        image.setName(dto.getName());
        image.setBase64(dto.getBase64());
        return image;
    }

    public OwnerImageDTO entityToDto(OwnerImage image) {
        logger.debug("Converting OwnerImage to OwnerImageDTO: {} url is to big to show");
        OwnerImageDTO dto = new OwnerImageDTO();
        dto.setName(image.getName());
        dto.setBase64(image.getBase64());
        return dto;
    }
}
