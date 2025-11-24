import { useState } from "react";
import { Link } from "wouter";
import { MOCK_POSTS, Post } from "@/data/mockPosts";
import { PostCard } from "@/components/PostCard";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { analyzePost, updateVulnerabilityProfile } from "@/lib/conscientEngine";
import { storage } from "@/lib/storage";

export function SocialFeed() {
  const { toast } = useToast();

  const handleAnalyze = (post: Post) => {
    // Perform analysis and save to history
    const result = analyzePost(post, {
        dwellTimeMs: 4000,
        tapCount: 1,
        scrollSpeed: "normal",
        clickedWithin2s: true,
        openCount: 1
    });

    // Update profile (simulated "reading" it)
    updateVulnerabilityProfile(result.influenceVector, result.distortionVector, result.responseVector);

    // Save to History
    storage.addHistoryItem(result);

    toast({
      title: "Analyzed with Boundier",
      description: "Result saved to History log.",
      duration: 3000,
    });
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
