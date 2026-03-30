import React from 'react';
import Link from 'next/link';
import Logo from '@/components/ui/Logo';

const Footer = () => {
  const serviceAreas = [
    "Kilimani", "Westlands", "Eastleigh", "Garden City", "Muthaiga", "Karen", 
    "Lavington", "Parklands", "Kileleshwa", "South C", "Pangani"
  ];

  const socialLinks = [
    { label: 'Facebook', href: 'https://facebook.com/stardash', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.675 0h-21.35C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z"/>
      </svg>
    ) },
    { label: 'Instagram', href: 'https://instagram.com/geelbariisan_', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ) },
    { label: 'X/Twitter', href: 'https://twitter.com/stardash', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ) },
    { label: 'LinkedIn', href: 'https://linkedin.com/company/stardash', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
    ) },
  ];

  return (
    <footer className="bg-slate-900 w-full pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-10 grid grid-cols-1 lg:grid-cols-4 gap-16 font-body text-sm leading-relaxed">
        
        <div className="space-y-8 col-span-1 lg:col-span-1">
           <div className="flex items-center gap-4 group">
            <div className="w-10 h-10 bg-[#2563eb] rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg">SD</div>
            <span className="font-black text-xl tracking-tight text-white leading-none">StarDash</span>
          </div>
          <p className="text-slate-500 font-medium text-base max-w-xs">
            Nairobi&apos;s leading professional cleaning and fumigation company. Your trusted partner for home, office, and pest control since 2024.
          </p>
          <div className="flex gap-4">
            {socialLinks.map(platform => (
              <a 
                key={platform.label} 
                href={platform.href} 
                target="_blank"
                className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-500 hover:bg-[#2563eb] hover:text-white transition-all duration-300 shadow-xl"
                aria-label={platform.label}
              >
                {platform.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em]">Our Services</h4>
          <ul className="space-y-4">
            <li><Link href="/services" className="text-slate-500 hover:text-white transition-colors font-medium">Residential Cleaning</Link></li>
            <li><Link href="/services" className="text-slate-500 hover:text-white transition-colors font-medium">Office Cleaning</Link></li>
            <li><Link href="/services" className="text-slate-500 hover:text-white transition-colors font-medium">Fumigation & Pest Control</Link></li>
            <li><Link href="/services" className="text-slate-500 hover:text-white transition-colors font-medium">Sofa & Carpet Cleaning</Link></li>
          </ul>
        </div>

        <div className="space-y-8">
          <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em]">Quick Links</h4>
          <ul className="space-y-4">
            <li><Link href="/about" className="text-slate-500 hover:text-white transition-colors font-medium">About StarDash</Link></li>
            <li><Link href="/contact" className="text-slate-500 hover:text-white transition-colors font-medium">Contact Office</Link></li>
            <li><Link href="/login" className="text-slate-500 hover:text-white transition-colors font-medium">Staff Login</Link></li>
            <li><Link href="/login" className="text-slate-500 hover:text-white transition-colors font-medium">Admin Portal</Link></li>
          </ul>
        </div>

        <div className="space-y-8">
          <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em]">Our HQ</h4>
          <div className="space-y-4">
             <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#2563eb] text-lg">location_on</span>
                <p className="text-slate-500 font-medium">BBS Mall, Eastleigh, Nairobi, Kenya</p>
             </div>
             <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#2563eb] text-lg">call</span>
                <p className="text-slate-500 font-medium">+254 723 531 085</p>
             </div>
             <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#2563eb] text-lg">mail</span>
                <p className="text-slate-500 font-medium font-inter">nimcaz22@gmail.com</p>
             </div>
          </div>
          <div className="flex flex-wrap gap-2 pt-4">
            {serviceAreas.map(area => (
              <span key={area} className="text-[10px] font-bold uppercase tracking-widest text-slate-600 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                {area}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-10 mt-32 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
           <p className="text-slate-600 text-xs font-bold uppercase tracking-widest leading-loose">© 2024 StarDash Premium Services · Nairobi Headquarters</p>
           <div className="flex gap-8">
             <Link href="/privacy" className="text-slate-600 hover:text-white text-xs font-bold uppercase tracking-widest transition-all">Privacy</Link>
             <Link href="/terms" className="text-slate-600 hover:text-white text-xs font-bold uppercase tracking-widest transition-all">Terms</Link>
           </div>
        </div>
        <p className="text-slate-700 text-[10px] font-bold uppercase tracking-widest italic border border-white/5 px-4 py-2 rounded-xl">Professional Cleaning & Fumigation</p>
      </div>
    </footer>
  );
};

export default Footer;
