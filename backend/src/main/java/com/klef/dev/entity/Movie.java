package com.klef.dev.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "movies")
public class Movie {
  
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String title;
    private String genre;
    private String year;
    private String status;

    public Movie() {
        // Default constructor
    }

    // Getters and Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getGenre() { return genre; }
    public void setGenre(String genre) { this.genre = genre; }

    public String getYear() { return year; }
    public void setYear(String year) { this.year = year; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
