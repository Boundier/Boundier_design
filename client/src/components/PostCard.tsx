import { Post } from "@/data/mockPosts";
import { motion } from "framer-motion";
import { Play, Image as ImageIcon, FileText } from "lucide-react";

interface PostCardProps {
  post: Post;
  onClick: () => void;
}

export function PostCard({ post, onClick }: PostCardProps) {
  return (
    <motion.div
      className="mb-4 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm cursor-pointer active:scale-[0.98] transition-transform"
      onClick={onClick}
      whileHover={{ y: -2 }}
      layoutId={`post-${post.id}`}
    >
      {/* Mock User Header */}
      <div className="p-3 flex items-center gap-2 border-b border-gray-100">
        <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="h-3 w-24 bg-gray-200 rounded mb-1" />
          <div className="h-2 w-16 bg-gray-100 rounded" />
        </div>
        <div className="text-gray-300 text-xs">
           {Math.floor((Date.now() - post.timestamp) / 3600000)}h
        </div>
      </div>

      {/* Content */}
      <div className="relative bg-gray-100 aspect-video flex items-center justify-center text-gray-400">
        {post.type === "video" && <Play size={48} className="opacity-50" />}
        {post.type === "image" && <ImageIcon size={48} className="opacity-50" />}
        {post.type === "headline" && <FileText size={48} className="opacity-50" />}
        
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundColor: `hsl(${post.thumbnail.saturation * 360}, 70%, 50%)` 
          }}
        />
      </div>

      {/* Text */}
      <div className="p-3">
        <h3 className="font-bold text-gray-900 leading-tight mb-1 line-clamp-2">
          {post.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2">
          {post.text}
        </p>
      </div>
      
      {/* Footer Actions */}
      <div className="px-3 pb-3 flex gap-4 text-gray-400">
        <div className="h-4 w-4 bg-gray-200 rounded" />
        <div className="h-4 w-4 bg-gray-200 rounded" />
        <div className="h-4 w-4 bg-gray-200 rounded ml-auto" />
      </div>
    </motion.div>
  );
}
