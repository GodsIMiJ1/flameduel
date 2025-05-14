"use client";

import { useState, useEffect } from "react";

interface VideoEmbedProps {
  videoId: string;
  isLive?: boolean;
  title?: string;
}

export function VideoEmbed({ videoId, isLive = false, title }: VideoEmbedProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [videoId]);

  return (
    <div className="w-full rounded-lg overflow-hidden bg-black/90 border border-red-500/50 shadow-lg shadow-purple-500/20">
      {title && (
        <div className="bg-black p-2 text-red-500 font-bold border-b border-red-500/50">
          {isLive && (
            <span className="inline-block mr-2 h-2 w-2 rounded-full bg-red-500 animate-pulse" />
          )}
          {title}
        </div>
      )}
      <div className="relative aspect-video">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <div className="text-red-500 animate-pulse">Loading stream...</div>
          </div>
        )}
        <iframe
          src={`https://www.youtube.com/embed/${videoId}${isLive ? '?autoplay=1' : ''}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          onLoad={() => setIsLoading(false)}
        />
      </div>
    </div>
  );
}
