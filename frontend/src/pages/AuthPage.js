import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const [signupData, setSignupData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [popup, setPopup] = useState({
    show: false,
    title: "",
    message: "",
    type: "success",
  });

  const showPopup = (title, message, type = "success") => {
    setPopup({
      show: true,
      title,
      message,
      type,
    });
  };

  const closePopup = () => {
    setPopup({
      show: false,
      title: "",
      message: "",
      type: "success",
    });
  };

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    if (signupData.password !== signupData.confirmPassword) {
      showPopup("Registration Failed", "Passwords do not match.", "error");
      return;
    }

    if (signupData.password.length < 8) {
      showPopup(
        "Registration Failed",
        "Password must be at least 8 characters.",
        "error"
      );
      return;
    }

    try {
      const payload = {
        firstname: signupData.firstname,
        lastname: signupData.lastname,
        email: signupData.email,
        password: signupData.password,
      };

      const response = await fetch("http://localhost:8081/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        localStorage.setItem("accessToken", result.data.accessToken);
        localStorage.setItem("refreshToken", result.data.refreshToken);
        localStorage.setItem("user", JSON.stringify(result.data.user));

        showPopup(
          "Registration Successful",
          "You have successfully registered and logged in."
        );

        setSignupData({
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        showPopup(
          "Registration Failed",
          result?.error?.message || "Unable to register account.",
          "error"
        );
      }
    } catch (error) {
      showPopup(
        "Server Error",
        "Could not connect to the backend.",
        "error"
      );
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        email: loginData.email,
        password: loginData.password,
      };

      const response = await fetch("http://localhost:8081/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        localStorage.setItem("accessToken", result.data.accessToken);
        localStorage.setItem("refreshToken", result.data.refreshToken);
        localStorage.setItem("user", JSON.stringify(result.data.user));

        showPopup("Login Successful", "You have successfully logged in.");

        setLoginData({
          email: "",
          password: "",
        });
      } else {
        showPopup(
          "Login Failed",
          result?.error?.message || "Invalid login credentials.",
          "error"
        );
      }
    } catch (error) {
      showPopup(
        "Server Error",
        "Could not connect to the backend.",
        "error"
      );
    }
  };

  return (
    <>
      <div className="auth-page">
        <div className="auth-back" onClick={() => navigate("/")}>
          &larr; Back to Home
        </div>
        <div className="auth-card">
          {!isLogin ? (
            <>
              <div className="auth-left">
                <h1 className="auth-title">SIGN UP</h1>
                <p className="auth-subtitle">Get started on RentMate</p>

                <form onSubmit={handleSignupSubmit}>
                  <div className="row two-cols">
                    <div className="form-group">
                      <label>First Name</label>
                      <input
                        type="text"
                        name="firstname"
                        placeholder="First name"
                        value={signupData.firstname}
                        onChange={handleSignupChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Last Name</label>
                      <input
                        type="text"
                        name="lastname"
                        placeholder="Last name"
                        value={signupData.lastname}
                        onChange={handleSignupChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={signupData.email}
                      onChange={handleSignupChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      value={signupData.password}
                      onChange={handleSignupChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm password"
                      value={signupData.confirmPassword}
                      onChange={handleSignupChange}
                      required
                    />
                  </div>

                  <button type="submit" className="primary-btn">
                    CREATE ACCOUNT
                  </button>
                </form>
              </div>

              <div className="auth-right">
                <div className="brand-box">
                  <h2>RentMate</h2>
                  <p>
                    Already have an account? Sign in and continue exploring
                    rentals.
                  </p>
                  <button
                    className="secondary-btn"
                    onClick={() => setIsLogin(true)}
                  >
                    SIGN IN
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="auth-right auth-right-left">
                <div className="brand-box">
                  <h2>RentMate</h2>
                  <p>Create an account and start your rental journey with us.</p>
                  <button
                    className="secondary-btn"
                    onClick={() => setIsLogin(false)}
                  >
                    SIGN UP
                  </button>
                </div>
              </div>

              <div className="auth-left">
                <h1 className="auth-title">SIGN IN</h1>
                <p className="auth-subtitle">Sign in with your account</p>

                <form onSubmit={handleLoginSubmit}>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={loginData.email}
                      onChange={handleLoginChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      value={loginData.password}
                      onChange={handleLoginChange}
                      required
                    />
                  </div>

                  <button type="submit" className="primary-btn">
                    SIGN IN
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>

      {popup.show && (
        <div className="popup-overlay">
          <div className={`popup-box ${popup.type}`}>
            <h3>{popup.title}</h3>
            <p>{popup.message}</p>
            <button onClick={closePopup}>OK</button>
          </div>
        </div>
      )}
    </>
  );
}

export default AuthPage;
