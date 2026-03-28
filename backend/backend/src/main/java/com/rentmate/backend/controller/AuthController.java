package com.rentmate.backend.controller;

import com.rentmate.backend.entity.User;
import com.rentmate.backend.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    private static final String JWT_SECRET =
            "RentMateSecretKeyForJwtGenerationMustBeLongEnough123456789";
    private final SecretKey secretKey =
            Keys.hmacShaKeyFor(JWT_SECRET.getBytes(StandardCharsets.UTF_8));

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> payload) {
        try {
            String firstname = clean(payload.get("firstname"));
            String lastname = clean(payload.get("lastname"));
            String email = clean(payload.get("email")).toLowerCase();
            String password = clean(payload.get("password"));

            if (isBlank(firstname) || isBlank(lastname) || isBlank(email) || isBlank(password)) {
                return buildError(HttpStatus.BAD_REQUEST, "VALID-001", "Firstname, lastname, email, and password are required.");
            }

            if (!isValidEmail(email)) {
                return buildError(HttpStatus.BAD_REQUEST, "VALID-002", "Please enter a valid email address.");
            }

            if (password.length() < 8) {
                return buildError(HttpStatus.BAD_REQUEST, "VALID-003", "Password must be at least 8 characters.");
            }

            if (userRepository.existsByEmail(email)) {
                return buildError(HttpStatus.CONFLICT, "DB-002", "Email already exists.");
            }

            User user = new User();
            user.setFirstname(firstname);
            user.setLastname(lastname);
            user.setEmail(email);
            user.setPasswordHash(passwordEncoder.encode(password));
            user.setRole("RENTER");
            user.setStatus("ACTIVE");

            User savedUser = userRepository.save(user);

            String accessToken = generateToken(savedUser, 1, ChronoUnit.DAYS, "access");
            String refreshToken = generateToken(savedUser, 7, ChronoUnit.DAYS, "refresh");

            Map<String, Object> userData = buildUserData(savedUser);

            Map<String, Object> data = new LinkedHashMap<>();
            data.put("user", userData);
            data.put("accessToken", accessToken);
            data.put("refreshToken", refreshToken);

            return buildSuccess(HttpStatus.CREATED, data);

        } catch (Exception e) {
            return buildError(HttpStatus.INTERNAL_SERVER_ERROR, "SYSTEM-001", "An unexpected error occurred.");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> payload) {
        try {
            String email = clean(payload.get("email")).toLowerCase();
            String password = clean(payload.get("password"));

            if (isBlank(email) || isBlank(password)) {
                return buildError(HttpStatus.BAD_REQUEST, "VALID-001", "Email and password are required.");
            }

            Optional<User> userOptional = userRepository.findByEmail(email);

            if (userOptional.isEmpty()) {
                return buildError(HttpStatus.UNAUTHORIZED, "AUTH-001", "Invalid credentials.");
            }

            User user = userOptional.get();

            if (!passwordEncoder.matches(password, user.getPasswordHash())) {
                return buildError(HttpStatus.UNAUTHORIZED, "AUTH-001", "Invalid credentials.");
            }

            String accessToken = generateToken(user, 1, ChronoUnit.DAYS, "access");
            String refreshToken = generateToken(user, 7, ChronoUnit.DAYS, "refresh");

            Map<String, Object> userData = buildUserData(user);

            Map<String, Object> data = new LinkedHashMap<>();
            data.put("user", userData);
            data.put("accessToken", accessToken);
            data.put("refreshToken", refreshToken);

            return buildSuccess(HttpStatus.OK, data);

        } catch (Exception e) {
            return buildError(HttpStatus.INTERNAL_SERVER_ERROR, "SYSTEM-001", "An unexpected error occurred.");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        Map<String, Object> data = new LinkedHashMap<>();
        data.put("message", "Logout successful.");
        return buildSuccess(HttpStatus.OK, data);
    }

    private Map<String, Object> buildUserData(User user) {
        Map<String, Object> userData = new LinkedHashMap<>();
        userData.put("id", user.getId());
        userData.put("firstname", user.getFirstname());
        userData.put("lastname", user.getLastname());
        userData.put("email", user.getEmail());
        userData.put("role", user.getRole());
        userData.put("status", user.getStatus());
        userData.put("createdAt", user.getCreatedAt());
        userData.put("updatedAt", user.getUpdatedAt());
        return userData;
    }

    private String generateToken(User user, long amount, ChronoUnit unit, String tokenType) {
        Instant now = Instant.now();
        Instant expiry = now.plus(amount, unit);

        return Jwts.builder()
                .setSubject(user.getEmail())
                .claim("userId", user.getId())
                .claim("firstname", user.getFirstname())
                .claim("lastname", user.getLastname())
                .claim("role", user.getRole())
                .claim("type", tokenType)
                .setIssuedAt(Date.from(now))
                .setExpiration(Date.from(expiry))
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();
    }

    private ResponseEntity<Map<String, Object>> buildSuccess(HttpStatus status, Object data) {
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("success", true);
        response.put("data", data);
        response.put("error", null);
        response.put("timestamp", LocalDateTime.now());
        return ResponseEntity.status(status).body(response);
    }

    private ResponseEntity<Map<String, Object>> buildError(HttpStatus status, String code, String message) {
        Map<String, Object> error = new LinkedHashMap<>();
        error.put("code", code);
        error.put("message", message);

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("success", false);
        response.put("data", null);
        response.put("error", error);
        response.put("timestamp", LocalDateTime.now());

        return ResponseEntity.status(status).body(response);
    }

    private boolean isBlank(String value) {
        return value == null || value.trim().isEmpty();
    }

    private String clean(String value) {
        return value == null ? "" : value.trim();
    }

    private boolean isValidEmail(String email) {
        return email.matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$");
    }
}