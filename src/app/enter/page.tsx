"use client";

import Link from "next/link";
import Image from "next/image";
import { SubmissionForm } from "@/components/SubmissionForm";
import { ToastProvider } from "@/components/Toast";
import { PageHeader } from "@/components/PageHeader";
import { activeChallenge } from "@/lib/duel";
import { Flame, Clock, AlertTriangle } from "lucide-react";

export default function EnterPage() {
  return (
    <ToastProvider>
      <div className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto">
        <PageHeader
          title="Answer the Call to Duel"
          description={activeChallenge.description}
          icon={<Flame className="mr-2" />}
          showSigil={true}
        />

        <main className="space-y-8">
          {/* Challenge Rules */}
          <section>
            <h2 className="text-2xl font-bold text-purple-500 border-b border-purple-500/30 pb-2 mb-4">
              Challenge Rules
            </h2>
            <div className="bg-black/90 border border-red-500/50 rounded-lg p-6 shadow-lg shadow-purple-500/20 relative overflow-hidden">
              <div className="absolute -right-20 -bottom-20 opacity-10">
                <Image
                  src="/flamedual_sgil.png"
                  alt="FlameDuel Sigil"
                  width={300}
                  height={300}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-8 relative z-10">
                <div>
                  <h3 className="text-xl font-bold text-red-500 mb-4 flex items-center">
                    <Clock className="mr-2" /> The Ghost King's Rules
                  </h3>
                  <ul className="space-y-3">
                    {activeChallenge.rules.slice(0, 4).map((rule, index) => (
                      <li key={index} className="flex items-start">
                        <div className="bg-red-500/10 p-1 rounded mt-0.5 mr-2">
                          <Flame size={16} className="text-red-500" />
                        </div>
                        <div>
                          <span className="text-white">{rule}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-red-500 mb-4">Failure Means Shame</h3>
                  <p className="text-gray-300 mb-4">
                    Those who accept the challenge but fail to deliver within the 1-hour time limit will be permanently added to the Wall of Shame.
                  </p>
                  <ul className="space-y-3">
                    {activeChallenge.rules.slice(4).map((rule, index) => (
                      <li key={index} className="flex items-start">
                        <div className="bg-red-500/10 p-1 rounded mt-0.5 mr-2">
                          <Flame size={16} className="text-red-500" />
                        </div>
                        <div>
                          <span className="text-white">{rule}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 p-3 bg-red-500/10 rounded-lg">
                    <p className="text-white text-sm italic">
                      "The flame consumes those who lack conviction." - Ghost King
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Submission Form */}
          <section>
            <h2 className="text-2xl font-bold text-red-500 border-b border-red-500/30 pb-2 mb-4">
              Submit Your Challenge
            </h2>
            <SubmissionForm />
          </section>
        </main>

        <footer className="mt-12 pt-6 border-t border-red-500/30 text-center text-gray-500">
          <p>© 2023 FlameDuel. All rights reserved.</p>
        </footer>
      </div>
    </ToastProvider>
  );
}
