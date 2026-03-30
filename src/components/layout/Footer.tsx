import React from 'react';
import Link from 'next/link';
import Logo from '@/components/ui/Logo';

const Footer = () => {
  const serviceAreas = [
    "Kilimani", "Westlands", "Eastleigh", "Garden City", "Muthaiga", "Karen", 
    "Lavington", "Parklands", "Kileleshwa", "South C", "Pangani"
  ];

  const socialLinks = [
    { label: 'Facebook', href: 'https://facebook.com/stardash', icon: 'facebook' },
    { label: 'Instagram', href: 'https://instagram.com/geelbariisan_', icon: 'photo_camera' },
    { label: 'Twitter', href: 'https://twitter.com/stardash', icon: 'share' },
    { label: 'LinkedIn', href: 'https://linkedin.com/company/stardash', icon: 'work' },
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
                className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-500 hover:bg-[#2563eb] hover:text-white transition-all duration-300"
              >
                <span className="material-symbols-outlined text-lg">{platform.icon}</span>
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
