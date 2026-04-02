import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowDown, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden animated-gradient">
      <motion.div animate={{ y: [-20, 20, -20], rotate: [0, 5, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-20 left-10 w-32 h-32 rounded-full bg-blush-200/40 blur-2xl" />
      <motion.div animate={{ y: [20, -20, 20], rotate: [0, -5, 0] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} className="absolute bottom-32 right-20 w-48 h-48 rounded-full bg-sage-200/40 blur-2xl" />
      <motion.div animate={{ y: [-15, 25, -15], scale: [1, 1.1, 1] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-cream-300/50 blur-xl" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-white/40 text-mocha-600 text-sm font-medium">
            <Sparkles size={14} /> Now open for dine-in & takeout
          </span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }} className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-mocha-800 leading-tight">
          Where Every<br />
          <span className="italic text-mocha-500">Sip</span> Tells a{' '}
          <span className="italic text-mocha-500">Story</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }} className="mt-8 text-lg md:text-xl text-mocha-500 max-w-2xl mx-auto font-light leading-relaxed">
          Handcrafted drinks, artisan pastries, and a space that feels like a warm hug. Come for the matcha, stay for the vibes.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }} className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/menu"><motion.button whileHover={{ scale: 1.05, boxShadow: '0 20px 40px -10px rgba(92, 68, 50, 0.2)' }} whileTap={{ scale: 0.95 }} className="btn-primary text-lg px-8 py-4">Explore Menu</motion.button></Link>
          <Link to="/reservation"><motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-secondary text-lg px-8 py-4">Reserve a Table</motion.button></Link>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="flex flex-col items-center gap-2 text-mocha-400">
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <ArrowDown size={16} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}