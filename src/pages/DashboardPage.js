import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./DashboardPage.css";

const DashboardPage = () => {
    const [user, setUser] = useState(null);
    const [reservations, setReservations] = useState([]);
    const [editingReservation, setEditingReservation] = useState(null);
    const [message, setMessage] = useState(""); // ✅ Μήνυμα επιτυχίας ή σφάλματος
    const navigate = useNavigate();

    const fetchUserData = useCallback(async () => {
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

            const reservationsResponse = await fetch("http://localhost:5000/reservations/my-reservations", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (reservationsResponse.ok) {
                const reservationsData = await reservationsResponse.json();
                setReservations(reservationsData);
            } else {
                throw new Error("Αποτυχία φόρτωσης κρατήσεων");
            }
        } catch (error) {
            console.error("❌ Σφάλμα:", error);
            setMessage("⚠ Σφάλμα κατά τη φόρτωση των δεδομένων.");
        }
    }, [navigate]);

    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("role");
        navigate("/login");
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem("token");

        if (window.confirm("Είστε σίγουρος ότι θέλετε να διαγράψετε αυτή την κράτηση;")) {
            try {
                const response = await fetch(`http://localhost:5000/reservations/${id}`, {
                    method: "DELETE",
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!response.ok) throw new Error("Αποτυχία διαγραφής κράτησης.");

                setReservations(reservations.filter((res) => res.id !== id));
                setMessage("✅ Η κράτηση διαγράφηκε επιτυχώς.");
            } catch (error) {
                console.error("❌ Σφάλμα:", error);
                setMessage("⚠ Αποτυχία διαγραφής κράτησης.");
            }
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        const startDate = new Date(editingReservation.start_date);
        const endDate = new Date(editingReservation.end_date);
        const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

        if (days <= 0) {
            setMessage("⚠ Η ημερομηνία λήξης πρέπει να είναι μετά την ημερομηνία έναρξης.");
            return;
        }

        const pricePerDay = editingReservation.car?.price_per_day || 0;
        const newTotalPrice = days * pricePerDay;

        try {
            const response = await fetch(`http://localhost:5000/reservations/${editingReservation.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    start_date: editingReservation.start_date,
                    end_date: editingReservation.end_date,
                    total_price: newTotalPrice,
                }),
            });

            if (!response.ok) throw new Error("Αποτυχία ενημέρωσης κράτησης.");

            fetchUserData();
            setMessage(`✅ Η κράτηση ενημερώθηκε! Νέο κόστος: €${newTotalPrice}`);
            setEditingReservation(null);
        } catch (error) {
            console.error("❌ Σφάλμα:", error);
            setMessage("⚠ Αποτυχία ενημέρωσης κράτησης.");
        }
    };

    const handleEdit = (reservation) => {
        setEditingReservation(reservation);
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-page">
                <h2>👤 Προφίλ Χρήστη</h2>

                {message && <p className="status-message">{message}</p>}

                {user ? (
                    <div className="user-info">
                        <p><strong>Όνομα:</strong> {user.username}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Ρόλος:</strong> {user.role}</p>

                        <h3>📅 Οι Κρατήσεις μου</h3>
                        {reservations.length > 0 ? (
                            <ul className="reservation-list">
                                {reservations.map((res) => (
                                    <li key={res.id} className="reservation-item">
                                        <img src={res.car?.image_url} alt={res.car?.model} className="reservation-img" />
                                        <div className="reservation-info">
                                            <strong>{res.car?.brand} {res.car?.model}</strong>
                                            <p>📅 <strong>Ημερομηνία ενοικίασης: </strong>{res.start_date} - {res.end_date}</p>
                                            <p>💰 <strong>Σύνολο:</strong> €{res.total_price}</p>

                                            <button className="edit-button" onClick={() => handleEdit(res)}>✏ Ενημέρωση</button>
                                            <button className="delete-button" onClick={() => handleDelete(res.id)}>🗑 Διαγραφή</button>
                                        </div>

                                        {/* ✅ Εμφάνιση φόρμας ακριβώς κάτω από την κράτηση */}
                                        {editingReservation?.id === res.id && (
                                            <div className="edit-form">
                                                <h3>✏ Επεξεργασία Κράτησης</h3>
                                                <form onSubmit={handleUpdate}>
                                                    <label>Ημερομηνία Έναρξης:</label>
                                                    <input 
                                                        type="date" 
                                                        value={editingReservation.start_date} 
                                                        onChange={(e) => setEditingReservation({...editingReservation, start_date: e.target.value})}
                                                    />
                                                    
                                                    <label>Ημερομηνία Λήξης:</label>
                                                    <input 
                                                        type="date" 
                                                        value={editingReservation.end_date} 
                                                        onChange={(e) => setEditingReservation({...editingReservation, end_date: e.target.value})}
                                                    />

                                                    <div className="buttons-container">
                                                        <button type="submit" className="save-button">✅ Αποθήκευση</button>
                                                        <button type="button" className="cancel-button" onClick={() => setEditingReservation(null)}>❌ Ακύρωση</button>
                                                    </div>
                                                </form>
                                            </div>
                                        )}
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
