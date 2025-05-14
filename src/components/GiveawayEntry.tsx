"use client";

import { useState } from "react";
import { Gift, Check, AlertCircle } from "lucide-react";

interface GiveawayEntryProps {
  title: string;
  description: string;
  endDate: string;
  prize: string;
  imageUrl?: string;
}

export function GiveawayEntry({
  title,
  description,
  endDate,
  prize,
  imageUrl,
}: GiveawayEntryProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    
    setError("");
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitted(true);
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-black/90 border border-purple-500/50 rounded-lg overflow-hidden shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all">
      {imageUrl && (
        <div className="relative h-48 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
          <div className="absolute bottom-0 left-0 p-4">
            <span className="inline-flex items-center px-3 py-1 rounded bg-purple-500 text-black text-sm font-bold">
              <Gift size={14} className="mr-1" /> GIVEAWAY
            </span>
          </div>
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-purple-500 mb-2">{title}</h3>
        <p className="text-gray-300 mb-4">{description}</p>
        
        <div className="mb-4 space-y-2">
          <div className="flex items-start">
            <div className="bg-purple-500/10 p-1 rounded mt-0.5">
              <Gift size={14} className="text-purple-500" />
            </div>
            <div className="ml-2">
              <h4 className="text-sm font-semibold text-purple-400">Prize:</h4>
              <p className="text-white">{prize}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-purple-500/10 p-1 rounded mt-0.5">
              <AlertCircle size={14} className="text-purple-500" />
            </div>
            <div className="ml-2">
              <h4 className="text-sm font-semibold text-purple-400">Ends:</h4>
              <p className="text-white">{endDate}</p>
            </div>
          </div>
        </div>
        
        {submitted ? (
          <div className="bg-green-500/10 border border-green-500/30 rounded-md p-4 text-center">
            <Check size={24} className="text-green-500 mx-auto mb-2" />
            <h4 className="text-green-500 font-semibold mb-1">Entry Confirmed!</h4>
            <p className="text-gray-300 text-sm">
              You've been entered into the giveaway. Good luck!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-gray-300 text-sm mb-1">
                Enter your email to join:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/50 border border-purple-500/30 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="your@email.com"
                disabled={isSubmitting}
              />
              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md transition-colors ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Submitting..." : "Enter Giveaway"}
            </button>
            
            <p className="text-gray-500 text-xs text-center">
              By entering, you agree to receive occasional emails from FlameDuel.
              We never spam or share your information.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
