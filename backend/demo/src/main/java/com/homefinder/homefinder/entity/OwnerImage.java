package com.homefinder.homefinder.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
public class OwnerImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull
    private String name;

    @NotNull
    @Lob
    @Column(columnDefinition = "MEDIUMTEXT")
    private String base64;

    //Getters and setters

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public @NotNull String getName() {
        return name;
    }

    public void setName(@NotNull String name) {
        this.name = name;
    }

    public @NotNull String getBase64() {
        return base64;
    }

    public void setBase64(@NotNull String base64) {
        this.base64 = base64;
    }

    //toString

    @Override
    public String toString() {
        return "OwnerImage{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
