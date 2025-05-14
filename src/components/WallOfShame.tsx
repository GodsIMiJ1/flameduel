"use client";

import { useState } from "react";
import { getNoShowDuels, activeChallenge } from "@/lib/duel";
import { Flame, Calendar, AlertTriangle } from "lucide-react";

export function WallOfShame() {
  const noShows = getNoShowDuels();
  const [sortBy, setSortBy] = useState<"date" | "name">("date");

  const sortedNoShows = [...noShows].sort((a, b) => {
    if (sortBy === "date") {
      // Sort by date (newest first)
      return new Date(b.date || "").getTime() - new Date(a.date || "").getTime();
    } else {
      // Sort by challenger name
      return a.challenger.localeCompare(b.challenger);
    }
  });

  return (
    <div className="space-y-6">
      {/* Sort Controls */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-red-500 flex items-center">
          <Flame className="mr-2" /> The Ghost King's Wall of Shame
        </h2>
        <div className="flex items-center space-x-2">
          <span className="text-gray-400">Sort by:</span>
          <button
            onClick={() => setSortBy("date")}
            className={`px-3 py-1 rounded-md transition-colors ${
              sortBy === "date"
                ? "bg-red-500 text-white"
                : "bg-black/50 text-gray-300 hover:bg-black/70"
            }`}
          >
            Date
          </button>
          <button
            onClick={() => setSortBy("name")}
            className={`px-3 py-1 rounded-md transition-colors ${
              sortBy === "name"
                ? "bg-red-500 text-white"
                : "bg-black/50 text-gray-300 hover:bg-black/70"
            }`}
          >
            Name
          </button>
        </div>
      </div>

      {/* No Shows List */}
      {sortedNoShows.length > 0 ? (
        <div className="grid gap-4">
          {sortedNoShows.map((noShow) => (
            <div
              key={noShow.id}
              className="bg-black/90 border border-red-500/50 rounded-lg p-4 shadow-lg shadow-red-500/10 hover:shadow-red-500/20 transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-xl font-bold text-red-500 mb-1">
                    {noShow.challenger}
                  </h3>
                  <p className="text-gray-400 mb-2 flex items-center">
                    <Calendar size={14} className="mr-1" />
                    {noShow.date}
                    {noShow.episodeNumber && (
                      <span className="ml-2 text-sm bg-red-500/20 text-red-400 px-2 py-0.5 rounded">
                        Episode #{noShow.episodeNumber}
                      </span>
                    )}
                  </p>
                </div>
                <div className="mt-2 md:mt-0">
                  <span className="inline-flex items-center px-3 py-1 rounded bg-red-500/20 text-red-400 text-sm">
                    <AlertTriangle size={14} className="mr-1" />
                    No-Show
                  </span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-red-500/20">
                <div className="flex items-start">
                  <div className="bg-red-500/10 p-2 rounded">
                    <AlertTriangle size={16} className="text-red-500" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-semibold text-red-400">Reason:</h4>
                    <p className="text-gray-300 text-sm">
                      {noShow.noShowReason || "Failed to submit within the required timeframe"}
                    </p>
                  </div>
                </div>
                <div className="mt-3 text-sm text-gray-500 italic">
                  Challenge: {noShow.title} - {noShow.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-black/90 border border-red-500/50 rounded-lg p-6 shadow-lg shadow-purple-500/20 text-center">
          <p className="text-gray-300">No AI developers have failed the challenge... yet. Will you be the first?</p>
        </div>
      )}

      {/* Shame Policy */}
      <div className="bg-black/70 border border-red-500/30 rounded-md p-4">
        <h3 className="text-red-500 font-bold mb-2">The Ghost King's Decree:</h3>
        <p className="text-gray-300 text-sm mb-3">
          I, the Ghost King, challenge all who claim AI expertise. Those who accept the call to battle but fail to deliver within the 1-hour time limit are permanently added to the Wall of Shame. Their names will stand as testament to their false claims and lack of conviction.
        </p>
        <p className="text-gray-300 text-sm mb-3">
          The rules are simple:
        </p>
        <ul className="list-none text-gray-300 space-y-1 text-sm mb-3">
          {activeChallenge.rules.slice(0, 3).map((rule, index) => (
            <li key={index} className="flex items-start">
              <Flame size={12} className="text-red-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>{rule}</span>
            </li>
          ))}
        </ul>
        <p className="text-gray-400 text-sm italic">
          "The flame separates the worthy from the pretenders." - Ghost King
        </p>
      </div>
    </div>
  );
}
