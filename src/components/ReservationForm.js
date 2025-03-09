import React, { useState } from "react";
import { createReservation } from "../services/api";

const ReservationForm = ({ carId }) => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    mobile: "",
    start_date: "",
    end_date: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const reservationData = { ...formData, car_id: carId };
      await createReservation(reservationData);
      alert("Η κράτηση ολοκληρώθηκε επιτυχώς!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="reservation-form">
      <input type="text" name="full_name" placeholder="Ονοματεπώνυμο" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="text" name="phone" placeholder="Τηλέφωνο (προαιρετικό)" onChange={handleChange} />
      <input type="text" name="mobile" placeholder="Κινητό" onChange={handleChange} required />
      <input type="date" name="start_date" onChange={handleChange} required />
      <input type="date" name="end_date" onChange={handleChange} required />
      <textarea name="message" placeholder="Μήνυμα (προαιρετικό)" onChange={handleChange} />
      <button type="submit">Κάνε Κράτηση</button>
    </form>
  );
};

export default ReservationForm;
