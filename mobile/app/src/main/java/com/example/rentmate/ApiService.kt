package com.example.rentmate

import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.POST

interface ApiService {
    @POST("/api/v1/auth/login")
    fun login(@Body request: LoginRequest): Call<LoginResponse>

    @POST("/api/v1/auth/register")
    fun register(@Body request: RegisterRequest): Call<RegisterResponse>
}