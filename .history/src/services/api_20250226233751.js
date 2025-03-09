const API_URL = "http://localhost:5000"; // ✅ Σιγουρέψου ότι είναι το σωστό URL του backend

// 🔹 Ανάκτηση λίστας αυτοκινήτων
export const getCars = async () => {
    try {
        const response = await fetch(`${API_URL}/cars`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Σφάλμα φόρτωσης αυτοκινήτων.");
        return data;
    } catch (error) {
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
        
        // ✅ Αποθήκευση του token και των στοιχείων του χρήστη
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("role", data.role);
        
        return data;
    } catch (error) {
        throw error;
    }
};

// 🔹 Εγγραφή χρήστη
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
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(reservationData),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Σφάλμα κράτησης.");
        return data;
    } catch (error) {
        throw error;
    }
};

// 🔹 Λήψη κρατήσεων συγκεκριμένου χρήστη
export const getUserReservations = async (token) => {
    try {
        const response = await fetch(`${API_URL}/reservations/my-reservations`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Σφάλμα φόρτωσης κρατήσεων.");
        return data;
    } catch (error) {
        throw error;
    }
};
