package com.example.rentmate

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class SignInActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_sign_in)

        val etEmail = findViewById<EditText>(R.id.etEmail)
        val etPassword = findViewById<EditText>(R.id.etPassword)
        val btnSignIn = findViewById<Button>(R.id.btnSignIn)
        val btnGoToSignUp = findViewById<Button>(R.id.btnGoToSignUp)

        btnGoToSignUp.setOnClickListener {
            val intent = Intent(this, SignUpActivity::class.java)
            startActivity(intent)
        }

        btnSignIn.setOnClickListener {
            val email = etEmail.text.toString().trim()
            val password = etPassword.text.toString().trim()

            if (email.isEmpty() || password.isEmpty()) {
                Toast.makeText(this, "Please fill all fields", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            val request = LoginRequest(email, password)
            ApiClient.instance.login(request).enqueue(object : Callback<LoginResponse> {
                override fun onResponse(call: Call<LoginResponse>, response: Response<LoginResponse>) {
                    if (response.isSuccessful) {
                        Toast.makeText(this@SignInActivity, "Login Successful!", Toast.LENGTH_SHORT).show()
                        // Next step will be navigating to the Main App Dashboard here
                        startActivity(Intent(this@SignInActivity, MainActivity::class.java))
                    } else {
                        var errorMsg = "Invalid credentials"
                        try {
                            val errorString = response.errorBody()?.string()
                            if (errorString != null) {
                                val jsonObject = org.json.JSONObject(errorString)
                                if (jsonObject.has("error") && !jsonObject.isNull("error")) {
                                    errorMsg = jsonObject.getJSONObject("error").getString("message")
                                }
                            }
                        } catch (e: Exception) {
                            // ignore
                        }
                        Toast.makeText(this@SignInActivity, errorMsg, Toast.LENGTH_SHORT).show()
                    }
                }

                override fun onFailure(call: Call<LoginResponse>, t: Throwable) {
                    Toast.makeText(this@SignInActivity, "Error: ${t.message}", Toast.LENGTH_SHORT).show()
                }
            })
        }
    }
}