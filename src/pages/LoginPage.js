import React from 'react';
import './Auth.css'; // Φόρμα στυλ
import backgroundImage from '../assets/images/clean_car_rental_image.jpg'; // Εικόνα φόντου

const LoginPage = () => {
  return (
    <div className="auth-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="form-container">
        <h2>Είσοδος</h2>
        <form>
          <div className="form-group">
            <input type="email" id="email" name="email" placeholder="Email" required />
          </div>
          <div className="form-group">
            <input type="password" id="password" name="password" placeholder="Κωδικός" required />
          </div>
          <div className="form-footer">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="/forgot-password">Forget Password?</a>
          </div>
          <button type="submit">Σύνδεση</button>
        </form>
        <p>Δεν έχετε λογαριασμό; <a href="/signup">Εγγραφή</a></p>
      </div>
    </div>
  );
};

export default LoginPage;
