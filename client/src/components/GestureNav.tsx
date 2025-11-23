import { useLocation } from "wouter";
import { motion } from "framer-motion";

export function GestureNav() {
  const [location, setLocation] = useLocation();

  // Don't show on OS Home
  if (location === '/') return null;

  const handleHome = () => {
    setLocation('/');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-5 z-[100] flex justify-center items-end pb-1 pointer-events-none">
      <motion.div 
        className="w-32 h-1 bg-white/40 rounded-full pointer-events-auto cursor-pointer backdrop-blur-md"
        whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.8)" }}
        whileTap={{ scale: 0.9 }}
        onClick={handleHome}
      />
    </div>
  );
}
