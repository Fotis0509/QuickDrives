import React from "react";
import { useNavigate } from "react-router-dom";
import "./CarsPage.css";

import RenaultClio from "../assets/images/Renault-Clio.jpg";
import VolkswagenPolo from "../assets/images/Volkswagen-Polo.jpg";
import FordFiesta from "../assets/images/Ford-Fiesta.jpg";

import RenaultMegane from "../assets/images/Renault-Megane.jpg";
import VolkswagenGolf from "../assets/images/Volkswagen-Golf.jpg";
import ToyotaCorolla from "../assets/images/Toyota-Corolla.jpg";

import AlfaRomeoGiullia from "../assets/images/Alfa-Romeo-Giullia.jpg";
import MercedesBenzEClass from "../assets/images/Mercedes-Benz-E-Class.jpg";
import BMW3Series from "../assets/images/BMW-3-Series.jpg";

import VolvoXC40 from "../assets/images/Volvo-XC40.jpg";
import SuzukiVitara from "../assets/images/Suzuki-Vitara.jpg";
import AudiQ5 from "../assets/images/Audi-Q5.jpg";

import RenaultScenic from "../assets/images/Renault-Scenic.jpg";
import Peugeot5008 from "../assets/images/Peugeot-5008.jpg";

import MercedesBenzV250 from "../assets/images/Mercedes-Benz-V-250.jpg";
import CitroenBerlingo from "../assets/images/Citroen-Berlingo.jpg";

import Fiat500e from "../assets/images/Fiat-500e.jpg";
import FordMustangMachE from "../assets/images/Ford-Mustang-Mach-E.jpg";

const cars = [
    {
        id: 1001,
        name: "Renault Clio",
        brand: "Renault",
        model: "Clio",
        category: "Mini / Supermini",
        engine: "1.2L",
        horsepower: "110hp",
        fuelConsumption: "5.8L/100km",
        fuelType: "Petrol",
        price: "50€ / ημέρα",
        summary: "Ένα πρακτικό και οικονομικό αυτοκίνητο, ιδανικό για καθημερινές διαδρομές.",
        image: RenaultClio,
    },
    {
        id: 1002,
        name: "Volkswagen Polo",
        brand: "Volkswagen",
        model: "Polo",
        category: "Mini / Supermini",
        engine: "1.0L",
        horsepower: "100hp",
        fuelConsumption: "5.5L/100km",
        fuelType: "Petrol",
        price: "80€ / ημέρα",
        summary: "Ιδανικό για όσους θέλουν άνεση και στυλ στις καθημερινές τους μετακινήσεις.",
        image: VolkswagenPolo ,
    },
    {
        id: 1003,
        name: "Ford Fiesta",
        brand: "Ford",
        model: "Fiesta",
        category: "Mini / Supermini",
        engine: "1.1L",
        horsepower: "90hp",
        fuelConsumption: "5.7L/100km",
        fuelType: "Petrol",
        price: "80€ / ημέρα",
        summary: "Ένα σπορτίφ και οικονομικό αυτοκίνητο με άνετη οδήγηση.",
        image: FordFiesta ,
    },
    {
        id: 2001,
        name: "Renault Megane",
        brand: "Renault",
        model: "Megane",
        category: "Hatchback",
        engine: "1.3L",
        horsepower: "115hp",
        fuelConsumption: "6.2L/100km",
        fuelType: "Petrol",
        price: "90€ / ημέρα",
        summary: "Ένα κομψό και ευρύχωρο hatchback, ιδανικό για οικογένειες.",
        image: RenaultMegane ,
    },
    {
        id: 2002,
        name: "Volkswagen Golf",
        brand: "Volkswagen",
        model: "Golf",
        category: "Hatchback",
        engine: "1.5L",
        horsepower: "150hp",
        fuelConsumption: "5.9L/100km",
        fuelType: "Petrol",
        price: "100€ / ημέρα",
        summary: "Ένα από τα πιο δημοφιλή hatchback, με εξαιρετική ποιότητα κατασκευής.",
        image: VolkswagenGolf ,
    },
    {
        id: 2003,
        name: "Toyota Corolla",
        brand: "Toyota",
        model: "Corolla",
        category: "Hatchback",
        engine: "1.8L Hybrid",
        horsepower: "130hp",
        fuelConsumption: "4.3L/100km",
        fuelType: "Hybrid",
        price: "110€ / ημέρα",
        summary: "Υβριδική τεχνολογία για χαμηλή κατανάλωση και μεγάλη αξιοπιστία.",
        image: ToyotaCorolla ,
    },
    {
        id: 3001,
        name: "Alfa Romeo Giulia",
        brand: "Alfa Romeo",
        model: "Giulia",
        category: "Sedan",
        engine: "2.0L",
        horsepower: "180hp",
        fuelConsumption: "6.5L/100km",
        fuelType: "Petrol",
        price: "120€ / ημέρα",
        summary: "Ένα στυλάτο sedan με εξαιρετική οδική συμπεριφορά.",
        image: AlfaRomeoGiullia ,
    },
    {
        id: 3002,
        name: "Mercedes-Benz E-Class",
        brand: "Mercedes-Benz",
        model: "E-Class",
        category: "Sedan",
        engine: "2.0L",
        horsepower: "150hp",
        fuelConsumption: "6.7L/100km",
        fuelType: "Petrol",
        price: "150€ / ημέρα",
        summary: "Η επιτομή της πολυτέλειας σε ένα sedan με κορυφαία χαρακτηριστικά.",
        image: MercedesBenzEClass ,
    },
    {
        id: 3003,
        name: "BMW 3 Series",
        brand: "BMW",
        model: "3 Series",
        category: "Sedan",
        engine: "2.0L",
        horsepower: "180hp",
        fuelConsumption: "6.4L/100km",
        fuelType: "Diesel",
        price: "140€ / ημέρα",
        summary: "Εξαιρετική οδηγική εμπειρία σε ένα πολυτελές sedan.",
        image: BMW3Series ,
    },
    {
        id: 4001,
        name: "Volvo XC40",
        brand: "Volvo",
        model: "XC40",
        category: "SUV",
        engine: "2.0L",
        horsepower: "130hp",
        fuelConsumption: "7.8L/100km",
        fuelType: "Petrol",
        price: "160€ / ημέρα",
        summary: "Ένα premium SUV με υψηλά επίπεδα ασφάλειας και άνεσης.",
        image: VolvoXC40 ,
    },
    {
        id: 4002,
        name: "Suzuki Vitara",
        brand: "Suzuki",
        model: "Vitara",
        category: "SUV",
        engine: "1.4L",
        horsepower: "125hp",
        fuelConsumption: "6.2L/100km",
        fuelType: "Hybrid",
        price: "120€ / ημέρα",
        summary: "Ένα SUV με υβριδική τεχνολογία για χαμηλή κατανάλωση.",
        image: SuzukiVitara ,
    },
    {
        id: 4003,
        name: "Audi Q5",
        brand: "Audi",
        model: "Q5",
        category: "SUV",
        engine: "2.0L",
        horsepower: "190hp",
        fuelConsumption: "7.5L/100km",
        fuelType: "Petrol",
        price: "180€ / ημέρα",
        summary: "Πολυτέλεια και τεχνολογία αιχμής σε ένα premium SUV.",
        image: AudiQ5 ,
    },
    {
        id: 5001,
        name: "Renault Scenic",
        brand: "Renault",
        model: "Scenic",
        category: "MPV",
        engine: "1.6L",
        horsepower: "130hp",
        fuelConsumption: "6.8L/100km",
        fuelType: "Petrol",
        price: "90€ / ημέρα",
        summary: "Ένα πρακτικό MPV με χώρο για όλη την οικογένεια.",
        image: RenaultScenic ,
    },
    {
        id: 5002,
        name: "Peugeot 5008",
        brand: "Peugeot",
        model: "5008",
        category: "MPV",
        engine: "1.6L",
        horsepower: "150hp",
        fuelConsumption: "6.7L/100km",
        fuelType: "Diesel",
        price: "100€ / ημέρα",
        summary: "Χώρος, άνεση και ευελιξία για μεγάλες οικογένειες.",
        image: Peugeot5008 ,
    },
    {
        id: 6001,
        name: "Mercedes-Benz V 250",
        brand: "Mercedes-Benz",
        model: "V 250",
        category: "Van",
        engine: "2.1L",
        horsepower: "190hp",
        fuelConsumption: "8.5L/100km",
        fuelType: "Diesel",
        price: "200€ / ημέρα",
        summary: "Ιδανικό για επαγγελματικές ανάγκες και μεγάλες παρέες.",
        image: MercedesBenzV250 ,
    },
    {
        id: 6002,
        name: "Citroen Berlingo",
        brand: "Citroen",
        model: "Berlingo",
        category: "Van",
        engine: "1.5L",
        horsepower: "110hp",
        fuelConsumption: "6.5L/100km",
        fuelType: "Diesel",
        price: "120€ / ημέρα",
        summary: "Ένα ευρύχωρο και ευέλικτο επαγγελματικό όχημα, ιδανικό για μεγάλες οικογένειες ή επαγγελματικές ανάγκες.",
        image: CitroenBerlingo,
    },
    {
        id: 7001,
        name: "Fiat 500e",
        brand: "Fiat",
        model: "500e",
        category: "Electric",
        engine: "-",
        horsepower: "100hp",
        fuelConsumption: "0kWh/100km",
        fuelType: "Electric",
        price: "70€ / ημέρα",
        summary: "Μοντέρνο, οικολογικό και τέλειο για την πόλη.",
        image: Fiat500e,
    },
    {
        id: 7002,
        name: "Ford Mustang Mach E",
        brand: "Ford",
        model: "Mustang Mach E",
        category: "Electric",
        engine: "-",
        horsepower: "300hp",
        fuelConsumption: "0kWh/100km",
        fuelType: "Electric",
        price: "150€ / ημέρα",
        summary: "Ένα ηλεκτρικό SUV που προσφέρει στυλ και απόδοση.",
        image: FordMustangMachE,
    },
];

const CarsPage = () => {
    const navigate = useNavigate();

    const handleRentCar = (car) => {
        navigate("/rent", { state: { car } });
    };

    return (
        <div className="cars-page">
            <h2>Διαθέσιμα Αυτοκίνητα προς Ενοικίαση</h2>
            <div className="cars-grid">
                {cars.map((car) => (
                    <div className="car-card" key={car.id}>
                        <img src={car.image} alt={car.name} className="car-image" />
                        <h3>{car.name}</h3>
                        <p>{car.price}</p>
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
