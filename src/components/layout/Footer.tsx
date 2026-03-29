import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-[#0A192F] dark:bg-black w-full pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-12 font-inter text-sm leading-relaxed">
        <div className="space-y-6">
          <div className="text-2xl font-bold text-white font-headline">StarDash</div>
          <p className="text-slate-400">
            Revolutionizing home care in Nairobi with elite professionals and seamless digital management. Excellence, delivered.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-secondary hover:text-white transition-all">
              <span className="material-symbols-outlined">public</span>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-secondary hover:text-white transition-all">
              <span className="material-symbols-outlined">share</span>
            </a>
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="text-white font-bold text-lg">Services</h4>
          <ul className="space-y-4">
            <li><Link href="/services/house-cleaning" className="text-slate-400 hover:text-teal-400 transition-colors">House Cleaning</Link></li>
            <li><Link href="/services/laundry" className="text-slate-400 hover:text-teal-400 transition-colors">Laundry Service</Link></li>
            <li><Link href="/services/deep-cleaning" className="text-slate-400 hover:text-teal-400 transition-colors">Deep Cleaning</Link></li>
            <li><Link href="/services/security" className="text-slate-400 hover:text-teal-400 transition-colors">Security Services</Link></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-white font-bold text-lg">Company</h4>
          <ul className="space-y-4">
            <li><Link href="/about" className="text-slate-400 hover:text-teal-400 transition-colors">About Us</Link></li>
            <li><Link href="/careers" className="text-slate-400 hover:text-teal-400 transition-colors">Careers</Link></li>
            <li><Link href="/become-a-worker" className="text-slate-400 hover:text-teal-400 transition-colors">Partner with Us</Link></li>
            <li><Link href="/press" className="text-slate-400 hover:text-teal-400 transition-colors">Press Kit</Link></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-white font-bold text-lg">Support</h4>
          <ul className="space-y-4">
            <li><Link href="/help" className="text-slate-400 hover:text-teal-400 transition-colors">Help Center</Link></li>
            <li><Link href="/contact" className="text-slate-400 hover:text-teal-400 transition-colors">Contact Support</Link></li>
            <li><Link href="/trust-safety" className="text-slate-400 hover:text-teal-400 transition-colors">Trust & Safety</Link></li>
            <li><Link href="/status" className="text-slate-400 hover:text-teal-400 transition-colors">System Status</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-slate-500">© 2024 StarDash Premium Home Services. All rights reserved.</p>
        <div className="flex gap-8">
          <Link href="/privacy" className="text-slate-400 hover:text-teal-400 text-xs">Privacy Policy</Link>
          <Link href="/terms" className="text-slate-400 hover:text-teal-400 text-xs">Terms of Service</Link>
          <Link href="/help" className="text-slate-400 hover:text-teal-400 text-xs">Help Center</Link>
          <Link href="/cookies" className="text-slate-400 hover:text-teal-400 text-xs">Cookies</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
