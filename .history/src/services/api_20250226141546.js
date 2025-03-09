const API_URL = "http://localhost:5000";

// 🔹 Ανάκτηση όλων των αυτοκινήτων
export const getCars = async () => {
    try {
        const response = await fetch(`${API_URL}/cars`);
        if (!response.ok) throw new Error("Αποτυχία φόρτωσης αυτοκινήτων.");
        return await response.json();
    } catch (error) {
        console.error("Σφάλμα στη φόρτωση των αυτοκινήτων:", error);
        throw error;
    }
};

// 🔹 Σύνδεση χρήστη
export const login = async (credentials) => {
    try {
        const response = await fetch(`${API_URL}/users/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Σφάλμα σύνδεσης.");

        // Αποθήκευση token
        localStorage.setItem("token", data.token);
        return data;
    } catch (error) {
        throw error;
    }
};


// 🔹 Εγγραφή νέου χρήστη
export const signup = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/users/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Σφάλμα εγγραφής.");

        return data;
    } catch (error) {
        throw error;
    }
};

// 🔹 Δημιουργία κράτησης
export const createReservation = async (reservationData, token) => {
    try {
        const response = await fetch(`${API_URL}/reservations`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(reservationData),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Αποτυχία κράτησης.");
        return data;
    } catch (error) {
        throw error;
    }
};

export const getUserDashboard = async (token) => {
    try {
        const response = await fetch("http://localhost:5000/users/dashboard", { // ✅ Χρήση του σωστού URL
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Σφάλμα: ${response.status} - ${errorText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("❌ Σφάλμα API:", error);
        throw error;
    }
};
