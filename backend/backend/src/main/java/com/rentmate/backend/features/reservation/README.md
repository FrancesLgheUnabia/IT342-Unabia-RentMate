# Reservation Feature

## Overview
Manages reservation operations including creating, retrieving, and managing property reservations.

## Structure
- **controller/**: REST API endpoints for reservations
- **entity/**: Reservation entity and related models
- **repository/**: Reservation data access layer
- **service/**: (Optional) Reservation business logic
- **dto/**: Data Transfer Objects for requests/responses

## Key Components
- `ReservationController`: Handles `/api/reservations` endpoints
- `Reservation`: JPA entity representing reservations
- `ReservationRepository`: Database queries for reservation operations

## API Endpoints
- `POST /api/reservations` - Create a new reservation

## Dependencies
- Spring Data JPA
- Lombok (if used)
