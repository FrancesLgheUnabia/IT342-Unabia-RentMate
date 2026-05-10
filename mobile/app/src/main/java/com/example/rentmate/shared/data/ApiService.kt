package com.example.rentmate.shared.data

import com.example.rentmate.features.authentication.models.LoginRequest
import com.example.rentmate.features.authentication.models.LoginResponse
import com.example.rentmate.features.authentication.models.RegisterRequest
import com.example.rentmate.features.authentication.models.RegisterResponse
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.POST

interface ApiService {
    @POST("/api/auth/login")
    fun login(@Body request: LoginRequest): Call<LoginResponse>

    @POST("/api/auth/register")
    fun register(@Body request: RegisterRequest): Call<RegisterResponse>
}