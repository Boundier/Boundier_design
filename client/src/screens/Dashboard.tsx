import { useState, useEffect } from "react";
import { TopNav } from "@/components/TopNav";
import { getVulnerabilityProfile, getPatternGraph, resetData, InfluenceVector } from "@/lib/conscientEngine";
import { VulnerabilityRadar } from "@/components/VulnerabilityRadar";
import { PatternLineChart } from "@/components/PatternLineChart";
import { motion } from "framer-motion";
import { RefreshCw, Trash2 } from "lucide-react";

export function Dashboard() {
  const [profile, setProfile] = useState<InfluenceVector | null>(null);
  const [pattern, setPattern] = useState<number[]>([]);
  const [sessionCounts, setSessionCounts] = useState<[string, number][]>([]);

  const refreshData = () => {
    setProfile(getVulnerabilityProfile());
    setPattern(getPatternGraph());
    
    // Calculate mock session counts from profile for demo
    if (profile) {
      const counts = Object.entries(profile)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 3)
        .map(([k, v]) => [k, Math.round(v * 10)] as [string, number]);
      setSessionCounts(counts);
    }
  };

  useEffect(() => {
    refreshData();
    const interval = setInterval(refreshData, 1000); // Real-time sync
    return () => clearInterval(interval);
  }, []);

  // Watch for profile changes to update session counts correctly
  useEffect(() => {
      if (profile) {
      const counts = Object.entries(profile)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 3)
        .map(([k, v]) => [k, Math.round(v * 10)] as [string, number]);
      setSessionCounts(counts);
    }
  }, [profile]);

  const handleReset = () => {
    if (confirm("Reset all demo data?")) {
      resetData();
      refreshData();
      // Force reload to clear state if needed or just let the interval catch it
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-[#000543] pb-20 pt-20 px-4 md:px-8">
      <TopNav />

      <div className="max-w-4xl mx-auto space-y-6">
        <header className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl text-white font-bold mb-2">Dashboard</h1>
            <p className="text-white/60 text-sm">Real-time Influence Analysis</p>
          </div>
          <button 
            onClick={handleReset}
            className="p-2 text-white/40 hover:text-red-400 transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Vulnerability Profile */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel p-6"
          >
            <h3 className="text-white font-bold text-sm mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#0038FF] rounded-full" />
              VULNERABILITY PROFILE
            </h3>
            {profile && <VulnerabilityRadar data={profile} />}
            <div className="mt-4 text-center text-white/40 text-xs">
              Real-time EWMA per dimension
            </div>
          </motion.div>

          <div className="space-y-6">
             {/* Pattern Graph */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-panel p-6"
            >
              <h3 className="text-white font-bold text-sm mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-[#0038FF] rounded-full" />
                INFLUENCE PATTERN
              </h3>
              <PatternLineChart data={pattern} />
               <div className="mt-4 flex justify-between text-white/40 text-xs">
                <span>Last 7 Events</span>
                <span>Intensity</span>
              </div>
            </motion.div>

            {/* Top Vectors */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-panel p-6"
            >
              <h3 className="text-white font-bold text-sm mb-4">DOMINANT VECTORS</h3>
              <div className="space-y-3">
                {sessionCounts.map(([key, count], idx) => (
                  <div key={key} className="flex items-center justify-between border-b border-white/5 pb-2 last:border-0">
                    <span className="text-white/80 capitalize text-sm">
                      {idx + 1}. {key.replace('_', ' ')}
                    </span>
                    <span className="text-[#0038FF] font-mono font-bold">{count}</span>
                  </div>
                ))}
                {sessionCounts.length === 0 && (
                  <div className="text-white/30 text-sm italic">No data yet</div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
