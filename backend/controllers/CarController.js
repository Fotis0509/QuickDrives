const db = require("../database");
const Car = require("../models/Car");

class CarController {
    // Μέθοδος για ανάκτηση όλων των αυτοκινήτων
    static getAllCars(req, res) {
        db.query("SELECT * FROM cars", (err, results) => {
            if (err) return res.status(500).json({ error: "Σφάλμα στη βάση δεδομένων." });
            
            const cars = results.map(car => new Car(
                car.id, car.brand, car.model, car.category,
                car.engine, car.horsepower, car.fuel_consumption,
                car.fuel_type, car.price_per_day, car.image_url, car.summary
            ));
            
            res.json(cars);
        });
    }

    // Μέθοδος για ανάκτηση ενός αυτοκινήτου με ID
    static getCarById(req, res) {
        const carId = req.params.id;

        db.query("SELECT * FROM cars WHERE id = ?", [carId], (err, results) => {
            if (err) return res.status(500).json({ error: "Σφάλμα στη βάση." });

            if (results.length === 0) {
                return res.status(404).json({ error: "Το αυτοκίνητο δεν βρέθηκε." });
            }

            const car = new Car(
                results[0].id, results[0].brand, results[0].model, results[0].category,
                results[0].engine, results[0].horsepower, results[0].fuel_consumption,
                results[0].fuel_type, results[0].price_per_day, results[0].image_url, results[0].summary
            );

            res.json(car);
        });
    }
}

module.exports = CarController;
