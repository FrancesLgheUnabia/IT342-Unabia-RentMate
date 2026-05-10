package com.example.rentmate.features.authentication.models

import com.google.gson.annotations.SerializedName

data class LoginRequest(val email: String, val password: String)
data class LoginResponse(val message: String?, val token: String?)

data class RegisterRequest(
    @SerializedName("firstname") val firstName: String,
    @SerializedName("lastname") val surname: String,
    val email: String,
    val password: String
)
data class RegisterResponse(val message: String?)