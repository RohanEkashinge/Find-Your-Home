package com.homefinder.homefinder.dto;

import jakarta.validation.constraints.NotNull;

import java.util.List;


public class PropertyDTO {

    private long id;

    @NotNull
    private String property_for;

    @NotNull
    private String property_type;

    @NotNull
    private String location;

    @NotNull
    private double price;

    private boolean negotiable;

    private double property_size;

    private String property_description;

    private String owner_phone;

    private List<PropertiesImageDTO> property_images;

    private OwnerImageDTO owner_image;

    @NotNull
    private String agreement_duration;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public @NotNull String getProperty_for() {
        return property_for;
    }

    public void setProperty_for(@NotNull String property_for) {
        this.property_for = property_for;
    }

    public @NotNull String getProperty_type() {
        return property_type;
    }

    public void setProperty_type(@NotNull String property_type) {
        this.property_type = property_type;
    }

    public @NotNull String getLocation() {
        return location;
    }

    public void setLocation(@NotNull String location) {
        this.location = location;
    }

    @NotNull
    public double getPrice() {
        return price;
    }

    public void setPrice(@NotNull double price) {
        this.price = price;
    }

    public boolean isNegotiable() {
        return negotiable;
    }

    public void setNegotiable(boolean negotiable) {
        this.negotiable = negotiable;
    }

    public double getProperty_size() {
        return property_size;
    }

    public void setProperty_size(double property_size) {
        this.property_size = property_size;
    }

    public String getProperty_description() {
        return property_description;
    }

    public void setProperty_description(String property_description) {
        this.property_description = property_description;
    }

    public String getOwner_phone() {
        return owner_phone;
    }

    public void setOwner_phone(String owner_phone) {
        this.owner_phone = owner_phone;
    }

    public List<PropertiesImageDTO> getProperty_images() {
        return property_images;
    }

    public void setProperty_images(List<PropertiesImageDTO> property_images) {
        this.property_images = property_images;
    }

    public OwnerImageDTO getOwner_image() {
        return owner_image;
    }

    public void setOwner_image(OwnerImageDTO owner_image) {
        this.owner_image = owner_image;
    }

    public @NotNull String getAgreement_duration() {
        return agreement_duration;
    }

    public void setAgreement_duration(@NotNull String agreement_duration) {
        this.agreement_duration = agreement_duration;
    }

    @Override
    public String toString() {
        return "PropertyDTO{" +
                "id=" + id +
                ", property_for='" + property_for + '\'' +
                ", property_type='" + property_type + '\'' +
                ", location='" + location + '\'' +
                ", price=" + price +
                ", negotiable=" + negotiable +
                ", property_size=" + property_size +
                ", property_description='" + property_description + '\'' +
                ", owner_phone='" + owner_phone + '\'' +
                ", property_images=" +
                ", owner_image=" +
                ", agreement_duration='" + agreement_duration + '\'' +
                '}';
    }
}
