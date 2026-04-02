import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Plus, Flame, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

function MenuCard({ item, index }) {
  const { addItem } = useCart();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const handleAdd = () => {
    addItem(item);
    toast.success(`${item.name} added to cart ☕`);
  };

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 60, rotateX: 10 }} animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}} transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }} className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-mocha-900/10 transition-all duration-500">
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-sand-100 to-blush-50">
        <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.6 }} className="w-full h-full flex items-center justify-center text-6xl">
          {item.category_slug === 'coffee' && '☕'}
          {item.category_slug === 'tea' && '🍵'}
          {item.category_slug === 'pastries' && '🥐'}
          {item.category_slug === 'brunch' && '🍳'}
          {item.category_slug === 'desserts' && '🍰'}
          {item.category_slug === 'smoothies' && '🥤'}
        </motion.div>

        <div className="absolute top-4 left-4 flex gap-2">
          {item.is_popular === 1 && <span className="flex items-center gap-1 px-3 py-1 bg-mocha-700 text-cream-50 text-xs font-medium rounded-full"><Flame size={12} /> Popular</span>}
          {item.is_new === 1 && <span className="flex items-center gap-1 px-3 py-1 bg-sage-300 text-mocha-800 text-xs font-medium rounded-full"><Sparkles size={12} /> New</span>}
        </div>

        <motion.button initial={{ opacity: 0, scale: 0.8 }} whileHover={{ scale: 1.1 }} onClick={handleAdd} className="absolute bottom-4 right-4 w-12 h-12 bg-mocha-700 text-cream-50 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-mocha-800">
          <Plus size={20} />
        </motion.button>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-lg font-semibold text-mocha-800 group-hover:text-mocha-600 transition-colors">{item.name}</h3>
            <p className="mt-1 text-sm text-mocha-400 leading-relaxed line-clamp-2">{item.description}</p>
          </div>
          <span className="font-display text-lg font-semibold text-mocha-600 whitespace-nowrap">${item.price.toFixed(2)}</span>
        </div>
        {item.calories && <span className="inline-block mt-3 text-xs text-mocha-400 bg-sand-50 px-2 py-1 rounded-md">{item.calories} cal</span>}
      </div>
    </motion.div>
  );
}

export default function FeaturedMenu() {
  const [items, setItems] = useState([]);
  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    api.getMenu({ popular: '1' }).then(data => setItems(data.items)).catch(() => {});
  }, []);

  return (
    <section className="py-24 px-6 bg-cream-50">
      <div className="max-w-7xl mx-auto">
        <motion.div ref={titleRef} initial={{ opacity: 0, y: 40 }} animate={titleInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-16">
          <span className="text-mocha-400 text-sm tracking-[0.3em] uppercase font-medium">Our Favorites</span>
          <h2 className="section-title mt-3">Most Loved <span className="italic text-mocha-500">Creations</span></h2>
          <p className="mt-4 text-mocha-400 max-w-xl mx-auto">The drinks and bites everyone keeps coming back for. Made with love, served with a smile.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item, i) => <MenuCard key={item.id} item={item} index={i} />)}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-14 text-center">
          <Link to="/menu"><motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-secondary">View Full Menu</motion.button></Link>
        </motion.div>
      </div>
    </section>
  );
}