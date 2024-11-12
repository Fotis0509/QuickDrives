// src/components/CarList.js
import React from "react";

const CarList = () => {
  const cars = [
    { id: 1, name: "Toyota Corolla", price: 30 },
    { id: 2, name: "Ford Focus", price: 35 },
    { id: 3, name: "BMW 3 Series", price: 50 },
  ];

  // Συνάρτηση που εκτελείται όταν ο χρήστης πατήσει "Rent Now"
  const handleRentClick = (carName) => {
    alert(`You selected to rent the ${carName}!`);
  };

  if (!cars || !Array.isArray(cars)) {
    return <p>No cars available at the moment.</p>;
  }

  return (
    <div className="car-list">
      {cars.map((car) => (
        <div key={car.id} className="car-item">
          <h3>{car.name}</h3>
          <p>Price per day: ${car.price}</p>
          <button onClick={() => handleRentClick(car.name)}>Rent Now</button>
        </div>
      ))}
    </div>
  );
};

export default CarList;
