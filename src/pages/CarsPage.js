import React, { useEffect, useState } from "react";
import { getCars } from "../services/api";
import RentForm from "../pages/RentForm";
import "./CarsPage.css";

const CarsPage = () => {
    const [cars, setCars] = useState([]); // 🔹 Αρχικά δεδομένα
    const [filteredCars, setFilteredCars] = useState([]); // 🔹 Φιλτραρισμένα δεδομένα
    const [selectedCar, setSelectedCar] = useState(null);
    const [filters, setFilters] = useState({
        brand: "",
        category: "",
        fuelType: "",
        pricePerDay: "",
        searchTerm: "",
    });

    // 🔹 Ανάκτηση αυτοκινήτων από το API
    useEffect(() => {
        const fetchCars = async () => {
            try {
                const data = await getCars();
                setCars(data);
                setFilteredCars(data);
            } catch (error) {
                console.error("Σφάλμα φόρτωσης αυτοκινήτων:", error);
            }
        };
        fetchCars();
    }, []);

    // 🔹 Λειτουργία Φίλτρων
    useEffect(() => {
        let filtered = cars;

        if (filters.brand) {
            filtered = filtered.filter(car => car.brand.toLowerCase().includes(filters.brand.toLowerCase()));
        }
        if (filters.category) {
            filtered = filtered.filter(car => car.category.toLowerCase().includes(filters.category.toLowerCase()));
        }
        if (filters.fuelType) {
            filtered = filtered.filter(car => car.fuel_type.toLowerCase().includes(filters.fuelType.toLowerCase()));
        }
        if (filters.pricePerDay) {
            filtered = filtered.filter(car => parseFloat(car.price_per_day) <= parseFloat(filters.pricePerDay));
        }
        if (filters.searchTerm) {
            filtered = filtered.filter(car =>
                car.model.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                car.brand.toLowerCase().includes(filters.searchTerm.toLowerCase())
            );
        }

        setFilteredCars(filtered);
    }, [filters, cars]);

    const handleClearFilters = () => {
        setFilters({
            brand: "",
            category: "",
            fuelType: "",
            pricePerDay: "",
            searchTerm: "",
        });
        setFilteredCars(cars);
    };

    return (
        <div className="cars-page">
            <h2>🚗 Διαθέσιμα Αυτοκίνητα</h2>

            {/* 🔹 Φίλτρα */}
            <div className="filters-container">
                <input
                    type="text"
                    placeholder="🔍 Αναζήτηση..."
                    value={filters.searchTerm}
                    onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
                />

                <select onChange={(e) => setFilters({ ...filters, brand: e.target.value })} value={filters.brand}>
                    <option value="">🚘 Μάρκα</option>
                    {[...new Set(cars.map(car => car.brand))].map((brand, index) => (
                        <option key={index} value={brand}>{brand}</option>
                    ))}
                </select>

                <select onChange={(e) => setFilters({ ...filters, category: e.target.value })} value={filters.category}>
                    <option value="">📦 Κατηγορία</option>
                    {[...new Set(cars.map(car => car.category))].map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>

                <select onChange={(e) => setFilters({ ...filters, fuelType: e.target.value })} value={filters.fuelType}>
                    <option value="">⛽ Καύσιμο</option>
                    {[...new Set(cars.map(car => car.fuel_type))].map((fuel, index) => (
                        <option key={index} value={fuel}>{fuel}</option>
                    ))}
                </select>

                <input
                    type="number"
                    placeholder="💰 Μέγιστη Τιμή (€)"
                    value={filters.pricePerDay}
                    onChange={(e) => setFilters({ ...filters, pricePerDay: e.target.value })}
                />

                <button className="clear-filters" onClick={handleClearFilters}>❌ Καθαρισμός</button>
            </div>

            {/* 🔹 Λίστα Αυτοκινήτων */}
            <div className="car-list">
                {filteredCars.length > 0 ? (
                    filteredCars.map((car, index) => (
                        <div key={index} className="car-card">
                            <img src={car.image_url} alt={car.model} />
                            <div className="car-info">
                                <h3>{car.brand} {car.model}</h3>
                                <p>Κατηγορία: {car.category}</p>
                                <p>Καύσιμο: {car.fuel_type}</p>
                                <p className="price">💶 {car.price_per_day}€ / ημέρα</p>
                                <button className="rent-button" onClick={() => setSelectedCar(car)}>🚗 Ενοικίαση</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-results">🚗 Δεν βρέθηκαν αυτοκίνητα.</p>
                )}
            </div>

            {/* 🔹 Εμφάνιση φόρμας κράτησης */}
            {selectedCar && (
                <RentForm car={selectedCar} onClose={() => setSelectedCar(null)} />
            )}
        </div>
    );
};

export default CarsPage;
