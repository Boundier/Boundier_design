import { Link } from "wouter";
import { motion } from "framer-motion";
import { TopNav } from "@/components/TopNav";
import logoImage from "@assets/LogoForHeader-removebg-preview_1763889598297.png";

export function Home() {
  return (
    <div className="min-h-screen bg-[#000543] relative overflow-hidden flex flex-col items-center justify-center p-6 pb-24">
      
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#0038FF] rounded-full opacity-20 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#0038FF] rounded-full opacity-10 blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-md w-full flex flex-col items-center"
      >
        {/* Logo */}
        <div className="mb-12">
          <img src={logoImage} alt="Boundier" className="h-16 object-contain" />
        </div>

        <Link href="/social">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-white text-[#000543] rounded-xl font-bold text-lg shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_50px_-5px_rgba(255,255,255,0.4)] transition-all"
          >
            Open Social Media
          </motion.button>
        </Link>

        <p className="mt-8 text-white/40 text-sm font-light">
          This is a mock environment to demonstrate influence detection.
        </p>
      </motion.div>

      <TopNav />
    </div>
  );
}
