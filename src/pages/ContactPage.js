/* // src/pages/ContactPage.js
import React from 'react';
import './Contact.css'; // Εισάγετε το CSS για την επαφή

const ContactPage = () => {
    return (
        <div className="contact-page">
            <div className="left-column">
                <h2>Σχετικά με εμάς</h2>
                <p>
                    Η εταιρεία QuickDrives εδρεύει στο χώρο της ενοικίασης αυτοκινήτων από το 2024. 
                    Παρέχουμε άριστες υπηρεσίες σε προσιτές τιμές.
                    Καλύπτουμε όλες τις ανάγκες σας για μετακίνηση στην πόλη και όχι μόνο.
                    Είμαστε εδώ για να σας εξυπηρετούμε με επαγγελματισμό και αφοσίωση.
                </p>
            </div>
            <div className="right-column">
                <h3>Επικοινωνήστε μαζί μας</h3>
                <form className="contact-form">
                    <div className="form-group">
                        <input type="text" name="name" placeholder="Ονοματεπώνημο" required />
                        <input type="email" name="email" placeholder="Διεύθυνση Email" required />
                        <input type="tel" name="phone" placeholder="Τηλέφωνο (προαιρετικό)" pattern="[0-9]{10}" />
                        <input type="tel" name="mobile" placeholder="Κινητό" pattern="[0-9]{10} required" />
                        <textarea name="message" rows="4" placeholder="Μήνυμα" required></textarea>
                    </div>
                    <button type="submit">Υποβολή</button>
                </form>
            </div>
        </div>
    );
};

export default ContactPage;
*/

import React, { useState } from "react";
import "./Contact.css";

const ContactPage = () => {
    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        phone: "",
        mobile: "",
        message: "",
    });

    const [responseMessage, setResponseMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/contact/send", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                setResponseMessage(data.message);
                setFormData({ full_name: "", email: "", phone: "", mobile: "", message: "" });
            } else {
                setResponseMessage(data.error);
            }
        } catch (error) {
            console.error("Σφάλμα κατά την αποστολή:", error);
            setResponseMessage("Σφάλμα κατά την αποστολή του αιτήματος.");
        }
    };

    return (
        <div className="contact-page">
            <div className="left-column">
                <h2>Σχετικά με εμάς</h2>
                <p>
                    Η εταιρεία QuickDrives εδρεύει στο χώρο της ενοικίασης αυτοκινήτων από το 2024.
                    Παρέχουμε άριστες υπηρεσίες σε προσιτές τιμές.
                    Καλύπτουμε όλες τις ανάγκες σας για μετακίνηση στην πόλη και όχι μόνο.
                    Είμαστε εδώ για να σας εξυπηρετούμε με επαγγελματισμό και αφοσίωση.
                </p>
            </div>
            <div className="right-column">
                <h3>Επικοινωνήστε μαζί μας</h3>
                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input 
                            type="text" 
                            name="full_name" 
                            placeholder="Ονοματεπώνυμο" 
                            value={formData.full_name} 
                            onChange={handleChange} 
                            required 
                        />
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Διεύθυνση Email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            required 
                        />
                        <input 
                            type="tel" 
                            name="phone" 
                            placeholder="Τηλέφωνο (προαιρετικό)" 
                            value={formData.phone} 
                            onChange={handleChange} 
                        />
                        <input 
                            type="tel" 
                            name="mobile" 
                            placeholder="Κινητό" 
                            value={formData.mobile} 
                            onChange={handleChange} 
                            required 
                        />
                        <textarea 
                            name="message" 
                            rows="4" 
                            placeholder="Το μήνυμά σας" 
                            value={formData.message} 
                            onChange={handleChange} 
                            required 
                        ></textarea>
                    </div>
                    <button type="submit">Υποβολή</button>
                </form>
                {responseMessage && <p className="response-message">{responseMessage}</p>}
            </div>
        </div>
    );
};

export default ContactPage;
