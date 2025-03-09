const API_URL = "http://localhost:5000";

// 🔹 Κλήση για δημιουργία κράτησης
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

// 🔹 Κλήση για λήψη κρατήσεων συγκεκριμένου χρήστη
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
