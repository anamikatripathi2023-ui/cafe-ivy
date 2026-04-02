import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedMenu from './components/FeaturedMenu';
import About from './components/About';
import FullMenu from './components/FullMenu';
import Reservation from './components/Reservation';
import Reviews from './components/Reviews';
import Footer from './components/Footer';
import Cart from './components/Cart';
import AuthModal from './components/AuthModal';
import { useState } from 'react';

function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedMenu />
      <About />
      <Reviews />
    </>
  );
}

export default function App() {
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const openAuth = (mode = 'login') => {
    setAuthMode(mode);
    setAuthOpen(true);
  };

  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen bg-cream-50">
            <Navbar openAuth={openAuth} />
            <Cart />
            <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} mode={authMode} setMode={setAuthMode} />

            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/menu" element={<FullMenu />} />
              <Route path="/reservation" element={<Reservation />} />
            </Routes>

            <Footer />
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: { background: '#3C2E22', color: '#FFFDF7', borderRadius: '16px', fontFamily: '"DM Sans", sans-serif' },
                success: { iconTheme: { primary: '#D4E1D4', color: '#3C2E22' } },
              }}
            />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}