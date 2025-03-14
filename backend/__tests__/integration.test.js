const request = require("supertest");
const app = require("../server"); // Το Express app
const { sequelize, Reservation } = require("../models"); // ✅ Χρησιμοποιούμε το Sequelize από τα models

describe("🔗 Integration Tests for Reservations API", () => {
    beforeAll(async () => {
        await sequelize.sync();
        await sequelize.models.Reservation.destroy({ where: {} }); // ✅ Καθαρίζει τις υπάρχουσες κρατήσεις
    });

    let token;
    let reservationId; // Αποθηκεύουμε το ID της κράτησης
    let userToken; // Token για τον νέο χρήστη

    // 🆕 Εγγραφή νέου χρήστη
    test("🆕 Εγγραφή νέου χρήστη", async () => {
        const response = await request(app).post("/users/signup").send({
            username: "newuser",
            email: "newuser@example.com",
            password: "newuser",
        });

        console.log("🚀 Response from user registration:", response.body);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("message", "Ο χρήστης δημιουργήθηκε!");
    });

    // 🔑 Login User 
    test("🔑 Login User", async () => {
        const response = await request(app).post("/users/login").send({
            email: "newuser@example.com",
            password: "newuser",
        });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("token");
        token = response.body.token;
    });

    // 🔑 Login Admin
    test("🔑 Login Admin", async () => {
        const response = await request(app).post("/users/login").send({
            email: "admin@example.com",
            password: "admin",
        });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("token");
        token = response.body.token;
    });

    // ✅ Δημιουργία νέας κράτησης
    test("✅ Δημιουργία νέας κράτησης", async () => {
        const response = await request(app)
            .post("/reservations")
            .set("Authorization", `Bearer ${token}`)
            .send({
                car_id: 1,
                full_name: "New User",
                email: "newuser@example.com",
                phone: "123456789",
                mobile: "987654321",
                start_date: "2025-04-20", 
                end_date: "2025-04-25",
                message: "Ειδικές οδηγίες",
                total_price: 200,
            });

        console.log("🚀 Response from reservation creation:", response.body);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("message", "✅ Η κράτηση ολοκληρώθηκε!");

        if (response.body.reservation) {
            reservationId = response.body.reservation.id; // ✅ Αποθηκεύει το ID μόνο αν υπάρχει
            console.log(`✅ Αποθηκεύτηκε το reservationId: ${reservationId}`);
        } else {
            throw new Error("🚨 Η κράτηση δεν δημιουργήθηκε σωστά. Response:", response.body);
        }
    });

    // 🚫 Αποτυχία κράτησης λόγω διπλής κράτησης
    test("🚫 Αποτυχία κράτησης λόγω διπλής κράτησης", async () => {
        const response = await request(app)
            .post("/reservations")
            .set("Authorization", `Bearer ${token}`)
            .send({
                car_id: 1,
                full_name: "Jane Doe",
                email: "jane@example.com",
                phone: "555555555",
                mobile: "999999999",
                start_date: "2025-04-22",  
                end_date: "2025-04-28",
                message: "",
                total_price: 300,
            });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error", "🚫 Αυτό το αυτοκίνητο είναι ήδη κρατημένο στις επιλεγμένες ημερομηνίες!");
    });

    // 📂 Ανάκτηση όλων των κρατήσεων (Admin)
    test("📂 Ανάκτηση όλων των κρατήσεων", async () => {
        const response = await request(app)
            .get("/reservations/admin-reservations")
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    // 📝 Ενημέρωση κράτησης
    test("📝 Ενημέρωση κράτησης", async () => {
        if (!reservationId) {
            console.warn("⚠ Παράλειψη τεστ ενημέρωσης γιατί δεν υπάρχει κράτηση");
            return;
        }
    
        const response = await request(app)
            .put(`/reservations/${reservationId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                start_date: "2025-04-30",
                end_date: "2025-05-05",
                total_price: 250,
            });
    
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message", "Η κράτηση ενημερώθηκε!");
    });

    // 🗑 Διαγραφή κράτησης
    test("🗑 Διαγραφή κράτησης", async () => {
        if (!reservationId) {
            console.warn("⚠ Παράλειψη τεστ διαγραφής γιατί δεν υπάρχει κράτηση");
            return;
        }
    
        const response = await request(app)
            .delete(`/reservations/${reservationId}`)
            .set("Authorization", `Bearer ${token}`);
    
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message", "Η κράτηση διαγράφηκε!");
    });

    // 📩 Αποστολή μηνύματος μέσω φόρμας επικοινωνίας
    test("📩 Αποστολή μηνύματος μέσω φόρμας επικοινωνίας", async () => {
        const response = await request(app)
            .post("/contact/send")  // Βεβαιώσου ότι η διαδρομή είναι σωστή!
            .send({
                full_name: "Frank Jim",
                email: "frankjim@example.com",
                phone: "123456789",
                mobile: "987654321",
                message: "Αυτό είναι ένα δοκιμαστικό μήνυμα."
            });
    
        console.log("📩 Response from contact form:", response.body);
    
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("message", "Το μήνυμα στάλθηκε επιτυχώς!");
    });
    

    afterAll(async () => {
        await new Promise((resolve) => setTimeout(resolve, 500)); // Περιμένει πριν κλείσει η βάση
        await sequelize.close();
    });
});
