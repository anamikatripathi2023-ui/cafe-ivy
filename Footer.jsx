import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Phone, Mail, Instagram, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-mocha-800 text-cream-100 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-mocha-700/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl">☕</span>
              <span className="font-display text-2xl font-semibold text-cream-50">Café Ivy</span>
            </Link>
            <p className="text-mocha-400 text-sm leading-relaxed">A cozy corner where every cup is crafted with care and every moment is worth savoring.</p>
            <div className="flex gap-3 mt-6">
              <a href="#" className="w-10 h-10 rounded-full bg-mocha-700 flex items-center justify-center hover:bg-mocha-600 transition-colors"><Instagram size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-mocha-700 flex items-center justify-center hover:bg-mocha-600 transition-colors text-sm font-bold">𝕏</a>
            </div>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold text-cream-50 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-mocha-400 hover:text-cream-100 transition-colors text-sm">Home</Link></li>
              <li><Link to="/menu" className="text-mocha-400 hover:text-cream-100 transition-colors text-sm">Our Menu</Link></li>
              <li><Link to="/reservation" className="text-mocha-400 hover:text-cream-100 transition-colors text-sm">Reservations</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold text-cream-50 mb-4">Opening Hours</h3>
            <ul className="space-y-3 text-sm text-mocha-400">
              <li className="flex items-center gap-2"><Clock size={14} className="text-mocha-500" /> Mon – Fri: 7am – 9pm</li>
              <li className="flex items-center gap-2"><Clock size={14} className="text-mocha-500" /> Saturday: 8am – 10pm</li>
              <li className="flex items-center gap-2"><Clock size={14} className="text-mocha-500" /> Sunday: 8am – 8pm</li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold text-cream-50 mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-mocha-400">
              <li className="flex items-start gap-2"><MapPin size={14} className="text-mocha-500 mt-0.5 flex-shrink-0" /> 123 Blossom Lane, Garden District, NY 10001</li>
              <li className="flex items-center gap-2"><Phone size={14} className="text-mocha-500" /> +1 (555) 123-4567</li>
              <li className="flex items-center gap-2"><Mail size={14} className="text-mocha-500" /> hello@cafeivy.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-mocha-700 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-mocha-500 text-sm">© 2024 Café Ivy. All rights reserved.</p>
          <p className="text-mocha-500 text-sm flex items-center gap-1">Made with <Heart size={14} className="fill-blush-300 text-blush-300" /> and lots of coffee</p>
        </div>
      </div>
    </footer>
  );
}