import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/api"; // Εισαγωγή της API function
import "./Auth.css";
import backgroundImage from "../assets/images/clean_car_rental_image.jpg";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      const data = await signup(formData);
      setSuccess(true);
      console.log("Ο χρήστης δημιουργήθηκε:", data); // ✅ Προσθήκη console log για έλεγχο
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.message);
    }    
  };

  return (
    <div className="auth-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="form-container">
        <h2>Εγγραφή</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">Η εγγραφή ήταν επιτυχής! Μεταφέρεστε...</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="text" name="username" placeholder="Όνομα Χρήστη" required value={formData.username} onChange={handleChange} />
          </div>
          <div className="form-group">
            <input type="email" name="email" placeholder="Email" required value={formData.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <input type="password" name="password" placeholder="Κωδικός" required value={formData.password} onChange={handleChange} />
          </div>
          <button type="submit">Εγγραφή</button>
        </form>
        <p>Έχετε ήδη λογαριασμό; <a href="/login">Είσοδος</a></p>
      </div>
    </div>
  );
};

export default SignupPage;
