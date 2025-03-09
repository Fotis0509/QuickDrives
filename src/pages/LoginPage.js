import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api"; // Εισαγωγή της API function
import "./Auth.css";
import backgroundImage from "../assets/images/clean_car_rental_image.jpg";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await login(formData); // Χρήση της API function
      localStorage.setItem("token", data.token); // Αποθήκευση του JWT token
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("role", data.role);

      navigate("/dashboard"); // Μετάβαση στον πίνακα ελέγχου
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="form-container">
        <h2>Είσοδος</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="email" name="email" placeholder="Email" required value={formData.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <input type="password" name="password" placeholder="Κωδικός" required value={formData.password} onChange={handleChange} />
          </div>
          <button type="submit">Σύνδεση</button>
        </form>
        <p>Δεν έχετε λογαριασμό; <a href="/signup">Εγγραφή</a></p>
      </div>
    </div>
  );
};

export default LoginPage;
