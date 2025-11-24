import { useState } from "react";
import { Link, useLocation } from "wouter";
import { MOCK_POSTS, Post } from "@/data/mockPosts";
import { PostCard } from "@/components/PostCard";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { analyzePost, updateVulnerabilityProfile, AnalysisResult } from "@/lib/conscientEngine";
import { storage } from "@/lib/storage";

export function SocialFeed() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const handleAnalyze = (post: Post) => {
    // Check if already analyzed
    const existingHistory = storage.getHistory<AnalysisResult>();
    const alreadyAnalyzed = existingHistory.find(h => h.postId === post.id);

    if (alreadyAnalyzed) {
        toast({
            title: "Already Analyzed",
            description: "Opening existing analysis...",
            duration: 2000,
        });
        // Redirect immediately to history with specific post ID
        // We can pass state via query param for now
        setLocation(`/history?id=${post.id}`);
        return;
    }

    // Perform analysis
    const result = analyzePost(post, {
        dwellTimeMs: 4000,
        tapCount: 1,
        scrollSpeed: "normal",
        clickedWithin2s: true,
        openCount: 1
    });

    // Update profile
    updateVulnerabilityProfile(result.influenceVector, result.distortionVector, result.responseVector);

    // Save to History
    storage.addHistoryItem(result);

    toast({
      title: "Analyzed with Boundier",
      description: "Redirecting to analysis...",
      duration: 2000,
    });

    // Redirect to history with "new" flag to trigger loading
    setTimeout(() => {
        setLocation(`/history?id=${post.id}&new=true`);
    }, 500);
  };

  return (
    <div className="bg-white min-h-screen relative overflow-hidden flex flex-col">
      
      {/* Fake App Header - Twitter style */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center gap-6">
         <Link href="/">
           <button className="p-2 hover:bg-gray-100 rounded-full text-gray-900 transition-colors">
             <ArrowLeft size={20} />
           </button>
         </Link>
         <h1 className="font-bold text-lg text-gray-900">Home</h1>
      </header>

      {/* Feed */}
      <div className="flex-1 overflow-y-auto pb-20">
        <div className="max-w-md mx-auto">
          {MOCK_POSTS.map((post) => (
            <PostCard 
              key={post.id} 
              post={post} 
              onAnalyze={handleAnalyze} 
            />
          ))}
          
          <div className="text-center py-8 text-gray-400 text-sm">
            You're all caught up!
          </div>
        </div>
      </div>

    </div>
  );
}
