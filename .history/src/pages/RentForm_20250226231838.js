import React, { useState } from "react";
import { createReservation } from "../services/api";
import "./RentForm.css";

const RentForm = ({ car, onClose }) => {
    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        phone: "",
        mobile: "",
        start_date: "",
        end_date: "",
        message: "",
    });

    const [message, setMessage] = useState("");
    const userId = localStorage.getItem("userId"); // 🔹 Παίρνουμε το ID του χρήστη από το localStorage

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userId) {
            setMessage("❌ Πρέπει να είστε συνδεδεμένος για να κάνετε κράτηση!");
            return;
        }

        if (!formData.start_date || !formData.end_date) {
            setMessage("❌ Παρακαλώ επιλέξτε ημερομηνίες!");
            return;
        }

        const reservationData = {
            user_id: userId, // ✅ Στέλνουμε το user ID στο backend
            car_id: car.id,
            ...formData,
        };

        try {
            const token = localStorage.getItem("token");
            const response = await createReservation(reservationData, token);
            setMessage(`✅ Η κράτηση ολοκληρώθηκε! Κωδικός: ${response.reservation.id}`);

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
                {message && <p className="message">{message}</p>}
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
                    <div className="form-group">
                        <textarea name="message" placeholder="Μήνυμα (προαιρετικό)" onChange={handleChange}></textarea>
                    </div>
                    <button type="submit" className="rent-button">✅ Επιβεβαίωση Κράτησης</button>
                </form>
            </div>
        </div>
    );
};

export default RentForm;
