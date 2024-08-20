package com.homefinder.homefinder.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
public class PropertyImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull
    private String name;

    @NotNull
    @Lob
    @Column(columnDefinition = "MEDIUMTEXT")
    private String base64;

    @ManyToOne
    @JoinColumn(name = "property_id")
    private Properties property;

    //getters and setters

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

    public Properties getProperty() {
        return property;
    }

    public void setProperty(Properties property) {
        this.property = property;
    }

    //toString


    @Override
    public String toString() {
        return "PropertyImage{" +
                "id=" + id +
                ", name='" + name + '\'' +

                '}';
    }
}
