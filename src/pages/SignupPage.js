import React from 'react';
import './Auth.css'; // Φόρμα στυλ
import backgroundImage from '../assets/images/clean_car_rental_image.jpg'; // Εικόνα φόντου

const SignupPage = () => {
  return (
    <div className="auth-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="form-container">
        <h2>Εγγραφή</h2>
        <form>
          <div className="form-group">
            <input type="text" id="username" name="username" placeholder="Όνομα Χρήστη" required />
          </div>
          <div className="form-group">
            <input type="email" id="email" name="email" placeholder="Email" required />
          </div>
          <div className="form-group">
            <input type="password" id="password" name="password" placeholder="Κωδικός" required />
          </div>
          <button type="submit">Εγγραφή</button>
        </form>
        <p>Έχετε ήδη λογαριασμό; <a href="/login">Είσοδος</a></p>
      </div>
    </div>
  );
};

export default SignupPage;
