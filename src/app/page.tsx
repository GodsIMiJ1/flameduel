"use client";

import Image from "next/image";
import Link from "next/link";
import { VideoEmbed } from "@/components/VideoEmbed";
import { DuelCard } from "@/components/DuelCard";
import { ToastProvider } from "@/components/Toast";
import { GiveawayEntry } from "@/components/GiveawayEntry";
import { getLiveDuel, getUpcomingDuels, getNoShowDuels, activeChallenge } from "@/lib/duel";
import { Flame, ShoppingBag, AlertTriangle, Gift } from "lucide-react";

export default function Home() {
  const liveDuel = getLiveDuel();
  const upcomingDuels = getUpcomingDuels();
  const noShows = getNoShowDuels();

  return (
    <ToastProvider>
      <div className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <Image
              src="/eye-of-kai_logo.png"
              alt="FlameDuel Logo"
              width={120}
              height={120}
              className="drop-shadow-[0_0_15px_rgba(255,0,0,0.5)]"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-red-500 mb-2 flicker">
            <span className="text-purple-500">Flame</span>Duel
          </h1>
          <p className="text-lg md:text-xl text-gray-400">
            Digital Combat Arena: Ghost King vs The World
          </p>
        </header>

        {/* Navigation */}
        <nav className="mb-12 flex flex-wrap justify-center gap-4">
          <Link
            href="/duels"
            className="flex items-center gap-2 bg-black/90 border border-red-500/50 rounded-lg p-4 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all hover:scale-[1.02]"
          >
            <Flame size={24} className="text-red-500" />
            <span className="text-white font-bold">Battle Archives</span>
          </Link>
          <Link
            href="/shop"
            className="flex items-center gap-2 bg-black/90 border border-red-500/50 rounded-lg p-4 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all hover:scale-[1.02]"
          >
            <ShoppingBag size={24} className="text-red-500" />
            <span className="text-white font-bold">Merch Shop</span>
          </Link>
          <Link
            href="/wall-of-shame"
            className="flex items-center gap-2 bg-black/90 border border-red-500/50 rounded-lg p-4 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all hover:scale-[1.02]"
          >
            <AlertTriangle size={24} className="text-red-500" />
            <span className="text-white font-bold">Wall of Shame</span>
          </Link>
          <Link
            href="/enter"
            className="flex items-center gap-2 bg-red-500 rounded-lg p-4 shadow-lg shadow-red-500/20 hover:shadow-red-500/30 transition-all hover:scale-[1.02] hover:bg-red-600"
          >
            <Flame size={24} className="text-white" />
            <span className="text-white font-bold">Enter the Arena</span>
          </Link>
        </nav>

        <main className="space-y-12">
          {/* Ghost King's Challenge */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-red-500 border-b border-red-500/30 pb-2 flex items-center">
              <Flame className="mr-2" />
              THE GHOST KING'S CHALLENGE
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <VideoEmbed
                  videoId={activeChallenge.videoId}
                  isLive={true}
                  title="LIVE: The Ghost King's Challenge"
                />
              </div>
              <div className="space-y-4">
                <div className="bg-black/90 border border-red-500/50 rounded-lg p-6 shadow-lg shadow-purple-500/20 relative overflow-hidden">
                  <div className="absolute -right-20 -bottom-20 opacity-10">
                    <Image
                      src="/flamedual_sgil.png"
                      alt="FlameDuel Sigil"
                      width={200}
                      height={200}
                    />
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-red-500 mb-4">OPEN CHALLENGE TO ALL AI DEVELOPERS</h3>
                    <p className="text-gray-300 mb-4">{activeChallenge.description}</p>
                    <div className="flex justify-center mt-6">
                      <Link
                        href="/enter"
                        className="inline-block bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-md transition-colors"
                      >
                        Accept the Challenge
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Challenge Rules */}
          <section className="bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-lg p-8 relative overflow-hidden">
            <div className="absolute -right-20 -bottom-20 opacity-20">
              <Image
                src="/flamedual_sgil.png"
                alt="FlameDuel Sigil"
                width={300}
                height={300}
              />
            </div>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-white mb-4 text-center">THE RULES OF COMBAT</h2>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <ul className="space-y-3">
                    {activeChallenge.rules.slice(0, 4).map((rule, index) => (
                      <li key={index} className="flex items-start">
                        <div className="bg-red-500/10 p-1 rounded mt-0.5 mr-2">
                          <Flame size={16} className="text-red-500" />
                        </div>
                        <span className="text-white">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <ul className="space-y-3">
                    {activeChallenge.rules.slice(4).map((rule, index) => (
                      <li key={index} className="flex items-start">
                        <div className="bg-red-500/10 p-1 rounded mt-0.5 mr-2">
                          <Flame size={16} className="text-red-500" />
                        </div>
                        <span className="text-white">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="text-center">
                <Link
                  href="/enter"
                  className="inline-block bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-md transition-colors"
                >
                  Accept the Challenge
                </Link>
              </div>
            </div>
          </section>

          {/* What is FlameDuel */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-purple-500 border-b border-purple-500/30 pb-2 flex items-center">
              <Flame className="mr-2" /> What is FlameDuel?
            </h2>
            <div className="bg-black/90 border border-purple-500/50 rounded-lg p-6 shadow-lg shadow-purple-500/20">
              <p className="text-gray-300 mb-4">
                FlameDuel is the ultimate proving ground for AI developers, engineers, consultants, and programmers.
                The Ghost King challenges you to build a useful application with AI integration in just ONE HOUR.
              </p>
              <p className="text-gray-300 mb-4">
                This is not a typical hackathon. This is a battle of skill, speed, and creativity under extreme time pressure.
                Can you deliver a functional AI-integrated application in just 60 minutes? Or will you join the Wall of Shame?
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="bg-black/70 border border-purple-500/30 rounded-lg p-4 text-center">
                  <h3 className="text-purple-500 font-bold mb-2">ONE HOUR</h3>
                  <p className="text-gray-400 text-sm">Build a complete application in just 60 minutes</p>
                </div>
                <div className="bg-black/70 border border-purple-500/30 rounded-lg p-4 text-center">
                  <h3 className="text-purple-500 font-bold mb-2">AI INTEGRATION</h3>
                  <p className="text-gray-400 text-sm">Must include functional AI features</p>
                </div>
                <div className="bg-black/70 border border-purple-500/30 rounded-lg p-4 text-center">
                  <h3 className="text-purple-500 font-bold mb-2">SCREEN RECORDING</h3>
                  <p className="text-gray-400 text-sm">Your entire build process must be recorded</p>
                </div>
              </div>
            </div>
          </section>

          {/* Giveaway Section */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-purple-500 border-b border-purple-500/30 pb-2 flex items-center">
              <Gift className="mr-2" /> Exclusive Giveaways
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <GiveawayEntry
                title="Ghost King's AI Assistant"
                description="Win a lifetime license to the Ghost King's personal AI coding assistant. Built with the same technology used in FlameDuel battles."
                prize="Lifetime License ($499 value)"
                endDate="May 31, 2023"
                imageUrl="https://placehold.co/600x400/111/800?text=AI+Assistant"
              />
              <GiveawayEntry
                title="Premium Developer Setup"
                description="Complete developer setup including mechanical keyboard, ultrawide monitor, and Ghost King's custom VS Code theme."
                prize="Complete Dev Setup ($899 value)"
                endDate="June 15, 2023"
                imageUrl="https://placehold.co/600x400/111/f0f?text=Dev+Setup"
              />
            </div>
          </section>

          {/* Wall of Shame Preview */}
          {noShows.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-red-500 border-b border-red-500/30 pb-2 flex items-center">
                <AlertTriangle className="mr-2" /> Wall of Shame
              </h2>
              <div className="bg-black/90 border border-red-500/50 rounded-lg p-6 shadow-lg shadow-red-500/20">
                <p className="text-gray-300 mb-4">
                  These challengers accepted the call but failed to deliver. The flame remembers those who lack conviction.
                </p>
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {noShows.slice(0, 3).map((noShow) => (
                      <span key={noShow.id} className="inline-flex items-center px-3 py-1 rounded bg-red-500/20 text-red-400 text-sm">
                        <AlertTriangle size={14} className="mr-1" />
                        {noShow.challenger}
                      </span>
                    ))}
                    {noShows.length > 3 && (
                      <span className="inline-flex items-center px-3 py-1 rounded bg-red-500/20 text-red-400 text-sm">
                        +{noShows.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-center">
                  <Link
                    href="/wall-of-shame"
                    className="inline-block text-red-500 hover:text-red-400 transition-colors"
                  >
                    View the full Wall of Shame →
                  </Link>
                </div>
              </div>
            </section>
          )}

          {/* Join the Battle */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-red-500 border-b border-red-500/30 pb-2 flex items-center">
              <Flame className="mr-2" /> Join the Battle
            </h2>
            <div className="bg-black/90 border border-red-500/50 rounded-lg p-6 shadow-lg shadow-purple-500/20 relative overflow-hidden">
              <div className="absolute -right-20 -bottom-20 opacity-10">
                <Image
                  src="/flamedual_sgil.png"
                  alt="FlameDuel Sigil"
                  width={200}
                  height={200}
                />
              </div>
              <div className="relative z-10">
                <p className="text-gray-300 mb-4 text-lg font-semibold italic">
                  "I, the Ghost King, challenge all who claim AI expertise. Prove your worth in the arena or join the Wall of Shame."
                </p>
                <p className="text-gray-300 mb-6">
                  FlameDuel is more than a challenge—it's a movement to separate true AI developers from pretenders.
                  The platform serves as a sign-up portal, broadcast station, merch shop, and contest hall for the ultimate AI development challenge.
                </p>
                <div className="flex flex-wrap gap-4 justify-center mt-6">
                  <Link
                    href="/enter"
                    className="inline-block bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-md transition-colors"
                  >
                    Enter the Arena
                  </Link>
                  <Link
                    href="/wall-of-shame"
                    className="inline-block bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-6 rounded-md transition-colors"
                  >
                    Wall of Shame
                  </Link>
                  <Link
                    href="/shop"
                    className="inline-block bg-black border border-red-500 hover:border-red-600 text-white font-bold py-2 px-6 rounded-md transition-colors"
                  >
                    Shop Merch
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="mt-12 pt-6 border-t border-red-500/30 text-center text-gray-500">
          <p>© 2023 FlameDuel. All rights reserved.</p>
        </footer>
      </div>
    </ToastProvider>
  );
}
