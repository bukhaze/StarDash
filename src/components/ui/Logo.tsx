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
        {/* The Wordmark */}
        <span className="text-2xl md:text-3xl font-black tracking-tightest leading-none font-headline" style={{ color: '#2563eb' }}>
          Star
          {/* Integrated Blue Star - Centerpiece */}
          <span className="relative inline-block mx-0.5">
            <span className="absolute inset-0 flex items-center justify-center animate-subtle-float">
               <span className="material-symbols-outlined text-[1.25em] relative -top-[0.05em]" style={{ fontVariationSettings: "'FILL' 1", color: '#2563eb' }}>
                grade
               </span>
            </span>
            {/* Invisble placeholder to keep text spacing correct */}
            <span className="invisible material-symbols-outlined text-[1.25em]">grade</span>
          </span>
          Dash
        </span>
      </div>
      
      {/* The Subtitle */}
      <span className={`text-[9px] md:text-[10px] font-black uppercase tracking-[0.5em] leading-none mt-1.5 font-headline ${isDark ? 'text-slate-400' : 'text-slate-900 opacity-60'}`}>
        SERVICES
      </span>

      <style jsx global>{`
        @keyframes subtle-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .animate-subtle-float {
          animation: subtle-float 3s ease-in-out infinite;
        }
      `}</style>
    </Link>
  );
};

export default Logo;
