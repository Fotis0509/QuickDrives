import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./RentForm.css";

const RentForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const car = location.state?.car;

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
                    <img src={car.image} alt={car.name} />
                    <h3>{car.name}</h3>
                    <ul>
                        <li>Μάρκα: {car.brand}</li>
                        <li>Μοντέλο: {car.model}</li>
                        <li>Κατηγορία: {car.category}</li>
                        <li>Κυβικά: {car.engine}</li>
                        <li>Υπποδύναμη: {car.horsepower}</li>
                        <li>Μέση Κατανάλωση: {car.fuelConsumption}</li>
                        <li>Τύπος Καυσίμου: {car.fuelType}</li>
                        <li>Κόστος Ενοικίασης: {car.price}</li>
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
