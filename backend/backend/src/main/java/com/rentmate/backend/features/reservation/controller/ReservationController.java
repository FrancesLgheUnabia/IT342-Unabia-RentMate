package com.rentmate.backend.features.reservation.controller;

import com.rentmate.backend.features.reservation.entity.Reservation;
import com.rentmate.backend.features.reservation.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/reservations")
@CrossOrigin(origins = "http://localhost:3000")
public class ReservationController {

    @Autowired
    private ReservationRepository reservationRepository;

    @PostMapping
    public ResponseEntity<?> createReservation(@RequestBody Reservation reservation) {
        try {
            Reservation savedReservation = reservationRepository.save(reservation);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", savedReservation);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", "Could not create reservation: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}
