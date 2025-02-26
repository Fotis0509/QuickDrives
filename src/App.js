import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"; // ✅ Αφαιρέσαμε το useNavigate
import "./App.css";
import "./Footer.css";
import Banner from "./components/Banner";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ContactPage from "./pages/ContactPage";
import CarsPage from "./pages/CarsPage";
import DashboardPage from "./pages/DashboardPage";
import profileIcon from "./assets/icons/profile.png"; // ✅ Δεν χρειάζεται το API_BASE_URL

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token); // ✅ Έλεγχος αν υπάρχει token για να εμφανίζεται το προφίλ
    }, []);

    return (
        <Router>
            <div className="App">
                <header className="header">
                    <div className="logo">
                        <img src="/favicon.ico" alt="QuickDrives Logo" className="logo-icon" />
                        <Link to="/" className="logo-text">QuickDrives</Link>
                    </div>
                    <nav>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/cars">Cars</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                    </nav>
                    
                    {/* ✅ Προσθήκη του κουμπιού "Προφίλ" αν είναι συνδεδεμένος */}
                    <div className="auth-links">
                        {isLoggedIn ? (
                            <Link to="/dashboard" className="profile-icon">
                                <img src={profileIcon} alt="Profile" style={{ width: '32px', height: '32px' }} />
                                <span style={{ fontSize: '12px', color: '#fff', display: 'block', textAlign: 'center', marginTop: '5px' }}>Προφίλ</span>
                            </Link>
                        ) : (
                            <Link to="/login" className="profile-icon">
                                <img src={profileIcon} alt="Profile" style={{ width: '32px', height: '32px' }} />
                                <span style={{ fontSize: '12px', color: '#fff', display: 'block', textAlign: 'center', marginTop: '5px' }}>Είσοδος</span>
                            </Link>
                        )}
                    </div>
                </header>

                <Routes>
                    <Route path="/" element={<Banner />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/cars" element={<CarsPage />} />
                </Routes>

                <footer className="site-footer">
                    <div className="footer-content">
                        <div className="contact-info">
                            <h4>Επικοινωνία</h4>
                            <p>Email: info@QuickDrives.com</p>
                            <p>Τηλέφωνο: +30 210 1234567</p>
                            <p>Διεύθυνση: Λεωφόρος Ελευθερίου Βενιζέλου 123, Αθήνα</p>
                        </div>
                        <div className="social-media">
                            <h4>Ακολουθήστε μας</h4>
                            <p>
                                <a href="https://www.facebook.com">Facebook</a> |{" "}
                                <a href="https://www.instagram.com">Instagram</a> |{" "}
                                <a href="https://www.twitter.com">Twitter</a>
                            </p>
                        </div>
                        <div className="working-hours">
                            <h4>Ώρες Λειτουργίας</h4>
                            <p>Δευ - Παρ: 9:00 π.μ. - 6:00 μ.μ.</p>
                            <p>Σαβ: 10:00 π.μ. - 4:00 μ.μ.</p>
                        </div>
                    </div>
                    <p>&copy; 2024 QuickDrives. All rights reserved.</p>
                </footer>
            </div>
        </Router>
    );
}

export default App;
