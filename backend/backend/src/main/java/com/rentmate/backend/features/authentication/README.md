# Authentication Feature

## Overview
Handles all authentication-related operations including user registration, login, and JWT token management.

## Structure
- **controller/**: REST API endpoints for authentication
- **entity/**: User entity and related database models
- **repository/**: User data access layer
- **service/**: (Optional) Authentication business logic
- **dto/**: Data Transfer Objects for requests/responses

## Key Components
- `AuthController`: Handles `/api/auth` endpoints for register and login
- `User`: JPA entity representing users in the database
- `UserRepository`: Database queries for user operations

## API Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

## Dependencies
- Spring Data JPA
- Spring Security (BCrypt)
- JWT (io.jsonwebtoken)
