import { motion } from "framer-motion";

interface EdgeIndicatorProps {
  onClick: () => void;
}

export function EdgeIndicator({ onClick }: EdgeIndicatorProps) {
  return (
    <motion.div
      className="fixed right-0 top-1/2 -translate-y-1/2 w-1.5 h-24 rounded-l-full cursor-pointer z-40 glass-interactive"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
      whileHover={{ width: 6, backgroundColor: "rgba(255, 255, 255, 0.4)" }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
    />
  );
}
