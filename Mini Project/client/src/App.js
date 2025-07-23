import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import LanguageSwitcher from './components/LanguageSwitcher';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Booking from './pages/Booking';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Payment from './pages/Payment';
import About from './pages/About';
import Services from './pages/Services';
import Decorations from './pages/services/Decorations';
import Catering from './pages/services/Catering';
import SoundAndLighting from './pages/services/SoundAndLighting';
import Photography from './pages/services/Photography';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="App">
          <LanguageSwitcher />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/decorations" element={<Decorations />} />
            <Route path="/services/catering" element={<Catering />} />
            <Route path="/services/sound-and-lighting" element={<SoundAndLighting />} />
            <Route path="/services/photography" element={<Photography />} />
            <Route path="/events" element={<Events />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/payment" element={<Payment />} />
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;