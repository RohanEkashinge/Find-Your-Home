package com.homefinder.homefinder.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.util.List;

@Entity
public class Properties {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull
    private String propertyFor;

    @NotNull
    private String propertyType;

    @NotNull
    private String location;

    @NotNull
    private double price;

    private boolean negotiable;

    private double propertySize;

    private String propertyDescription;

    private String owner_phone;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User owner;

    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PropertyImage> propertyImages;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "owner_image_id")
    private OwnerImage ownerImage;

    @NotNull
    private String agreementDuration;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public @NotNull String getPropertyFor() {
        return propertyFor;
    }

    public void setPropertyFor(@NotNull String propertyFor) {
        this.propertyFor = propertyFor;
    }

    public @NotNull String getPropertyType() {
        return propertyType;
    }

    public void setPropertyType(@NotNull String propertyType) {
        this.propertyType = propertyType;
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

    public double getPropertySize() {
        return propertySize;
    }

    public void setPropertySize(double propertySize) {
        this.propertySize = propertySize;
    }

    public String getPropertyDescription() {
        return propertyDescription;
    }

    public void setPropertyDescription(String propertyDescription) {
        this.propertyDescription = propertyDescription;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public List<PropertyImage> getPropertyImages() {
        return propertyImages;
    }

    public void setPropertyImages(List<PropertyImage> propertyImages) {
        this.propertyImages = propertyImages;
    }

    public OwnerImage getOwnerImage() {
        return ownerImage;
    }

    public void setOwnerImage(OwnerImage ownerImage) {
        this.ownerImage = ownerImage;
    }

    public @NotNull String getAgreementDuration() {
        return agreementDuration;
    }

    public void setAgreementDuration(@NotNull String agreementDuration) {
        this.agreementDuration = agreementDuration;
    }

    public String getOwner_phone() {
        return owner_phone;
    }

    public void setOwner_phone(String owner_phone) {
        this.owner_phone = owner_phone;
    }


    @Override
    public String toString() {
        return "Properties{" +
                "id=" + id +
                ", propertyFor='" + propertyFor + '\'' +
                ", propertyType='" + propertyType + '\'' +
                ", location='" + location + '\'' +
                ", price=" + price +
                ", negotiable=" + negotiable +
                ", propertySize=" + propertySize +
                ", propertyDescription='" + propertyDescription + '\'' +
                ", owner_phone='" + owner_phone + '\'' +
                ", owner=" + owner +
                ", ownerImage=" + ownerImage +
                ", agreementDuration='" + agreementDuration + '\'' +
                '}';
    }
}
