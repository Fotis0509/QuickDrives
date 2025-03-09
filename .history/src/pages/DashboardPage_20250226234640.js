/*
import React, { useEffect, useState } from "react";
import { getUserDashboard } from "../services/api";
import { useNavigate } from "react-router-dom"; // Για ανακατεύθυνση αν δεν υπάρχει token
import "./DashboardPage.css";

const DashboardPage = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchDashboard = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setError("❌ Δεν είστε συνδεδεμένος. Παρακαλώ συνδεθείτε.");
                return navigate("/login"); // ✅ Αν δεν υπάρχει token, μεταφορά στο login
            }

            try {
                const data = await getUserDashboard(token);
                setUser(data);
            } catch (error) {
                setError("Σφάλμα φόρτωσης προφίλ.");
            }
        };

        fetchDashboard();
    }, [navigate]);

    return (
        <div className="dashboard">
            <h2>👤 Προφίλ Χρήστη</h2>
            {error && <p className="error">{error}</p>}
            {user ? (
                <>
                    <p><strong>Όνομα:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Ρόλος:</strong> {user.role}</p>

                    <h3>📅 Οι Κρατήσεις μου</h3>
                    {user.reservations && user.reservations.length > 0 ? (
                        <ul>
                            {user.reservations.map((res) => (
                                <li key={res.id}>
                                    🚗 <strong>Αυτοκίνητο:</strong> {res.car ? `${res.car.brand} ${res.car.model}` : "Άγνωστο"} <br />
                                    📅 <strong>Ημερομηνίες:</strong> {res.start_date} - {res.end_date} <br />
                                    💰 <strong>Τιμή:</strong> €{res.total_price}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Δεν έχετε κάνει ακόμα κρατήσεις.</p>
                    )}
                </>
            ) : (
                <p>Φόρτωση...</p>
            )}
        </div>
    );
};

export default DashboardPage;
*/

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DashboardPage.css";

const DashboardPage = () => {
    const [user, setUser] = useState(null);
    const [reservations, setReservations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const response = await fetch("http://localhost:5000/users/profile", {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!response.ok) throw new Error("Αποτυχία φόρτωσης δεδομένων");

                const data = await response.json();
                setUser(data);

                const reservationsResponse = await fetch("http://localhost:5000/reservations/user", {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (reservationsResponse.ok) {
                    const reservationsData = await reservationsResponse.json();
                    setReservations(reservationsData);
                }
            } catch (error) {
                console.error("Σφάλμα:", error);
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("role");
        navigate("/login");
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-page">
                <h2>👤 Προφίλ Χρήστη</h2>
                {user ? (
                    <div className="user-info">
                        <p><strong>Όνομα:</strong> {user.username}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Ρόλος:</strong> {user.role}</p>

                        <h3>📅 Οι Κρατήσεις μου</h3>
                        {reservations.length > 0 ? (
                            <ul>
                                {reservations.map((res) => (
                                    <li key={res.id}>
                                        <strong>{res.car.brand} {res.car.model}</strong> | {res.start_date} - {res.end_date} | <strong>Σύνολο:</strong> €{res.total_price}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Δεν έχετε κάνει ακόμα κρατήσεις.</p>
                        )}
                    </div>
                ) : (
                    <p>Φόρτωση...</p>
                )}

                <button className="logout-button" onClick={handleLogout}>🚪 Αποσύνδεση</button>
            </div>
        </div>
    );
};

export default DashboardPage;
