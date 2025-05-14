export interface Duel {
  id: string;
  title: string;
  status: "live" | "upcoming" | "completed" | "no-show";
  challenger: string;
  videoId?: string;
  episodeNumber?: number;
  date?: string;
  description?: string;
  appLink?: string;
  submissionVideoLink?: string;
  challengeType?: "web" | "mobile" | "ai" | "game" | "open" | "other";
  duration?: number; // in minutes
  noShowReason?: string; // only for no-shows
}

// Current active challenge
export const activeChallenge = {
  title: "The Ghost King's Open Challenge",
  description: "I, the Ghost King, challenge all falsehood AI developers, consultants, engineers, programmers, and any of the sort, to a FlameDuel. You have ONE HOUR to build a useful application with AI integration. Answer the call to battle or fall victim to defeat by default and be placed on the Wall of Shame.",
  rules: [
    "Must be useful (entertainment, tool, etc.)",
    "Must include AI integration (chat interface, automation, etc.)",
    "Can be incomplete only if the AI aspect functions",
    "Only 1 hour to build - less is ok, more is NEVER ('Hell's IDE')",
    "Must screen record your entire build process",
    "Submission must include app link and build video",
    "No dev teams - one on one only"
  ],
  videoId: "dQw4w9WgXcQ" // Placeholder for Ghost King's challenge video
};

// Mock data for duels - these represent people who have answered the call
export const duels: Duel[] = [
  {
    id: "1",
    title: "The Ghost King's Challenge",
    status: "live",
    challenger: "Open Challenge",
    videoId: "dQw4w9WgXcQ", // Placeholder video ID
    episodeNumber: 1,
    date: "Current",
    description: "The Ghost King challenges all AI developers, consultants, engineers, and programmers to a one-hour battle. Build something useful with AI integration in just 60 minutes.",
    challengeType: "open"
  },
  {
    id: "5",
    title: "The Ghost King's Challenge",
    status: "no-show",
    challenger: "AI Pretender",
    episodeNumber: 0,
    date: "May 1, 2023",
    description: "Failed to answer the call to battle",
    noShowReason: "Challenger claimed AI expertise but failed to submit within the 1-hour time limit",
    challengeType: "open"
  }
];

export function getDuel(id: string): Duel | undefined {
  return duels.find((duel) => duel.id === id);
}

export function getLiveDuel(): Duel | undefined {
  return duels.find((duel) => duel.status === "live");
}

export function getUpcomingDuels(): Duel[] {
  return duels.filter((duel) => duel.status === "upcoming");
}

export function getCompletedDuels(): Duel[] {
  return duels.filter((duel) => duel.status === "completed");
}

export function getNoShowDuels(): Duel[] {
  return duels.filter((duel) => duel.status === "no-show");
}

export function getAllDuels(): Duel[] {
  return duels;
}
