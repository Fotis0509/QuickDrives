// src/pages/ContactPage.js
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
