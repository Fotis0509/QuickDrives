import React, { useState, useEffect } from "react";
import { createReservation } from "../services/api";
import { useNavigate } from "react-router-dom"; // ✅ Για ανακατεύθυνση
import "./RentForm.css";

const RentForm = ({ car, onClose }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        phone: "",
        mobile: "",
        start_date: "",
        end_date: "",
        message: "",
    });

    const [totalPrice, setTotalPrice] = useState(0);
    const [message, setMessage] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // 🔹 Έλεγχος αν ο χρήστης είναι συνδεδεμένος
    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    // 🔹 Υπολογισμός συνολικού κόστους όταν αλλάζουν οι ημερομηνίες
    useEffect(() => {
        if (formData.start_date && formData.end_date) {
            const startDate = new Date(formData.start_date);
            const endDate = new Date(formData.end_date);
            const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

            if (days > 0) {
                setTotalPrice(days * car.price_per_day);
            } else {
                setTotalPrice(0);
            }
        }
    }, [formData.start_date, formData.end_date, car.price_per_day]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 🚫 **Έλεγχος αν ο χρήστης ΔΕΝ είναι συνδεδεμένος**
        if (!isLoggedIn) {
            setMessage("❌ Πρέπει να συνδεθείτε για να κάνετε κράτηση!");
            setTimeout(() => navigate("/login"), 2000); // ✅ Ανακατεύθυνση στο Login
            return;
        }

        if (!formData.start_date || !formData.end_date) {
            setMessage("❌ Παρακαλώ επιλέξτε ημερομηνίες!");
            return;
        }

        const reservationData = {
            car_id: car.id,
            full_name: formData.full_name,
            email: formData.email,
            phone: formData.phone,
            mobile: formData.mobile,
            start_date: formData.start_date,
            end_date: formData.end_date,
            message: formData.message,
            total_price: totalPrice, // ✅ Συνολικό κόστος
        };

        try {
            const token = localStorage.getItem("token");
            const response = await createReservation(reservationData, token);
            setMessage(`✅ Η κράτηση ολοκληρώθηκε! Κωδικός: ${response.reservation.id}`);

            // 🔹 Κλείσιμο popup μετά από επιτυχή κράτηση
            setTimeout(() => {
                setMessage("");
                onClose();
            }, 2000);

        } catch (error) {
            setMessage(`❌ Σφάλμα κράτησης: ${error.message}`);
        }
    };

    return (
        <div className="rent-form-popup">
            <div className="rent-form-container">
                <button className="close-button" onClick={onClose}>❌</button>
                <h2>Κράτηση για {car.brand} {car.model}</h2>

                {/* 🚫 Εμφάνιση μηνύματος αν δεν είναι συνδεδεμένος */}
                {!isLoggedIn && <p className="error-message">🔒 Πρέπει να συνδεθείτε για να κάνετε κράτηση!</p>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type="text" name="full_name" placeholder="Ονοματεπώνυμο" onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <input type="text" name="phone" placeholder="Τηλέφωνο (προαιρετικό)" onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <input type="text" name="mobile" placeholder="Κινητό" onChange={handleChange} required />
                    </div>
                    <div className="date-picker">
                        <label>Ημερομηνία Έναρξης</label>
                        <input type="date" name="start_date" onChange={handleChange} required />
                    </div>
                    <div className="date-picker">
                        <label>Ημερομηνία Λήξης</label>
                        <input type="date" name="end_date" onChange={handleChange} required />
                    </div>
                    <div className="total-price">
                        <strong>💰 Συνολικό Κόστος: €{totalPrice}</strong>
                    </div>
                    <div className="form-group">
                        <textarea name="message" placeholder="Μήνυμα (προαιρετικό)" onChange={handleChange}></textarea>
                    </div>
                    <button type="submit" className="rent-button" disabled={!isLoggedIn}>
                        ✅ Επιβεβαίωση Κράτησης
                    </button>
                    {message && <p className="message">{message}</p>}
                </form>
            </div>
        </div>
    );
};

export default RentForm;
