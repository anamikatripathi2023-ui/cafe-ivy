import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../api';
import toast from 'react-hot-toast';

export default function Cart() {
  const { items, removeItem, updateQuantity, clearCart, total, itemCount, isOpen, setIsOpen } = useCart();
  const { user } = useAuth();

  const handleCheckout = async () => {
    if (!user) { toast.error('Please sign in to place an order'); return; }
    try {
      await api.createOrder({ user_id: user.id, customer_name: user.name, customer_phone: user.phone, items: items.map(i => ({ menu_item_id: i.id, quantity: i.quantity })) });
      toast.success('Order placed! We\'re on it 🎉');
      clearCart();
      setIsOpen(false);
    } catch (err) { toast.error(err.message); }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOpen(false)} className="fixed inset-0 bg-mocha-900/40 backdrop-blur-sm z-50" />
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 300 }} className="fixed top-0 right-0 h-full w-full max-w-md bg-cream-50 z-50 flex flex-col shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-sand-100">
              <div className="flex items-center gap-3">
                <ShoppingBag size={22} className="text-mocha-700" />
                <h2 className="font-display text-xl font-semibold text-mocha-800">Your Cart</h2>
                <span className="text-sm text-mocha-400">({itemCount} items)</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="w-10 h-10 rounded-full hover:bg-sand-100 flex items-center justify-center transition-colors"><X size={20} className="text-mocha-600" /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <AnimatePresence>
                {items.map(item => (
                  <motion.div key={item.id} layout initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex gap-4 bg-white rounded-2xl p-4 shadow-sm border border-sand-50">
                    <div className="w-16 h-16 rounded-xl bg-sand-50 flex items-center justify-center text-2xl flex-shrink-0">☕</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-mocha-800 text-sm truncate">{item.name}</h3>
                      <p className="text-mocha-500 text-sm mt-0.5">${item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 rounded-full border border-sand-200 flex items-center justify-center text-mocha-500 hover:bg-sand-50 transition-colors"><Minus size={14} /></button>
                        <span className="text-sm font-medium text-mocha-700 w-6 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 rounded-full border border-sand-200 flex items-center justify-center text-mocha-500 hover:bg-sand-50 transition-colors"><Plus size={14} /></button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <button onClick={() => removeItem(item.id)} className="text-mocha-300 hover:text-mocha-600 transition-colors"><X size={16} /></button>
                      <span className="font-display font-semibold text-mocha-700">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {items.length === 0 && <div className="flex flex-col items-center justify-center h-full text-center"><span className="text-6xl mb-4">🛒</span><p className="font-display text-xl text-mocha-600">Your cart is empty</p></div>}
            </div>

            {items.length > 0 && (
              <div className="border-t border-sand-100 p-6 space-y-4">
                <div className="flex items-center justify-between"><span className="text-mocha-500">Subtotal</span><span className="font-display text-xl font-semibold text-mocha-800">${total.toFixed(2)}</span></div>
                <p className="text-xs text-mocha-400">Tax calculated at checkout</p>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleCheckout} className="btn-primary w-full flex items-center justify-center gap-2">Place Order <ArrowRight size={18} /></motion.button>
                <button onClick={clearCart} className="w-full text-center text-sm text-mocha-400 hover:text-mocha-600 transition-colors">Clear cart</button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}