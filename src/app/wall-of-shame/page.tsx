"use client";

import Link from "next/link";
import Image from "next/image";
import { WallOfShame } from "@/components/WallOfShame";
import { ToastProvider } from "@/components/Toast";
import { PageHeader } from "@/components/PageHeader";
import { Flame, AlertTriangle } from "lucide-react";

export default function WallOfShamePage() {
  return (
    <ToastProvider>
      <div className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto">
        <PageHeader
          title="Wall of Shame"
          description="Those who accepted the challenge but failed to deliver. The flame remembers those who lack conviction."
          icon={<AlertTriangle className="mr-2" />}
          showSigil={true}
        />

        <main className="space-y-8">
          {/* Wall of Shame Component */}
          <WallOfShame />

          {/* Call to Action */}
          <section className="bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-lg p-8 text-center relative overflow-hidden">
            <div className="absolute -right-20 -bottom-20 opacity-20">
              <Image
                src="/flamedual_sgil.png"
                alt="FlameDuel Sigil"
                width={300}
                height={300}
              />
            </div>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-white mb-4">Think You Can Do Better?</h2>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Don't end up on the Wall of Shame. Accept the challenge, build something amazing, and submit it within the 1-hour time limit.
              </p>
              <Link
                href="/enter"
                className="inline-block bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-md transition-colors"
              >
                Accept the Challenge
              </Link>
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
