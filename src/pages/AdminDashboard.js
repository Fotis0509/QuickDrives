import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
    const [admin, setAdmin] = useState(null);
    const [reservations, setReservations] = useState([]);
    const [messages, setMessages] = useState([]); // 🔹 Νέα κατάσταση για μηνύματα
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({});
    const [message, setMessage] = useState("");
    const [activeTab, setActiveTab] = useState("reservations"); // 🔹 Ενεργό tab
    const navigate = useNavigate();

    // 🔹 Φόρτωση δεδομένων Admin, Κρατήσεων και Μηνυμάτων
    const fetchData = useCallback(async () => {
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
            setAdmin(data);

            const reservationsResponse = await fetch("http://localhost:5000/reservations/admin-reservations", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!reservationsResponse.ok) throw new Error("Αποτυχία φόρτωσης κρατήσεων");

            let reservationsData = await reservationsResponse.json();

            // ✅ Υπολογισμός συνολικού κόστους ενοικίασης κατά τη φόρτωση
            reservationsData = reservationsData.map(res => {
                const startDate = new Date(res.start_date);
                const endDate = new Date(res.end_date);
                const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
                const totalPrice = days * parseFloat(res.car?.price_per_day || 0);

                return { ...res, total_price: totalPrice.toFixed(2) };
            });

            setReservations(reservationsData);

            // 🔹 Φόρτωση μηνυμάτων από τη βάση δεδομένων
            const messagesResponse = await fetch("http://localhost:5000/contact", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!messagesResponse.ok) throw new Error("Αποτυχία φόρτωσης μηνυμάτων");

            const messagesData = await messagesResponse.json();
            setMessages(messagesData);
        } catch (error) {
            console.error("❌ Σφάλμα:", error);
            setMessage("⚠ Σφάλμα κατά τη φόρτωση των δεδομένων.");
        }
    }, [navigate]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

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

    const handleEdit = (reservation) => {
        setEditingId(reservation.id);
        setEditData({
            start_date: reservation.start_date,
            end_date: reservation.end_date,
            car_price_per_day: reservation.car?.price_per_day,
            total_price: reservation.total_price
        });
    };

    const handleInputChange = (e, field) => {
        const value = e.target.value;
        setEditData(prev => {
            const updatedData = { ...prev, [field]: value };
    
            if (field === "start_date" || field === "end_date") {
                const startDate = new Date(updatedData.start_date);
                const endDate = new Date(updatedData.end_date);
                
                if (startDate && endDate && startDate < endDate) {
                    const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    
                    // ✅ Εύρεση της σωστής κράτησης για να υπολογίσουμε τη σωστή τιμή
                    const selectedReservation = reservations.find(res => res.id === editingId);
                    const carPricePerDay = selectedReservation?.car?.price_per_day || 0;
    
                    updatedData.total_price = (days * carPricePerDay).toFixed(2);
    
                    // ✅ Ενημερώνουμε μόνο τη συγκεκριμένη κράτηση στο UI
                    setReservations(prevReservations =>
                        prevReservations.map(res =>
                            res.id === editingId
                                ? { ...res, total_price: (days * carPricePerDay).toFixed(2) }
                                : res
                        )
                    );
                }
            }
            return updatedData;
        });
    };

    const handleSave = async () => {
        if (!editingId) return;
    
        const token = localStorage.getItem("token");
    
        try {
            const response = await fetch(`http://localhost:5000/reservations/${editingId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    start_date: editData.start_date,
                    end_date: editData.end_date,
                    total_price: editData.total_price,
                }),
            });
    
            if (!response.ok) throw new Error("Αποτυχία ενημέρωσης κράτησης.");
    
            // ✅ Ενημερώνουμε ΜΟΝΟ τη συγκεκριμένη κράτηση τοπικά
            setReservations(prevReservations =>
                prevReservations.map(res =>
                    res.id === editingId
                        ? { ...res, start_date: editData.start_date, end_date: editData.end_date, total_price: editData.total_price }
                        : res
                )
            );
    
            setEditingId(null);
            setMessage("✅ Η κράτηση ενημερώθηκε!");
        } catch (error) {
            console.error("❌ Σφάλμα:", error);
            setMessage("⚠ Αποτυχία ενημέρωσης κράτησης.");
        }
    };
    

    return (
        <div className="admin-container">
            <h2>🔧 Πίνακας Διαχείρισης</h2>

            {admin && (
                <div className="admin-info">
                    <p><strong>Όνομα:</strong> {admin.username}</p>
                    <p><strong>Email:</strong> {admin.email}</p>
                    <p><strong>Ρόλος:</strong> {admin.role}</p>
                </div>
            )}

            <div className="admin-menu">
                <button className={activeTab === "reservations" ? "active" : ""} onClick={() => setActiveTab("reservations")}>📅 Κρατήσεις</button>
                <button className={activeTab === "messages" ? "active" : ""} onClick={() => setActiveTab("messages")}>✉️ Μηνύματα</button>
            </div>

            {message && <p className="status-message">{message}</p>}

            {activeTab === "reservations" && (
                <table className="admin-table">
                    <thead>
                         <tr>
                            <th>Εικόνα</th>
                            <th>Αυτοκίνητο</th>
                            <th>Χρήστης</th>
                            <th>Email</th>
                            <th>Κινητό</th>
                            <th>Τηλέφωνο</th>  {/* ✅ Νέα στήλη */}
                            <th>Ημερομηνίες</th>
                            <th>Μήνυμα</th>    {/* ✅ Νέα στήλη */}
                            <th>Σύνολο (€)</th>
                            <th>Ενέργειες</th>
                        </tr>
                    </thead>

                    <tbody>
                        {reservations.map((res) => (
                            <tr key={res.id}>
                                <td><img src={res.car?.image_url} alt={res.car?.model} className="car-image" /></td>
                                <td>{res.car?.brand} {res.car?.model}</td>
                                <td>{res.full_name}</td>
                                <td>{res.user?.email}</td>
                                <td>{res.mobile || "—"}</td>
                                <td>{res.phone || "—"}</td>  {/* ✅ Εμφάνιση τηλεφώνου (αν υπάρχει) */}
                                <td>
                                    {editingId === res.id ? (
                                        <>
                                            <input type="date" value={editData.start_date} onChange={(e) => handleInputChange(e, "start_date")} />
                                            -
                                            <input type="date" value={editData.end_date} onChange={(e) => handleInputChange(e, "end_date")} />
                                        </>
                                    ) : `${res.start_date} - ${res.end_date}`}
                                </td>
                                <td>{res.message || "—"}</td> {/* ✅ Εμφάνιση μηνύματος (αν υπάρχει) */}
                                <td>{editData.total_price || res.total_price} €</td>
                                <td>
                                    {editingId === res.id ? (
                                        <>
                                            <button className="save-button" onClick={handleSave}>✔ Αποθήκευση</button>
                                            <button className="cancel-button" onClick={() => setEditingId(null)}>❌ Ακύρωση</button>
                                        </>
                                    ) : (
                                        <>
                                            <button className="edit-button" onClick={() => handleEdit(res)}>✏ Ενημέρωση</button>
                                            <button className="delete-button" onClick={() => handleDelete(res.id)}>🗑 Διαγραφή</button>
                                        </>
                                    )}
                                </td>
                             </tr>
                        ))}
                </tbody>

                </table>
            )}

            {activeTab === "messages" && (
            <table className="admin-table">
            <thead>
                <tr>
                    <th>Ονοματεπώνυμο</th>
                    <th>Email</th>
                    <th>Τηλέφωνο</th>
                    <th>Κινητό</th>
                    <th>Μήνυμα</th>
                    <th>Ημερομηνία</th>
                </tr>
            </thead>
            <tbody>
            {messages.length > 0 ? (
                messages.map((msg) => (
                    <tr key={msg.id}>
                        <td>{msg.full_name}</td>
                        <td>{msg.email}</td>
                        <td>{msg.phone || "—"}</td>
                        <td>{msg.mobile}</td>
                        <td>{msg.message}</td>
                        <td>{new Date(msg.createdAt).toLocaleDateString()}</td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan="6">Δεν υπάρχουν μηνύματα.</td>
                </tr>
            )}
        </tbody>
    </table>
)}


            <button className="logout-button" onClick={handleLogout}>🚪 Αποσύνδεση</button>
        </div>
    );
};

export default AdminDashboard;
