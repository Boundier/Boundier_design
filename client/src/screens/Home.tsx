import { Link } from "wouter";
import { motion } from "framer-motion";
import { TopNav } from "@/components/TopNav";
import { Footer } from "@/components/Footer";
import { useState } from "react";

export function Home() {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [reduceTransparency, setReduceTransparency] = useState(false);

  const toggleMotion = () => {
    setReduceMotion(!reduceMotion);
    document.body.classList.toggle("reduce-motion");
  };

  const toggleTransparency = () => {
    setReduceTransparency(!reduceTransparency);
    document.body.classList.toggle("reduce-transparency");
  };

  return (
    <div className="min-h-screen bg-[#000543] relative overflow-hidden flex flex-col items-center justify-center p-6">
      <TopNav />
      
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#0038FF] rounded-full opacity-20 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#0038FF] rounded-full opacity-10 blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-md w-full"
      >
        {/* Logo Placeholder */}
        <div className="w-20 h-20 border-2 border-white/20 rounded-full mx-auto mb-8 flex items-center justify-center glass-panel">
          <div className="w-10 h-10 bg-[#0038FF] rounded-full opacity-80" />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          Boundier
        </h1>
        <p className="text-white/60 mb-12 text-lg font-light">
          Influence Detection Demo
        </p>

        <Link href="/social">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-white text-[#000543] rounded-xl font-bold text-lg shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_50px_-5px_rgba(255,255,255,0.4)] transition-all"
          >
            Open Social Media
          </motion.button>
        </Link>

        {/* Accessibility Toggles */}
        <div className="mt-12 flex gap-4 justify-center">
          <button 
            onClick={toggleMotion}
            className={`text-[10px] px-3 py-1 rounded-full border ${reduceMotion ? 'bg-white text-[#000543] border-white' : 'text-white/40 border-white/20'}`}
          >
            Reduce Motion
          </button>
          <button 
            onClick={toggleTransparency}
            className={`text-[10px] px-3 py-1 rounded-full border ${reduceTransparency ? 'bg-white text-[#000543] border-white' : 'text-white/40 border-white/20'}`}
          >
            Reduce Transparency
          </button>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
}
