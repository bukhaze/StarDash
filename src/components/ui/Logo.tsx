"use client";

import React from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  isDark?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "", isDark = false }) => {
  return (
    <Link href="/" className={`inline-flex flex-col items-center justify-center group ${className}`}>
      <div className="relative flex items-center">
        {/* The Wordmark matching the new image Logo */}
        <span className="text-3xl md:text-[2rem] font-bold tracking-tight leading-none font-headline flex items-center" style={{ color: '#0ea5e9', fontFamily: 'system-ui, ui-sans-serif, sans-serif' }}>
          Star
          {/* 4-pointed star svg icon replicating the custom graphic */}
          <span className="relative flex items-center justify-center mx-0.5">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 md:w-10 md:h-10 text-[#0ea5e9]">
              <path d="M12 2C12 7.52285 7.52285 12 2 12C7.52285 12 12 16.4772 12 22C12 16.4772 16.4772 12 22 12C16.4772 12 12 7.52285 12 2Z" fill="currentColor" />
            </svg>
          </span>
          <span style={{ color: '#0284c7' }}>dash</span>
        </span>
      </div>
      
      {/* The Subtitle */}
      <span className={`text-[10px] md:text-[11px] font-medium uppercase tracking-[0.4em] leading-none mt-1 font-headline ${isDark ? 'text-white/50' : 'text-slate-600'}`}>
        S E R V I C E S
      </span>
    </Link>
  );
};

export default Logo;
