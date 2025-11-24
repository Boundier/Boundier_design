import { useState, useEffect } from "react";
import { TopNav } from "@/components/TopNav";
import { storage } from "@/lib/storage";
import { AnalysisResult } from "@/lib/conscientEngine";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ChevronRight, Trash2, AlertTriangle, ExternalLink, ChevronDown, X } from "lucide-react";
import { MOCK_POSTS } from "@/data/mockPosts";

export function HistoryScreen() {
  const [history, setHistory] = useState<AnalysisResult[]>([]);
  const [selectedItem, setSelectedItem] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    const loadHistory = () => {
      const data = storage.getHistory<AnalysisResult>();
      setHistory(data);
    };
    
    loadHistory();
    // Poll for updates (since we don't have a real store subscription)
    const interval = setInterval(loadHistory, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleClear = () => {
    if (confirm("Clear history?")) {
      localStorage.removeItem('boundier_history');
      setHistory([]);
    }
  };
  
  const getPostTitle = (id: string) => {
    const post = MOCK_POSTS.find(p => p.id === id);
    return post ? post.title : "Unknown Post";
  };

  const openDetail = (item: AnalysisResult) => {
    setSelectedItem(item);
  };

  const closeDetail = () => {
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-[#000543] pb-24 pt-safe px-4 md:px-8">
      <TopNav />

      <div className="max-w-md mx-auto space-y-6 pt-8">
        <header className="flex justify-between items-end mb-4">
          <div>
            <h1 className="text-3xl text-white font-bold mb-2">History</h1>
            <p className="text-white/60 text-sm">Analyzed Content Log</p>
          </div>
          {history.length > 0 && (
            <button 
                onClick={handleClear}
                className="p-2 text-white/40 hover:text-red-400 transition-colors"
            >
                <Trash2 size={18} />
            </button>
          )}
        </header>

        <div className="space-y-4">
          {history.length === 0 ? (
            <div className="glass-panel p-8 text-center flex flex-col items-center">
              <Clock size={48} className="text-white/20 mb-4" />
              <p className="text-white/60 text-sm">No analysis history yet.</p>
              <p className="text-white/40 text-xs mt-2">
                Share posts to Boundier to analyze them.
              </p>
            </div>
          ) : (
            history.map((item, idx) => (
              <motion.div
                key={item.timestamp + idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => openDetail(item)}
                className="glass-panel p-4 hover:bg-white/10 transition-colors cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-mono text-white/40">
                    {new Date(item.timestamp).toLocaleString()}
                  </span>
                  <div className="flex items-center gap-2">
                    {item.distortionVector.emotional_overload > 0.5 && (
                        <div className="px-1.5 py-0.5 rounded bg-red-500/20 border border-red-500/30 flex items-center gap-1">
                             <AlertTriangle size={10} className="text-red-400" />
                             <span className="text-[10px] text-red-400 font-bold">DISTORTED</span>
                        </div>
                    )}
                    <ChevronRight size={14} className="text-white/20 group-hover:text-white/60" />
                  </div>
                </div>
                
                <h3 className="text-white font-medium text-sm line-clamp-1 mb-3">
                    {getPostTitle(item.postId)}
                </h3>

                <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white/5 p-2 rounded">
                        <div className="text-[10px] text-white/40 mb-1">Top Influence</div>
                        <div className="text-[#0038FF] font-mono text-xs">
                            {Object.entries(item.influenceVector).sort(([,a], [,b]) => b-a)[0][0].replace('_', ' ')}
                        </div>
                    </div>
                    <div className="bg-white/5 p-2 rounded">
                        <div className="text-[10px] text-white/40 mb-1">Distortion</div>
                        <div className="text-[#FF3838] font-mono text-xs">
                            {Object.entries(item.distortionVector).sort(([,a], [,b]) => b-a)[0][0].replace('_', ' ')}
                        </div>
                    </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-8 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDetail}
          >
            <motion.div 
              className="bg-[#0a0f35] border border-white/10 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl max-h-[80vh] flex flex-col"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                 <div>
                    <h3 className="text-white font-bold text-sm">Analysis Detail</h3>
                    <p className="text-white/40 text-[10px] font-mono">{new Date(selectedItem.timestamp).toLocaleString()}</p>
                 </div>
                 <button onClick={closeDetail} className="p-2 hover:bg-white/10 rounded-full text-white/60">
                    <X size={20} />
                 </button>
              </div>
              
              <div className="p-6 overflow-y-auto space-y-6">
                 {/* Content Preview */}
                 <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                    <h4 className="text-white font-medium text-sm mb-1">
                       {getPostTitle(selectedItem.postId)}
                    </h4>
                    <p className="text-white/40 text-xs">
                       Analyzed Content
                    </p>
                 </div>

                 {/* Influence Vector */}
                 <div>
                    <h5 className="text-xs uppercase tracking-widest opacity-50 mb-3 font-bold text-white">Influence Vector</h5>
                    <div className="space-y-2">
                      {Object.entries(selectedItem.influenceVector).map(([key, value]) => (
                        <div key={key} className="group">
                          <div className="flex justify-between text-[10px] uppercase mb-0.5 text-white/80">
                            <span>{key.replace('_', ' ')}</span>
                            <span>{(value * 100).toFixed(0)}%</span>
                          </div>
                          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-[#0038FF]"
                              style={{ width: `${value * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Distortion Vector */}
                  <div>
                    <h5 className="text-xs uppercase tracking-widest opacity-50 mb-3 font-bold text-white">Distortion Signals</h5>
                    <div className="space-y-2">
                      {Object.entries(selectedItem.distortionVector).map(([key, value]) => (
                        <div key={key} className="group">
                          <div className="flex justify-between text-[10px] uppercase mb-0.5 text-white/80">
                            <span>{key.replace('_', ' ')}</span>
                            <span>{(value * 100).toFixed(0)}%</span>
                          </div>
                          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-[#FF3838]"
                              style={{ width: `${value * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Explanation */}
                  <div className="bg-[#0038FF]/20 border border-[#0038FF]/30 p-4 rounded-lg">
                    <p className="text-sm leading-relaxed text-white/90">
                      {selectedItem.explanation}
                    </p>
                  </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

