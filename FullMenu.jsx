import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Plus, Flame, Sparkles, Search } from 'lucide-react';
import { api } from '../api';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

function MenuCard({ item, index }) {
  const { addItem } = useCart();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleAdd = () => { addItem(item); toast.success(`${item.name} added to cart ☕`); };

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: (index % 4) * 0.1 }} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:shadow-mocha-900/8 transition-all duration-500">
      <div className="relative h-44 bg-gradient-to-br from-sand-50 to-blush-50 flex items-center justify-center text-5xl">
        {item.category_slug === 'coffee' && '☕'}
        {item.category_slug === 'tea' && '🍵'}
        {item.category_slug === 'pastries' && '🥐'}
        {item.category_slug === 'brunch' && '🍳'}
        {item.category_slug === 'desserts' && '🍰'}
        {item.category_slug === 'smoothies' && '🥤'}

        <div className="absolute top-3 left-3 flex gap-1.5">
          {item.is_popular === 1 && <span className="flex items-center gap-1 px-2.5 py-0.5 bg-mocha-700 text-cream-50 text-[10px] font-medium rounded-full"><Flame size={10} /> Popular</span>}
          {item.is_new === 1 && <span className="flex items-center gap-1 px-2.5 py-0.5 bg-sage-200 text-mocha-800 text-[10px] font-medium rounded-full"><Sparkles size={10} /> New</span>}
        </div>

        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={handleAdd} className="absolute bottom-3 right-3 w-10 h-10 bg-mocha-700 text-cream-50 rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300"><Plus size={18} /></motion.button>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-display text-base font-semibold text-mocha-800">{item.name}</h3>
          <span className="font-display text-base font-semibold text-mocha-600 whitespace-nowrap">${item.price.toFixed(2)}</span>
        </div>
        <p className="mt-1 text-xs text-mocha-400 line-clamp-2">{item.description}</p>
      </div>
    </motion.div>
  );
}

export default function FullMenu() {
  const [menu, setMenu] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [titleRef, titleInView] = useInView({ triggerOnce: true });

  useEffect(() => { api.getFullMenu().then(data => setMenu(data.menu)).catch(() => {}); }, []);

  const filteredMenu = menu.map(cat => ({ ...cat, items: cat.items.filter(item => { const matchesSearch = !search || item.name.toLowerCase().includes(search.toLowerCase()) || item.description?.toLowerCase().includes(search.toLowerCase()); const matchesCategory = activeCategory === 'all' || cat.slug === activeCategory; return matchesSearch && matchesCategory; }) })).filter(cat => cat.items.length > 0);

  return (
    <section className="pt-28 pb-24 px-6 min-h-screen bg-cream-50">
      <div className="max-w-7xl mx-auto">
        <motion.div ref={titleRef} initial={{ opacity: 0, y: 30 }} animate={titleInView ? { opacity: 1, y: 0 } : {}} className="text-center mb-12">
          <h1 className="section-title">Our <span className="italic text-mocha-500">Menu</span></h1>
          <p className="mt-4 text-mocha-400 max-w-lg mx-auto">Every item is crafted with care. Take your time, explore, and find your new favorite.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-12 space-y-6">
          <div className="relative max-w-md mx-auto">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-mocha-400" />
            <input type="text" placeholder="Search our menu..." value={search} onChange={e => setSearch(e.target.value)} className="input-field pl-11" />
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setActiveCategory('all')} className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === 'all' ? 'bg-mocha-700 text-cream-50 shadow-md' : 'bg-white text-mocha-500 hover:bg-sand-100 border border-sand-200'}`}>All</motion.button>
            {menu.map(cat => (
              <motion.button key={cat.slug} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setActiveCategory(cat.slug)} className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === cat.slug ? 'bg-mocha-700 text-cream-50 shadow-md' : 'bg-white text-mocha-500 hover:bg-sand-100 border border-sand-200'}`}>{cat.icon} {cat.name}</motion.button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={activeCategory + search} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {filteredMenu.map(cat => (
              <div key={cat.slug} className="mb-16">
                <motion.h2 initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="font-display text-3xl font-semibold text-mocha-800 mb-8 flex items-center gap-3">
                  <span className="text-3xl">{cat.icon}</span>{cat.name}<span className="text-sm font-body text-mocha-400 font-normal ml-2">({cat.items.length} items)</span>
                </motion.h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {cat.items.map((item, i) => <MenuCard key={item.id} item={{ ...item, category_slug: cat.slug }} index={i} />)}
                </div>
              </div>
            ))}
            {filteredMenu.length === 0 && <div className="text-center py-20"><span className="text-6xl">🔍</span><p className="mt-4 text-mocha-400 text-lg">No items found.</p></div>}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}