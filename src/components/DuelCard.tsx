"use client";

import Link from "next/link";
import Image from "next/image";
import { Flame } from "lucide-react";

interface DuelCardProps {
  id: string;
  title: string;
  status: "live" | "upcoming" | "completed" | "no-show";
  challenger: string;
  episodeNumber?: number;
  date?: string;
}

export function DuelCard({
  id,
  title,
  status,
  challenger,
  episodeNumber,
  date,
}: DuelCardProps) {
  return (
    <Link href={`/duel/${id}`}>
      <div className="group border border-red-500/50 hover:border-red-500 rounded-lg overflow-hidden bg-black/90 shadow-lg shadow-purple-500/20 transition-all hover:shadow-purple-500/40 hover:scale-[1.02] relative">
        <div className="absolute -right-8 -bottom-8 opacity-10 z-0">
          <Image
            src="/flamedual_sgil.png"
            alt=""
            width={100}
            height={100}
          />
        </div>
        <div className="bg-black p-3 border-b border-red-500/50 flex items-center justify-between relative z-10">
          <div className="font-bold text-red-500 flex items-center">
            <Flame size={16} className="mr-1 text-red-500" />
            {episodeNumber && <span className="mr-2">#{episodeNumber}</span>}
            {title}
          </div>
          <div className="flex items-center">
            {status === "live" && (
              <span className="inline-flex items-center px-2 py-1 rounded bg-red-500/20 text-red-500 text-xs">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse mr-1"></span>
                LIVE
              </span>
            )}
            {status === "upcoming" && (
              <span className="px-2 py-1 rounded bg-purple-500/20 text-purple-500 text-xs">
                UPCOMING
              </span>
            )}
            {status === "completed" && (
              <span className="px-2 py-1 rounded bg-gray-500/20 text-gray-400 text-xs">
                COMPLETED
              </span>
            )}
            {status === "no-show" && (
              <span className="px-2 py-1 rounded bg-red-500/20 text-red-500 text-xs">
                NO-SHOW
              </span>
            )}
          </div>
        </div>
        <div className="p-4 relative z-10">
          <div className="mb-2">
            <span className="text-gray-400">Challenger:</span>{" "}
            <span className="text-purple-500 font-semibold">{challenger}</span>
          </div>
          {date && (
            <div className="text-sm text-gray-500">{date}</div>
          )}
        </div>
        <div className="bg-gradient-to-r from-red-500/10 to-purple-500/10 p-2 text-center text-sm text-white/70 group-hover:text-white transition-colors relative z-10">
          View Duel
        </div>
      </div>
    </Link>
  );
}
