"use client";

import Link from "next/link";
import Image from "next/image";
import { Flame } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  showLogo?: boolean;
  showSigil?: boolean;
  backLink?: boolean;
}

export function PageHeader({
  title,
  description,
  icon = <Flame className="mr-2" />,
  showLogo = true,
  showSigil = false,
  backLink = true,
}: PageHeaderProps) {
  return (
    <header className="mb-8">
      {backLink && (
        <div className="flex items-center gap-2 mb-4">
          {showLogo && (
            <Image
              src="/eye-of-kai_logo.png"
              alt="FlameDuel Logo"
              width={40}
              height={40}
              className="drop-shadow-[0_0_10px_rgba(255,0,0,0.5)]"
            />
          )}
          <Link href="/" className="text-purple-500 hover:text-purple-400 inline-block">
            ← Back to Home
          </Link>
        </div>
      )}
      
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold text-red-500 mb-2 flex items-center">
            {icon}
            {title}
          </h1>
          {description && (
            <p className="text-gray-400 max-w-3xl">
              {description}
            </p>
          )}
        </div>
        
        {showSigil && (
          <div className="hidden md:block">
            <Image
              src="/flamedual_sgil.png"
              alt="FlameDuel Sigil"
              width={60}
              height={60}
              className="opacity-70"
            />
          </div>
        )}
      </div>
    </header>
  );
}
