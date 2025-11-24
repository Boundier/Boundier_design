import { useState } from "react";
import { TopNav } from "@/components/TopNav";
import { Moon, Eye, Activity, Bell, Shield } from "lucide-react";
import { motion } from "framer-motion";

export function SettingsScreen() {
  const [settings, setSettings] = useState({
    enableOverlay: true,
    reduceMotion: false,
    reduceTransparency: false,
    hapticFeedback: true
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => {
      const newState = { ...prev, [key]: !prev[key] };
      
      // Apply immediate effects
      if (key === 'reduceMotion') {
        document.body.classList.toggle("reduce-motion", newState.reduceMotion);
      }
      if (key === 'reduceTransparency') {
        document.body.classList.toggle("reduce-transparency", newState.reduceTransparency);
      }
      
      return newState;
    });
  };

  return (
    <div className="min-h-screen bg-[#000543] pb-24 pt-safe px-4">
      <TopNav />

      <div className="max-w-md mx-auto space-y-8 pt-8">
        <header>
          <h1 className="text-3xl text-white font-bold mb-2">Settings</h1>
          <p className="text-white/60 text-sm">Customize your Boundier experience</p>
        </header>

        {/* Account */}
        <section className="space-y-4">
          <h2 className="text-xs font-bold text-[#0038FF] uppercase tracking-widest mb-4">Account</h2>
          
          <div className="glass-panel p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#0038FF] to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
              JD
            </div>
            <div>
              <div className="text-white font-bold text-lg">John Doe</div>
              <div className="text-white/40 text-xs">john.doe@example.com</div>
            </div>
          </div>
        </section>

        {/* Analysis Settings */}
        <section className="space-y-4">
          <h2 className="text-xs font-bold text-[#0038FF] uppercase tracking-widest mb-4">Analysis</h2>
          
          <div className="glass-panel p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-[#0038FF]">
                <Shield size={16} />
              </div>
              <div>
                <div className="text-white font-medium text-sm">Auto-Analyze</div>
                <div className="text-white/40 text-[10px]">Analyze content in background</div>
              </div>
            </div>
            <button 
              onClick={() => toggleSetting('enableOverlay')} 
              className={`w-12 h-6 rounded-full p-1 transition-colors ${settings.enableOverlay ? 'bg-[#0038FF]' : 'bg-white/10'}`}
            >
              <motion.div 
                className="w-4 h-4 bg-white rounded-full"
                animate={{ x: settings.enableOverlay ? 24 : 0 }}
              />
            </button>
          </div>

          <div className="glass-panel p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-[#0038FF]">
                <Activity size={16} />
              </div>
              <div>
                <div className="text-white font-medium text-sm">Visual Warning</div>
                <div className="text-white/40 text-[10px]">Subtle overlay on detection</div>
              </div>
            </div>
            <button 
              className={`w-12 h-6 rounded-full p-1 transition-colors bg-[#0038FF]`}
            >
              <motion.div 
                className="w-4 h-4 bg-white rounded-full"
                animate={{ x: 24 }}
              />
            </button>
          </div>
        </section>

        {/* Accessibility */}
        <section className="space-y-4">
          <h2 className="text-xs font-bold text-[#0038FF] uppercase tracking-widest mb-4">Accessibility</h2>
          
          <div className="glass-panel p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                <Moon size={16} />
              </div>
              <div>
                <div className="text-white font-medium text-sm">Reduce Motion</div>
                <div className="text-white/40 text-[10px]">Minimize animations</div>
              </div>
            </div>
             <button 
              onClick={() => toggleSetting('reduceMotion')}
              className={`w-12 h-6 rounded-full p-1 transition-colors ${settings.reduceMotion ? 'bg-[#0038FF]' : 'bg-white/10'}`}
            >
              <motion.div 
                className="w-4 h-4 bg-white rounded-full"
                animate={{ x: settings.reduceMotion ? 24 : 0 }}
              />
            </button>
          </div>

          <div className="glass-panel p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                <Eye size={16} />
              </div>
              <div>
                <div className="text-white font-medium text-sm">Reduce Transparency</div>
                <div className="text-white/40 text-[10px]">Solid backgrounds</div>
              </div>
            </div>
             <button 
              onClick={() => toggleSetting('reduceTransparency')}
              className={`w-12 h-6 rounded-full p-1 transition-colors ${settings.reduceTransparency ? 'bg-[#0038FF]' : 'bg-white/10'}`}
            >
              <motion.div 
                className="w-4 h-4 bg-white rounded-full"
                animate={{ x: settings.reduceTransparency ? 24 : 0 }}
              />
            </button>
          </div>
        </section>

         <div className="pt-8 text-center">
            <div className="text-white/20 text-[10px] mb-2">Boundier Demo v0.1.0</div>
            <div className="flex justify-center gap-4">
               <a href="#" className="text-white/40 text-xs hover:text-white">Privacy Policy</a>
               <a href="#" className="text-white/40 text-xs hover:text-white">Terms of Service</a>
            </div>
         </div>

      </div>
    </div>
  );
}
