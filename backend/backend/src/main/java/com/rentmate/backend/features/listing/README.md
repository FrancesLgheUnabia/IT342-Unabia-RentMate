# Listing Feature

## Overview
Handles property listings and related browsing functionality.

## Structure
- **controller/**: REST API endpoints for listings
- **entity/**: Listing entity and related models
- **repository/**: Listing data access layer
- **service/**: (Optional) Listing business logic
- **dto/**: Data Transfer Objects for requests/responses

## Key Components
- `TestConnectionController`: Test endpoint for database connectivity

## Future Endpoints
- `GET /api/listings` - Get all listings
- `GET /api/listings/{id}` - Get listing details
- `POST /api/listings` - Create new listing
- `PUT /api/listings/{id}` - Update listing
- `DELETE /api/listings/{id}` - Delete listing

## To Be Implemented
- Property/Listing entity
- Search and filter functionality
- Image upload/storage
