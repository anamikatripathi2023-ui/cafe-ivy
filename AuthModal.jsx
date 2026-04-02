import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Phone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function AuthModal({ isOpen, onClose, mode, setMode }) {
  const { login, register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'login') { await login(form.email, form.password); toast.success('Welcome back! ☕'); }
      else { await register(form.name, form.email, form.password, form.phone); toast.success('Welcome to Café Ivy! 🌸'); }
      onClose();
      setForm({ name: '', email: '', password: '', phone: '' });
    } catch (err) { toast.error(err.message); }
    finally { setLoading(false); }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-mocha-900/40 backdrop-blur-sm z-50" />
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50 p-4">
            <div className="bg-cream-50 rounded-3xl p-8 shadow-2xl border border-sand-100">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="font-display text-2xl font-semibold text-mocha-800">{mode === 'login' ? 'Welcome Back' : 'Join Us'}</h2>
                  <p className="text-sm text-mocha-400 mt-1">{mode === 'login' ? 'Sign in to your account' : 'Create your Café Ivy account'}</p>
                </div>
                <button onClick={onClose} className="w-10 h-10 rounded-full hover:bg-sand-100 flex items-center justify-center transition-colors"><X size={20} className="text-mocha-500" /></button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'register' && (
                  <div className="relative"><User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-mocha-400" /><input type="text" placeholder="Full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="input-field pl-11" required /></div>
                )}
                <div className="relative"><Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-mocha-400" /><input type="email" placeholder="Email address" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="input-field pl-11" required /></div>
                <div className="relative"><Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-mocha-400" /><input type="password" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="input-field pl-11" required minLength={6} /></div>
                {mode === 'register' && (
                  <div className="relative"><Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-mocha-400" /><input type="tel" placeholder="Phone (optional)" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="input-field pl-11" /></div>
                )}
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading} className="btn-primary w-full py-3.5 disabled:opacity-50">{loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}</motion.button>
              </form>

              <div className="mt-6 text-center">
                <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className="text-sm text-mocha-500 hover:text-mocha-700 transition-colors">{mode === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}</button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}