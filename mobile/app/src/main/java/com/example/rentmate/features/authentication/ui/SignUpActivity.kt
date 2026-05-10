package com.example.rentmate.features.authentication.ui

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.rentmate.features.authentication.models.RegisterRequest
import com.example.rentmate.shared.data.ApiClient
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class SignUpActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_sign_up)

        val etFirstName = findViewById<EditText>(R.id.etFirstName)
        val etSurname = findViewById<EditText>(R.id.etSurname)
        val etEmail = findViewById<EditText>(R.id.etSignUpEmail)
        val etPassword = findViewById<EditText>(R.id.etSignUpPassword)
        val btnSubmitSignUp = findViewById<Button>(R.id.btnSubmitSignUp)
        val btnGoToSignIn = findViewById<Button>(R.id.btnGoToSignIn)

        btnGoToSignIn.setOnClickListener {
            val intent = Intent(this, SignInActivity::class.java)
            startActivity(intent)
            finish()
        }

        btnSubmitSignUp.setOnClickListener {
            val firstName = etFirstName.text.toString().trim()
            val surname = etSurname.text.toString().trim()
            val email = etEmail.text.toString().trim()
            val password = etPassword.text.toString().trim()

            if (firstName.isEmpty() || surname.isEmpty() || email.isEmpty() || password.isEmpty()) {
                Toast.makeText(this, "Please fill all fields", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            val request = RegisterRequest(firstName, surname, email, password)
            ApiClient.instance.register(request).enqueue(object : Callback<RegisterResponse> {
                override fun onResponse(call: Call<RegisterResponse>, response: Response<RegisterResponse>) {
                    if (response.isSuccessful) {
                        Toast.makeText(this@SignUpActivity, "Registration Successful!", Toast.LENGTH_SHORT).show()
                        startActivity(Intent(this@SignUpActivity, SignInActivity::class.java))
                        finish()
                    } else {
                        var errorMsg = "Registration failed"
                        try {
                            val errorString = response.errorBody()?.string()
                            if (errorString != null) {
                                val jsonObject = org.json.JSONObject(errorString)
                                if (jsonObject.has("error") && !jsonObject.isNull("error")) {
                                    errorMsg = jsonObject.getJSONObject("error").getString("message")
                                }
                            }
                        } catch (e: Exception) {
                            // ignore and use default message
                        }
                        Toast.makeText(this@SignUpActivity, errorMsg, Toast.LENGTH_SHORT).show()
                    }
                }

                override fun onFailure(call: Call<RegisterResponse>, t: Throwable) {
                    Toast.makeText(this@SignUpActivity, "Error: ${t.message}", Toast.LENGTH_SHORT).show()
                }
            })
        }
    }
}