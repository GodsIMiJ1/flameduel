"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { VideoEmbed } from "@/components/VideoEmbed";
import { ToastProvider } from "@/components/Toast";
import { getDuel } from "@/lib/duel";
import { useEffect } from "react";
import { ExternalLink, Flame } from "lucide-react";

export default function DuelPage() {
  const params = useParams();
  const id = params.id as string;
  const duel = getDuel(id);

  useEffect(() => {
    // Add some example roasts when the page loads
    const addToast = (window as any).addToast;
    if (addToast) {
      setTimeout(() => {
        addToast("That variable naming is criminal! Did you learn to code from a cereal box?", "roast", 8000);
      }, 3000);

      setTimeout(() => {
        addToast("Ghost King just optimized that algorithm faster than you can say 'Big O Notation'!", "roast", 8000);
      }, 15000);
    }
  }, []);

  if (!duel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Duel Not Found</h1>
          <p className="text-gray-400 mb-6">The duel you're looking for doesn't exist or has been removed.</p>
          <Link
            href="/"
            className="inline-block bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-6 rounded-md transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <ToastProvider>
      <div className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Image
              src="/eye-of-kai_logo.png"
              alt="FlameDuel Logo"
              width={40}
              height={40}
              className="drop-shadow-[0_0_10px_rgba(255,0,0,0.5)]"
            />
            <Link href="/" className="text-purple-500 hover:text-purple-400 inline-block">
              ← Back to Home
            </Link>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-red-500 mb-2 flex items-center">
                <Flame className="mr-2 text-red-500" />
                {duel.episodeNumber && <span className="mr-2">#{duel.episodeNumber}:</span>}
                {duel.title}
              </h1>
              <div className="flex items-center">
                <div className="mr-4">
                  <span className="text-gray-400">Challenger:</span>{" "}
                  <span className="text-purple-500 font-semibold">{duel.challenger}</span>
                </div>
                {duel.status === "live" && (
                  <span className="inline-flex items-center px-2 py-1 rounded bg-red-500/20 text-red-500 text-xs">
                    <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse mr-1"></span>
                    LIVE
                  </span>
                )}
              </div>
            </div>
            <div className="hidden md:block">
              <Image
                src="/flamedual_sgil.png"
                alt="FlameDuel Sigil"
                width={60}
                height={60}
                className="opacity-70"
              />
            </div>
          </div>
        </header>

        <main className="space-y-8">
          {/* Video Stream */}
          <section>
            <VideoEmbed
              videoId={duel.videoId || "dQw4w9WgXcQ"}
              isLive={duel.status === "live"}
              title={duel.status === "live" ? `LIVE: ${duel.title}` : duel.title}
            />
          </section>

          {/* App Link */}
          {duel.appLink && (
            <section>
              <h2 className="text-2xl font-bold text-purple-500 border-b border-purple-500/30 pb-2 mb-4">
                Challenge App
              </h2>
              <div className="bg-black/90 border border-red-500/50 rounded-lg p-6 shadow-lg shadow-purple-500/20">
                <p className="text-gray-300 mb-4">
                  Check out the app built by {duel.challenger} during this challenge:
                </p>
                <a
                  href={duel.appLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-6 rounded-md transition-colors"
                >
                  View App <ExternalLink size={16} />
                </a>
              </div>
            </section>
          )}

          {/* Submission Video */}
          {duel.submissionVideoLink && (
            <section>
              <h2 className="text-2xl font-bold text-purple-500 border-b border-purple-500/30 pb-2 mb-4">
                Build Process
              </h2>
              <div className="bg-black/90 border border-red-500/50 rounded-lg p-6 shadow-lg shadow-purple-500/20">
                <p className="text-gray-300 mb-4">
                  Watch {duel.challenger}'s 1-hour build process:
                </p>
                <a
                  href={duel.submissionVideoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-md transition-colors"
                >
                  Watch Build Video <ExternalLink size={16} />
                </a>
              </div>
            </section>
          )}

          {/* Battle Description */}
          <section>
            <h2 className="text-2xl font-bold text-red-500 border-b border-red-500/30 pb-2 mb-4">
              Challenge Details
            </h2>
            <div className="bg-black/90 border border-red-500/50 rounded-lg p-6 shadow-lg shadow-purple-500/20">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-300 mb-4">
                    {duel.description || "No description available for this duel."}
                  </p>
                  {duel.duration && (
                    <p className="text-gray-400">
                      <span className="text-red-500 font-semibold">Build Time:</span> {duel.duration} minutes
                    </p>
                  )}
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-purple-500 mb-2">Challenge Type</h3>
                    <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full">
                      {duel.challengeType || "Web"}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-purple-500 mb-2">Challenge Rules</h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                      <li>1 Hour Time Limit</li>
                      <li>Must build a useful web/app tool</li>
                      <li>Must include AI integration</li>
                      <li>Screen recording required</li>
                    </ul>
                  </div>
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
