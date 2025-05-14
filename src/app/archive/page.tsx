"use client";

import Link from "next/link";
import { useState } from "react";
import { DuelCard } from "@/components/DuelCard";
import { getAllDuels } from "@/lib/duel";

export default function ArchivePage() {
  const allDuels = getAllDuels();
  const [filter, setFilter] = useState<"all" | "live" | "upcoming" | "completed">("all");
  
  const filteredDuels = allDuels.filter(duel => {
    if (filter === "all") return true;
    return duel.status === filter;
  });

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto">
      <header className="mb-8">
        <Link href="/" className="text-purple-500 hover:text-purple-400 mb-4 inline-block">
          ← Back to Home
        </Link>
        <h1 className="text-3xl font-bold text-red-500 mb-4">
          Battle Archives
        </h1>
        <p className="text-gray-400">
          Browse all past, present, and future duels in the FlameDuel arena.
        </p>
      </header>

      <main className="space-y-8">
        {/* Filter Controls */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-md transition-colors ${
              filter === "all"
                ? "bg-purple-500 text-white"
                : "bg-black/50 text-gray-300 hover:bg-black/70"
            }`}
          >
            All Duels
          </button>
          <button
            onClick={() => setFilter("live")}
            className={`px-4 py-2 rounded-md transition-colors ${
              filter === "live"
                ? "bg-red-500 text-white"
                : "bg-black/50 text-gray-300 hover:bg-black/70"
            }`}
          >
            Live Now
          </button>
          <button
            onClick={() => setFilter("upcoming")}
            className={`px-4 py-2 rounded-md transition-colors ${
              filter === "upcoming"
                ? "bg-purple-500 text-white"
                : "bg-black/50 text-gray-300 hover:bg-black/70"
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-4 py-2 rounded-md transition-colors ${
              filter === "completed"
                ? "bg-gray-500 text-white"
                : "bg-black/50 text-gray-300 hover:bg-black/70"
            }`}
          >
            Completed
          </button>
        </div>

        {/* Duels Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDuels.length > 0 ? (
            filteredDuels.map((duel) => (
              <DuelCard
                key={duel.id}
                id={duel.id}
                title={duel.title}
                status={duel.status}
                challenger={duel.challenger}
                episodeNumber={duel.episodeNumber}
                date={duel.date}
              />
            ))
          ) : (
            <div className="col-span-full bg-black/90 border border-red-500/50 rounded-lg p-6 shadow-lg shadow-purple-500/20 text-center">
              <p className="text-gray-300">No duels found matching your filter.</p>
            </div>
          )}
        </div>
      </main>

      <footer className="mt-12 pt-6 border-t border-red-500/30 text-center text-gray-500">
        <p>© 2023 FlameDuel. All rights reserved.</p>
      </footer>
    </div>
  );
}
