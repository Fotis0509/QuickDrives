import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CarsPage.css";

const CarsPage = () => {
    const [cars, setCars] = useState([]); // Κρατάει τα αυτοκίνητα από το API
    const navigate = useNavigate();

    // **Φόρτωση δεδομένων από το API**
    useEffect(() => {
        fetch("http://localhost:5000/cars", { cache: "no-store" })
            .then(response => response.json())
            .then(data => setCars(data))
            .catch(error => console.error("Σφάλμα φόρτωσης αυτοκινήτων:", error));
    }, []);    

    const handleRentCar = (car) => {
        console.log("Car sent to RentForm:", car); // 🔹 Εκτύπωση του car πριν την αποστολή
        navigate("/rent", { state: { car } });
    };
    
    return (
        <div className="cars-page">
            <h2>Διαθέσιμα Αυτοκίνητα προς Ενοικίαση</h2>
            <div className="cars-grid">
                {cars.map((car) => (
                    <div className="car-card" key={car.id}>
                        <img src={car.imageUrl} alt={car.name} className="car-image" />
                        <h3>{car.brand} {car.model}</h3>
                        <p>Τιμή: {car.pricePerDay}€ / ημέρα</p>
                        <button className="rent-button" onClick={() => handleRentCar(car)}>
                            Ενοικίαση
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CarsPage;
