'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/ui/Logo';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const phoneNumber = "+254 723 531 085";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Reviews', href: '/reviews' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 font-inter">
      {/* Top Bar - Matching Screenshot */}
      <div className={`bg-[#2563eb] py-2 px-6 md:px-10 flex flex-col sm:flex-row justify-between items-center text-white/90 text-[11px] font-bold tracking-widest uppercase transition-all duration-500 ${scrolled ? 'h-0 py-0 opacity-0 overflow-hidden' : 'opacity-100'}`}>
         <div className="flex items-center gap-4">
            <span className="hidden md:inline">Professional Cleaning & Fumigation Services in Nairobi</span>
         </div>
         <div className="flex items-center gap-8">
            <a href={`tel:+254 723 531 085`} className="flex items-center gap-2 hover:text-white transition-colors">
               <span className="material-symbols-outlined text-[14px]">call</span>
               0723 531 085
            </a>
            <a href="https://wa.me/254723531085" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
               <span className="material-symbols-outlined text-[14px]">chat</span>
               WhatsApp Us
            </a>
         </div>
      </div>

      <div className={`w-full transition-all duration-500 px-6 md:px-10 ${scrolled ? 'bg-white/90 backdrop-blur-3xl py-4 shadow-xl border-b border-slate-100' : 'bg-white py-6'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="scale-90 md:scale-100 origin-left">
            <Logo />
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-12">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all relative group h-10 flex items-center ${pathname === link.href ? 'text-[#2563eb]' : 'text-slate-400 hover:text-slate-900 underline-offset-8'}`}
              >
                {link.name}
                <span className={`absolute -bottom-0 left-0 w-full h-0.5 bg-[#2563eb] transition-all duration-500 origin-left ${pathname === link.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100 opacity-30 shadow-2xl'}`} />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {/* WhatsApp CTA - Matching Screenshot */}
            <a 
              href="https://wa.me/254723531085" 
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 bg-[#22c55e] text-white px-6 py-3 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-green-600 shadow-lg shadow-green-200 transition-all hover:-translate-y-0.5 active:scale-95"
            >
              <span className="material-symbols-outlined text-sm">chat</span>
              WhatsApp
            </a>

            {/* Book Now - Matching Screenshot Orange */}
            <Link 
              href="/contact" 
              className="bg-[#f97316] text-white px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-orange-600 shadow-lg shadow-orange-200 transition-all hover:-translate-y-0.5 active:scale-95 flex items-center gap-2"
            >
              Book Now
            </Link>

            {/* Mobile Menu Toggle */}
            <button className="lg:hidden w-10 h-10 flex items-center justify-center text-slate-900">
               <span className="material-symbols-outlined font-black">menu</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
