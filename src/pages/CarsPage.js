import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CarsPage.css";

const CarsPage = () => {
    const navigate = useNavigate();
    const [cars, setCars] = useState([]); // Όλα τα αυτοκίνητα
    const [filteredCars, setFilteredCars] = useState([]); // Τα φιλτραρισμένα αυτοκίνητα
    const [filters, setFilters] = useState({
        brand: "",
        category: "",
        fuelType: "",
        pricePerDay: "",
        searchTerm: "", // 🔹 Νέο πεδίο αναζήτησης για το όνομα αυτοκινήτου
    });

    useEffect(() => {
        fetch("http://localhost:5000/cars")
            .then((response) => response.json())
            .then((data) => {
                setCars(data);
                setFilteredCars(data); // Αρχικά εμφανίζουμε όλα τα αυτοκίνητα
            })
            .catch((error) => console.error("Σφάλμα:", error));
    }, []);

    // **🔹 Συνάρτηση αλλαγής φίλτρων**
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    // **🔹 Εκκαθάριση φίλτρων**
    const handleClearFilters = () => {
        setFilters({
            brand: "",
            category: "",
            fuelType: "",
            pricePerDay: "",
            searchTerm: "",
        });
    };

    // **🔹 Εφαρμογή φίλτρων**
    useEffect(() => {
        let filtered = cars;

        if (filters.brand) {
            filtered = filtered.filter((car) => car.brand === filters.brand);
        }
        if (filters.category) {
            filtered = filtered.filter((car) => car.category === filters.category);
        }
        if (filters.fuelType) {
            filtered = filtered.filter((car) => car.fuelType === filters.fuelType);
        }
        if (filters.pricePerDay) {
            filtered = filtered.filter((car) => parseFloat(car.pricePerDay) <= parseFloat(filters.pricePerDay));
        }
        if (filters.searchTerm) {
            filtered = filtered.filter((car) => 
                car.model && car.model.toLowerCase().includes(filters.searchTerm.toLowerCase())
            );
        }

        setFilteredCars(filtered);
    }, [filters, cars]);

    // **🔹 Συνάρτηση που οδηγεί τον χρήστη στη φόρμα κράτησης**
    const handleCarClick = (car) => {
        navigate("/rent", { state: { car } });
    };

    return (
        <div className="cars-page">
            {/* 🔹 Sidebar Φίλτρων */}
            <aside className="filter-sidebar">
                <h3>Φίλτρα</h3>

                <label>Μάρκα:</label>
                <select name="brand" onChange={handleFilterChange} value={filters.brand}>
                    <option value="">Όλες</option>
                    {[...new Set(cars.map(car => car.brand))].map((brand, index) => (
                        <option key={index} value={brand}>{brand}</option>
                    ))}
                </select>

                <label>Κατηγορία:</label>
                <select name="category" onChange={handleFilterChange} value={filters.category}>
                    <option value="">Όλες</option>
                    {[...new Set(cars.map(car => car.category))].map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>

                <label>Τύπος Καυσίμου:</label>
                <select name="fuelType" onChange={handleFilterChange} value={filters.fuelType}>
                    <option value="">Όλοι</option>
                    {[...new Set(cars.map(car => car.fuelType))].map((fuel, index) => (
                        <option key={index} value={fuel}>{fuel}</option>
                    ))}
                </select>

                <label>Μέγιστο Κόστος (€ / ημέρα):</label>
                <input
                    type="number"
                    name="pricePerDay"
                    placeholder="π.χ. 100"
                    value={filters.pricePerDay}
                    onChange={handleFilterChange}
                />

                {/* 🔹 Νέο πεδίο αναζήτησης αυτοκινήτου */}
                <label>Αναζήτηση Αυτοκινήτου:</label>
                <input
                    type="text"
                    name="searchTerm"
                    placeholder="π.χ. Golf"
                    value={filters.searchTerm}
                    onChange={handleFilterChange}
                />

                {/* 🔹 Κουμπί εκκαθάρισης φίλτρων */}
                <button className="clear-filters-button" onClick={handleClearFilters}>Εκκαθάριση Φίλτρων</button>
            </aside>

            {/* 🔹 Λίστα αυτοκινήτων */}
            <div className="cars-list">
                {filteredCars.length > 0 ? (
                    filteredCars.map((car) => (
                        <div key={car.id} className="car-card" onClick={() => handleCarClick(car)}>
                            <img src={car.imageUrl} alt={car.model} onError={(e) => e.target.src = "/default-car.jpg"} />
                            <h3>{car.brand} {car.model}</h3>
                            <p>Κατηγορία: {car.category}</p>
                            <p>Καύσιμο: {car.fuelType}</p>
                            <p>Τιμή: {car.pricePerDay}€ / ημέρα</p>
                        </div>
                    ))
                ) : (
                    <p className="no-results">ΔΕΝ βρέθηκαν αυτοκίνητα με τα επιλεγμένα φίλτρα  :( </p>
                )}
            </div>
        </div>
    );
};

export default CarsPage;
