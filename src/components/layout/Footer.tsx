import React from 'react';
import Link from 'next/link';
import Logo from '@/components/ui/Logo';

const Footer = () => {
  return (
    <footer className="bg-slate-900 w-full pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-12 font-body text-sm leading-relaxed">
        <div className="space-y-6">
          <Logo isDark className="scale-75 origin-left" />
          <p className="text-slate-400 font-medium">
            Revolutionizing home care in Nairobi with professional, vetted specialists and fully managed service delivery.
          </p>
          <div className="flex gap-3">
            {['facebook', 'twitter', 'instagram'].map(platform => (
              <a key={platform} href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
                <span className="material-symbols-outlined text-lg">public</span>
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="text-white font-black text-sm uppercase tracking-widest">Services</h4>
          <ul className="space-y-3">
            <li><Link href="/services" className="text-slate-400 hover:text-white transition-colors">House Cleaning</Link></li>
            <li><Link href="/services" className="text-slate-400 hover:text-white transition-colors">Laundry Service</Link></li>
            <li><Link href="/services" className="text-slate-400 hover:text-white transition-colors">Sofa Cleaning</Link></li>
            <li><Link href="/services" className="text-slate-400 hover:text-white transition-colors">Security Services</Link></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-white font-black text-sm uppercase tracking-widest">Company</h4>
          <ul className="space-y-3">
            <li><Link href="/about" className="text-slate-400 hover:text-white transition-colors">Our Story</Link></li>
            <li><Link href="/contact" className="text-slate-400 hover:text-white transition-colors">Contact Us</Link></li>
            <li><Link href="/signup" className="text-slate-400 hover:text-white transition-colors">Get Started</Link></li>
            <li><Link href="/login?type=admin" className="text-slate-400 hover:text-white transition-colors">Admin Portal</Link></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-white font-black text-sm uppercase tracking-widest">Nairobi HQ</h4>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
               <span className="material-symbols-outlined text-blue-500 text-lg">pin_drop</span>
               <p className="text-slate-400">Serving Premium Districts: Kilimani, Kileleshwa, Westlands, Lavington & Karen.</p>
            </div>
            <div className="flex items-center gap-3">
               <span className="material-symbols-outlined text-blue-500 text-lg">call</span>
               <p className="text-slate-400">+254 723 531 085</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-slate-500 text-xs font-medium">© 2024 StarDash Premium Home Services. All rights reserved.</p>
        <div className="flex gap-8">
          <Link href="/privacy" className="text-slate-400 hover:text-white text-xs font-medium">Privacy Policy</Link>
          <Link href="/terms" className="text-slate-400 hover:text-white text-xs font-medium">Terms of Service</Link>
          <Link href="/contact" className="text-slate-400 hover:text-white text-xs font-medium">Support</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
