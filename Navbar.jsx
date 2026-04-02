import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, User, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ openAuth }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount, setIsOpen: setCartOpen } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/menu', label: 'Menu' },
    { to: '/reservation', label: 'Reserve' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass shadow-lg shadow-mocha-900/5' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <motion.span whileHover={{ rotate: 15 }} className="text-2xl">☕</motion.span>
            <span className="font-display text-2xl font-semibold text-mocha-800 group-hover:text-mocha-600 transition-colors">Café Ivy</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {links.map(link => (
              <Link key={link.to} to={link.to} className={`relative font-medium text-sm tracking-wide transition-colors duration-300 ${location.pathname === link.to ? 'text-mocha-700' : 'text-mocha-500 hover:text-mocha-700'}`}>
                {link.label}
                {location.pathname === link.to && (
                  <motion.div layoutId="navbar-indicator" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-mocha-700 rounded-full" />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <div className="hidden md:flex items-center gap-3">
                <span className="text-sm text-mocha-500">Hi, {user.name.split(' ')[0]}</span>
                <button onClick={logout} className="text-sm text-mocha-400 hover:text-mocha-700 transition-colors">Logout</button>
              </div>
            ) : (
              <button onClick={() => openAuth('login')} className="hidden md:flex items-center gap-2 text-sm text-mocha-600 hover:text-mocha-800 transition-colors">
                <User size={18} /> Sign In
              </button>
            )}

            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setCartOpen(true)} className="relative p-2 rounded-full hover:bg-sand-100 transition-colors">
              <ShoppingBag size={22} className="text-mocha-700" />
              <AnimatePresence>
                {itemCount > 0 && (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="absolute -top-1 -right-1 w-5 h-5 bg-mocha-700 text-cream-50 text-xs font-bold rounded-full flex items-center justify-center">
                    {itemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-full hover:bg-sand-100 transition-colors">
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed inset-0 z-40 pt-20 bg-cream-50/98 backdrop-blur-xl md:hidden">
            <div className="flex flex-col items-center gap-8 p-8">
              {links.map((link, i) => (
                <motion.div key={link.to} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                  <Link to={link.to} className="font-display text-3xl text-mocha-800 hover:text-mocha-600 transition-colors">{link.label}</Link>
                </motion.div>
              ))}
              {!user && (
                <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} onClick={() => { openAuth('login'); setMobileOpen(false); }} className="btn-primary">Sign In</motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}