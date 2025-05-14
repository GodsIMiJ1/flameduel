"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { DuelCard } from "@/components/DuelCard";
import { ToastProvider } from "@/components/Toast";
import { PageHeader } from "@/components/PageHeader";
import { getAllDuels } from "@/lib/duel";
import { Flame, Search, Filter, ChevronDown } from "lucide-react";

export default function DuelsPage() {
  const allDuels = getAllDuels();
  const [filter, setFilter] = useState<"all" | "live" | "upcoming" | "completed" | "no-show">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredDuels = allDuels.filter(duel => {
    // Apply status filter
    if (filter !== "all" && duel.status !== filter) return false;

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        duel.title.toLowerCase().includes(searchLower) ||
        duel.challenger.toLowerCase().includes(searchLower) ||
        (duel.description && duel.description.toLowerCase().includes(searchLower))
      );
    }

    return true;
  });

  return (
    <ToastProvider>
      <div className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto">
        <PageHeader
          title="Battle Archives"
          description="Browse all past, present, and future duels in the FlameDuel arena. Watch the Ghost King face off against challengers in epic coding battles."
          showSigil={true}
        />

        <main className="space-y-8">
          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search duels by title, challenger, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black/50 border border-purple-500/30 rounded-md py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Mobile Filter Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="w-full flex items-center justify-between bg-black/90 border border-purple-500/50 rounded-lg p-4"
            >
              <span className="flex items-center text-white">
                <Filter size={18} className="mr-2" /> Filter Duels
              </span>
              <ChevronDown
                size={18}
                className={`text-white transition-transform ${isFilterOpen ? "transform rotate-180" : ""}`}
              />
            </button>
          </div>

          {/* Filter Controls */}
          <div className={`flex flex-wrap gap-2 ${isFilterOpen ? "block" : "hidden md:flex"}`}>
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
                  ? "bg-green-500 text-white"
                  : "bg-black/50 text-gray-300 hover:bg-black/70"
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setFilter("no-show")}
              className={`px-4 py-2 rounded-md transition-colors ${
                filter === "no-show"
                  ? "bg-red-500 text-white"
                  : "bg-black/50 text-gray-300 hover:bg-black/70"
              }`}
            >
              No-Shows
            </button>
          </div>

          {/* Results Count */}
          <div className="text-gray-400">
            Showing {filteredDuels.length} {filteredDuels.length === 1 ? "duel" : "duels"}
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
                <p className="text-gray-300">No duels found matching your criteria.</p>
              </div>
            )}
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-lg p-8 text-center relative overflow-hidden">
            <div className="absolute -right-20 -bottom-20 opacity-20">
              <Image
                src="/flamedual_sgil.png"
                alt="FlameDuel Sigil"
                width={300}
                height={300}
              />
            </div>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-white mb-4">Ready to Enter the Arena?</h2>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Think you have what it takes to challenge the Ghost King? Accept the call to duel and show your skills in a 1-hour coding challenge.
              </p>
              <Link
                href="/enter"
                className="inline-block bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-md transition-colors"
              >
                Accept the Challenge
              </Link>
            </div>
          </div>
        </main>

        <footer className="mt-12 pt-6 border-t border-red-500/30 text-center text-gray-500">
          <p>© 2023 FlameDuel. All rights reserved.</p>
        </footer>
      </div>
    </ToastProvider>
  );
}
