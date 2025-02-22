/*
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./RentForm.css";

const RentForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const car = location.state?.car;

    console.log("Car Data:", car); // 🔹 Εμφάνιση των δεδομένων του αυτοκινήτου στο console

    if (!car) {
        return <div>Το αυτοκίνητο δεν βρέθηκε.</div>;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Η φόρμα ενοικίασης υποβλήθηκε!");
        navigate("/cars");
    };

    const handleBackToCars = () => {
        navigate("/cars");
    };

    return (
        <div className="rent-form-page">
            <h1 className="rent-title">Ενοικιαζόμενο Αυτοκίνητο</h1>
            <div className="rent-container">
                <div className="car-details-box">
                <img src={car.imageUrl} alt={car.name} />
                    <h3>{car.name}</h3>
                    <ul>
                        <li>Μάρκα: {car.brand}</li>
                        <li>Μοντέλο: {car.model}</li>
                        <li>Κατηγορία: {car.category}</li>
                        <li>Κυβικά: {car.engine}</li>
                        <li>Υπποδύναμη: {car.horsepower}</li>
                        <li>Μέση Κατανάλωση: {car.fuelConsumption}</li>  
                        <li>Τύπος Καυσίμου: {car.fuelType}</li>  
                        <li>Κόστος Ενοικίασης: {car.pricePerDay} €</li> 
                    </ul>
                    <p>{car.summary}</p>
                </div>
                <div className="form-box">
                    <form className="rent-form" onSubmit={handleSubmit}>
                        <h3>Συμπληρώστε τα στοιχεία σας</h3>
                        <input type="text" name="name" placeholder="Ονοματεπώνυμο" required />
                        <input type="email" name="email" placeholder="Διεύθυνση Email" required />
                        <input type="tel" name="phone" placeholder="Τηλέφωνο (προαιρετικό)" pattern="[0-9]{10}" />
                        <input type="tel" name="mobile" placeholder="Κινητό" pattern="[0-9]{10}" required />
                        <input type="date"name="start-date" id="start-date"required placeholder="Ημερομηνία Έναρξης" />
                        <input type="date" name="end-date" id="end-date" required placeholder="Ημερομηνία Λήξης" />
                        <textarea name="message" rows="4" placeholder="Μήνυμα (προαιρετικό)"></textarea>
                        <button type="submit">Υποβολή</button>
                    </form>
                </div>
            </div>

            <div className="back-button-container">
                <button className="back-button" onClick={handleBackToCars}>
                    Επιστροφή στη Λίστα Αυτοκινήτων
                </button>
            </div>
        </div>
    );
};

export default RentForm;
*/

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./RentForm.css";

const RentForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const car = location.state?.car;

    // **Κατάσταση για ημερομηνίες και συνολικό κόστος** (Τοποθετήθηκε στην κορυφή)
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [totalCost, setTotalCost] = useState(0);

    if (!car) {
        return <div>Το αυτοκίνητο δεν βρέθηκε.</div>;
    }

    console.log("Car Data:", car); // 🔹 Εμφάνιση των δεδομένων του αυτοκινήτου στο console

    // **Συνάρτηση υπολογισμού κόστους**
    const calculateTotalCost = (start, end) => {
        if (!start || !end) return;
        
        const start_date = new Date(start);
        const end_date = new Date(end);
        const days = Math.ceil((end_date - start_date) / (1000 * 60 * 60 * 24)); // Υπολογισμός ημερών
        const total = days * parseFloat(car.pricePerDay); // Υπολογισμός συνολικού κόστους
        setTotalCost(total > 0 ? total : 0);
    };

    // **Υποβολή φόρμας**
    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Η φόρμα ενοικίασης υποβλήθηκε! Συνολικό κόστος: ${totalCost.toFixed(2)} €`);
        navigate("/cars");
    };

    const handleBackToCars = () => {
        navigate("/cars");
    };

    return (
        <div className="rent-form-page">
            <h1 className="rent-title">Ενοικιαζόμενο Αυτοκίνητο</h1>
            <div className="rent-container">
                <div className="car-details-box">
                    {/* 🔹 Ενημερωμένη διαδρομή εικόνας ώστε να εμφανίζεται σωστά */}
                    <img src={car.imageUrl || car.image_url} alt={car.name} />
                    <h3>{car.name}</h3>
                    <ul>
                        <li>Μάρκα: {car.brand}</li>
                        <li>Μοντέλο: {car.model}</li>
                        <li>Κατηγορία: {car.category}</li>
                        <li>Κυβικά: {car.engine}</li>
                        <li>Υπποδύναμη: {car.horsepower} hp</li>
                        <li>Μέση Κατανάλωση: {car.fuelConsumption}</li>
                        <li>Τύπος Καυσίμου: {car.fuelType}</li>
                        <li>Κόστος Ενοικίασης: {car.pricePerDay} € / ημέρα</li>
                    </ul>
                    <p>{car.summary}</p>
                </div>
                <div className="form-box">
                    <form className="rent-form" onSubmit={handleSubmit}>
                        <h3>Συμπληρώστε τα στοιχεία σας</h3>
                        <input type="text" name="name" placeholder="Ονοματεπώνυμο" required />
                        <input type="email" name="email" placeholder="Διεύθυνση Email" required />
                        <input type="tel" name="phone" placeholder="Τηλέφωνο (προαιρετικό)" pattern="[0-9]{10}" />
                        <input type="tel" name="mobile" placeholder="Κινητό" pattern="[0-9]{10}" required />

                        {/* Ημερομηνίες */}
                        <input 
                            type="date" 
                            name="start-date" 
                            id="start-date" 
                            value={startDate}
                            onChange={(e) => {
                                setStartDate(e.target.value);
                                calculateTotalCost(e.target.value, endDate);
                            }}
                            required 
                        />
                        <input 
                            type="date" 
                            name="end-date" 
                            id="end-date" 
                            value={endDate}
                            onChange={(e) => {
                                setEndDate(e.target.value);
                                calculateTotalCost(startDate, e.target.value);
                            }}
                            required 
                        />

                        <textarea name="message" rows="4" placeholder="Μήνυμα (προαιρετικό)"></textarea>

                        {/* **Εμφάνιση Συνολικού Κόστους** */}
                        <h3>Συνολικό Κόστος: {totalCost.toFixed(2)} €</h3>

                        <button type="submit">Υποβολή</button>
                    </form>
                </div>
            </div>

            {/* Κουμπί για επιστροφή */}
            <div className="back-button-container">
                <button className="back-button" onClick={handleBackToCars}>
                    Επιστροφή στη Λίστα Αυτοκινήτων
                </button>
            </div>
        </div>
    );
};

export default RentForm;
