package com.rentmate.backend.features.listing.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("/api/test-db")
@CrossOrigin(origins = "http://localhost:3000") // Allow React Frontend to connect
public class TestConnectionController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping
    public ResponseEntity<String> testConnection() {
        try {
            // Execute a simple query to check the database connection
            Integer result = jdbcTemplate.queryForObject("SELECT 1", Integer.class);
            if (result != null && result == 1) {
                return ResponseEntity.ok("Successfully connected to Supabase PostgreSQL Database!");
            } else {
                return ResponseEntity.internalServerError().body("Connected, but unexpected query result.");
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Database connection failed: " + e.getMessage());
        }
    }
}
