CREATE DATABASE IF NOT EXISTS QuickDrives;
USE QuickDrives;

-- Πίνακας Χρηστών (Users)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username, email, password, role) VALUES ('admin', 'admin@example.com', '$2b$10$aAZ8uUF3sHP2AAKK//.Ai.hUq8rv1YeEzVQgyDpqw8cNQTvDEjYqy', 'admin');

-- Πίνακας Αυτοκινήτων (Cars)
CREATE TABLE IF NOT EXISTS cars (
    id INT AUTO_INCREMENT PRIMARY KEY,
    brand VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    category VARCHAR(50) NOT NULL,
    engine VARCHAR(20),
    horsepower INT,
    fuel_consumption VARCHAR(20),
    fuel_type VARCHAR(20),
    price_per_day DECIMAL(10,2) NOT NULL,
    summary TEXT NOT NULL,
    image_url VARCHAR(255),
    description TEXT
);

-- Πίνακας Κρατήσεων (Reservations)
CREATE TABLE IF NOT EXISTS reservations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    car_id INT NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    mobile VARCHAR(20) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    message TEXT,
    total_price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE CASCADE
);


-- Πίνακας Αιτημάτων Επικοινωνίας (ContactRequests)
CREATE TABLE IF NOT EXISTS contact_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    mobile VARCHAR(20) NOT NULL,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


 -- Εισαγωγή Δεδομένων στον Πίνακα Αυτοκινήτων (Cars)
INSERT INTO cars (brand, model, category, engine, horsepower, fuel_consumption, fuel_type, price_per_day, summary, image_url) VALUES
('Renault', 'Clio', 'Mini / Supermini', '1.2L', 110, '5.8L/100km', 'Petrol', 50.00, 'Ένα πρακτικό και οικονομικό αυτοκίνητο, ιδανικό για καθημερινές διαδρομές.', 'http://localhost:5000/images/Renault-Clio.jpg'),
('Volkswagen', 'Polo', 'Mini / Supermini', '1.0L', 95, '5.5L/100km', 'Petrol', 80.00, 'Ιδανικό για όσους θέλουν άνεση και στυλ στις καθημερινές τους μετακινήσεις.', 'http://localhost:5000/images/Volkswagen-Polo.jpg'),
('Ford', 'Fiesta', 'Mini / Supermini', '1.1L', 100, '5.7L/100km', 'Petrol', 80.00, 'Ένα σπορτίφ και οικονομικό αυτοκίνητο με άνετη οδήγηση.', 'http://localhost:5000/images/Ford-Fiesta.jpg'),

('Renault', 'Megane', 'Hatchback', '1.3L', 140, '6.2L/100km', 'Petrol', 90.00, 'Ένα κομψό και ευρύχωρο hatchback, ιδανικό για οικογένειες.', 'http://localhost:5000/images/Renault-Megane.jpg'),
('Volkswagen', 'Golf', 'Hatchback', '1.5L', 150, '5.9L/100km', 'Petrol', 100.00, 'Ένα από τα πιο δημοφιλή hatchback, με εξαιρετική ποιότητα κατασκευής.', 'http://localhost:5000/images/Volkswagen-Golf.jpg'),
('Toyota', 'Corolla', 'Hatchback', '1.8L Hybrid', 122, '4.3L/100km', 'Hybrid', 110.00, 'Υβριδική τεχνολογία για χαμηλή κατανάλωση και μεγάλη αξιοπιστία.', 'http://localhost:5000/images/Toyota-Corolla.jpg'),

('Alfa Romeo', 'Giulia', 'Sedan', '2.0L', 280, '6.5L/100km', 'Petrol', 120.00, 'Ένα στυλάτο sedan με εξαιρετική οδική συμπεριφορά.', 'http://localhost:5000/images/Alfa-Romeo-Giulia.jpg'),
('Mercedes-Benz', 'E-Class', 'Sedan', '2.0L', 194, '6.7L/100km', 'Petrol', 150.00, 'Η επιτομή της πολυτέλειας σε ένα sedan με κορυφαία χαρακτηριστικά.', 'http://localhost:5000/images/Mercedes-E-Class.jpg'),
('BMW', '3 Series', 'Sedan', '2.0L', 190, '6.4L/100km', 'Diesel', 140.00, 'Εξαιρετική οδηγική εμπειρία σε ένα πολυτελές sedan.', 'http://localhost:5000/images/BMW-3-Series.jpg'),

('Volvo', 'XC40', 'SUV', '2.0L', 190, '7.8L/100km', 'Petrol', 160.00, 'Ένα premium SUV με υψηλά επίπεδα ασφάλειας και άνεσης.', 'http://localhost:5000/images/Volvo-XC40.jpg'),
('Suzuki', 'Vitara', 'SUV', '1.4L', 129, '6.2L/100km', 'Hybrid', 120.00, 'Ένα SUV με υβριδική τεχνολογία για χαμηλή κατανάλωση.', 'http://localhost:5000/images/Suzuki-Vitara.jpg'),
('Audi', 'Q5', 'SUV', '2.0L', 204, '7.5L/100km', 'Petrol', 180.00, 'Πολυτέλεια και τεχνολογία αιχμής σε ένα premium SUV.', 'http://localhost:5000/images/Audi-Q5.jpg'),

('Renault', 'Scenic', 'MPV', '1.6L', 115, '6.8L/100km', 'Petrol', 90.00, 'Ένα πρακτικό MPV με χώρο για όλη την οικογένεια.', 'http://localhost:5000/images/Renault-Scenic.jpg'),
('Peugeot', '5008', 'MPV', '1.6L', 130, '6.7L/100km', 'Diesel', 100.00, 'Χώρος, άνεση και ευελιξία για μεγάλες οικογένειες.', 'http://localhost:5000/images/Peugeot-5008.jpg'),

('Mercedes-Benz', 'V 250', 'Van', '2.1L', 190, '8.5L/100km', 'Diesel', 200.00, 'Ιδανικό για επαγγελματικές ανάγκες και μεγάλες παρέες.', 'http://localhost:5000/images/Mercedes-V250.jpg'),
('Citroen', 'Berlingo', 'Van', '1.5L', 130, '5.9L/100km', 'Diesel', 90.00, 'Ευρύχωρο και ευέλικτο, ιδανικό για οικογένειες και επαγγελματική χρήση.', 'http://localhost:5000/images/Citroen-Berlingo.jpg'),

('Fiat', '500e', 'Electric', 'Electric', 118, '0 kWh/100km', 'Electric', 70.00, 'Μοντέρνο, οικολογικό και τέλειο για την πόλη.', 'http://localhost:5000/images/Fiat-500e.jpg'),
('Ford', 'Mustang Mach-E', 'Electric', 'Electric', 346, '0 kWh/100km', 'Electric', 150.00, 'Ένα ηλεκτρικό SUV που προσφέρει στυλ και απόδοση.', 'http://localhost:5000/images/Ford-Mustang-MachE.jpg');
