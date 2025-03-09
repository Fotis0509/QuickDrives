import React, { useState, useEffect } from "react";
import { fetchUserReservations } from "../services/api";
import "./DashboardPage.css";

const DashboardPage = () => {
    const [user, setUser] = useState({});
    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            setError("❌ Πρέπει να συνδεθείτε για να δείτε τις κρατήσεις σας.");
            setLoading(false);
            return;
        }

        setUser({
            name: localStorage.getItem("userName"),
            email: localStorage.getItem("userEmail"),
            role: localStorage.getItem("role"),
        });

        fetchUserReservations(token)
            .then((data) => {
                setReservations(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return (
        <div className="dashboard">
            <h2>👤 Προφίλ Χρήστη</h2>
            <p><strong>Όνομα:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Ρόλος:</strong> {user.role}</p>

            <h3>📅 Οι Κρατήσεις μου</h3>

            {loading ? (
                <p>Φόρτωση...</p>
            ) : error ? (
                <p className="error">{error}</p>
            ) : reservations.length > 0 ? (
                <ul className="reservation-list">
                    {reservations.map((res, index) => (
                        <li key={index} className="reservation-item">
                            <img src={res.Car.image_url} alt={res.Car.model} className="car-image"/>
                            <div className="reservation-details">
                                <p><strong>{res.Car.brand} {res.Car.model}</strong></p>
                                <p>📅 Από: {res.start_date} ➡️ Μέχρι: {res.end_date}</p>
                                <p>💰 Συνολικό Κόστος: €{res.total_price}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Δεν έχετε κάνει ακόμα κρατήσεις.</p>
            )}
        </div>
    );
};

export default DashboardPage;
