import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Heart, Leaf, Clock, Award } from 'lucide-react';

const values = [
  { icon: Heart, title: 'Made with Love', desc: 'Every drink is handcrafted by baristas who genuinely care about your cup.' },
  { icon: Leaf, title: 'Sustainably Sourced', desc: 'Our beans and leaves come from ethical farms that treat their workers right.' },
  { icon: Clock, title: 'Fresh Daily', desc: 'Pastries baked at 5am. Drinks made to order. Nothing sits around.' },
  { icon: Award, title: 'Award Winning', desc: 'Voted best café in the neighborhood three years running.' },
];

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="py-24 px-6 bg-sand-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-blush-100/50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-sage-100/50 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <span className="text-mocha-400 text-sm tracking-[0.3em] uppercase font-medium">Our Story</span>
            <h2 className="section-title mt-3">More Than Just <span className="italic text-mocha-500">Coffee</span></h2>
            <p className="mt-6 text-mocha-500 leading-relaxed text-lg">Café Ivy started as a tiny dream — to create a space where people could slow down, breathe, and enjoy something truly beautiful. We believe that a great cup of coffee isn't just about the beans.</p>
            <p className="mt-4 text-mocha-400 leading-relaxed">Every corner is designed to make you feel at home. From the soft lighting to the carefully curated playlist, from the hand-arranged flowers to the warm smiles behind the counter.</p>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="mt-8 flex gap-8">
              <div><span className="font-display text-4xl font-semibold text-mocha-700">5+</span><p className="text-mocha-400 text-sm mt-1">Years of craft</p></div>
              <div><span className="font-display text-4xl font-semibold text-mocha-700">50k+</span><p className="text-mocha-400 text-sm mt-1">Happy customers</p></div>
              <div><span className="font-display text-4xl font-semibold text-mocha-700">30+</span><p className="text-mocha-400 text-sm mt-1">Unique creations</p></div>
            </motion.div>
          </motion.div>

          <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {values.map((val, i) => (
              <motion.div key={val.title} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.15 }} className="p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/50 hover:shadow-lg hover:shadow-mocha-900/5 transition-all duration-500 group">
                <div className="w-12 h-12 rounded-xl bg-sand-100 flex items-center justify-center mb-4 group-hover:bg-mocha-700 transition-colors duration-300">
                  <val.icon size={22} className="text-mocha-600 group-hover:text-cream-50 transition-colors duration-300" />
                </div>
                <h3 className="font-display text-lg font-semibold text-mocha-800">{val.title}</h3>
                <p className="mt-2 text-sm text-mocha-400 leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}