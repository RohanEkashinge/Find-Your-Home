package com.homefinder.homefinder.dto;


public class PropertiesImageDTO {

    private String name;
    private String base64;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBase64() {
        return base64;
    }

    public void setBase64(String base64) {
        this.base64 = base64;
    }

    @Override
    public String toString() {
        return "PropertiesImageDTO{" +
                "name='" + name + '\'' +
                ", base64='" + '\'' +
                '}';
    }
}
