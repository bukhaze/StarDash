import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900 font-body">
      <Navbar />
      
      <main className="flex-grow bg-slate-50">
        {/* Hero Section */}
        <section className="bg-slate-900 pt-48 pb-40 px-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 z-0">
             <img src="https://images.unsplash.com/photo-1556911227-491958bca127?q=80&w=2670&auto=format&fit=crop" className="w-full h-full object-cover opacity-20" alt="Office Cleaning" />
             <div className="absolute inset-0 bg-[#2563eb]/10 backdrop-blur-sm" />
          </div>

          <div className="max-w-4xl mx-auto relative z-10 space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <span className="inline-flex items-center gap-2 bg-white/5 text-[#2563eb] border border-white/10 px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.3em]">
              The StarDash Mission
             </span>
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-tight">
              A higher standard<br />
              <span className="text-[#2563eb] italic">for Nairobi homes.</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto font-medium">
              Since our inception, StarDash has been dedicated to providing professional cleaning and fumigation services with a focus on trust, reliability, and extreme attention to detail.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-32 px-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative group">
             <div className="aspect-[4/5] bg-slate-100 rounded-[3rem] overflow-hidden shadow-2xl relative border border-slate-200">
                <img 
                  src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=2574&auto=format&fit=crop" 
                  alt="Professional Service" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
             </div>
             <div className="absolute -bottom-8 -right-8 bg-[#2563eb] p-12 rounded-[3.5rem] shadow-2xl text-white space-y-3 max-w-xs group-hover:-translate-y-4 transition-transform duration-500">
                <p className="text-white/50 font-bold text-[10px] uppercase tracking-widest">Nairobi HQ</p>
                <h4 className="text-2xl font-bold leading-tight">Located at BBS Mall, Eastleigh</h4>
                <p className="text-white/40 text-xs font-medium leading-relaxed">Centrally located to serve all premium residential and commercial districts.</p>
             </div>
          </div>
          
          <div className="space-y-12 animate-in fade-in slide-in-from-right-8 duration-700">
            <div className="space-y-6 text-center lg:text-left">
              <span className="text-[#2563eb] font-black text-xs uppercase tracking-widest">Our Professionals</span>
              <h2 className="text-5xl font-black text-slate-900 leading-tight tracking-tight">Founded in Nairobi,<br />built for excellence.</h2>
              <div className="w-16 h-2 bg-[#2563eb] rounded-full mx-auto lg:mx-0" />
            </div>
            
            <div className="space-y-8 text-lg text-slate-500 font-medium leading-relaxed font-body">
              <p>
                Nairobi is a city that never stops, and we understand that maintaining a clean home or office can be a second job. StarDash was founded to take that burden off your shoulders.
              </p>
              <p>
                From our offices at <strong>BBS Mall, Eastleigh</strong>, we manage a nationwide network of vetted cleaning and fumigation specialists who are trained to deliver results that meet our rigorous standards.
              </p>
              <p>
                Whether it&apos;s a post-construction deep clean or a regular weekly maintenance, we pride ourselves on being the first choice for homeowners and corporate offices across Nairobi districts.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-12 pt-12 border-t border-slate-200">
               <div className="space-y-2">
                  <h4 className="text-5xl font-black text-slate-900 tracking-tighter">1.2k+</h4>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Bookings</p>
               </div>
               <div className="space-y-2">
                  <h4 className="text-5xl font-black text-slate-900 tracking-tighter">50+</h4>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Professional Staff</p>
               </div>
            </div>
          </div>
        </section>

        {/* Mission and Principles */}
        <section className="bg-white py-32 px-10 border-y border-slate-100">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
             <div className="p-16 rounded-[4rem] bg-slate-900 text-white space-y-8 relative overflow-hidden group">
                <div className="absolute top-[-10%] right-[-10%] w-60 h-60 bg-[#2563eb]/20 blur-[80px] rounded-full" />
                <span className="material-symbols-outlined text-[#2563eb] text-5xl">rocket_launch</span>
                <h3 className="text-4xl font-black tracking-tight">Our Mission</h3>
                <p className="text-xl text-white/50 leading-relaxed font-medium">To provide every Nairobi resident and corporate house with a healthy, sterile, and pristine environment through expert cleaning and fumigation solutions.</p>
             </div>
             
             <div className="p-16 rounded-[4rem] bg-[#2563eb] text-white space-y-8 relative overflow-hidden group">
                <div className="absolute bottom-[-10%] left-[-10%] w-60 h-60 bg-white/10 blur-[80px] rounded-full" />
                <span className="material-symbols-outlined text-white text-5xl">visibility</span>
                <h3 className="text-4xl font-black tracking-tight">Our Vision</h3>
                <p className="text-xl text-white/80 leading-relaxed font-medium">To be the most trusted and recognized name in professional cleaning and pest control in Kenya, setting the standard for excellence and managed professional care.</p>
             </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-32 px-10 text-center bg-slate-50">
          <div className="max-w-3xl mx-auto space-y-12">
            <div className="space-y-6">
               <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">Ready for a cleaner space?</h2>
               <p className="text-slate-500 text-lg font-medium leading-relaxed">Join hundreds of Nairobi homeowners who trust us for their professional cleaning and fumigation needs.</p>
            </div>
            <Link href="/services" className="inline-flex items-center justify-center gap-5 bg-slate-900 text-white px-12 py-5 rounded-[2rem] font-bold text-xs uppercase tracking-widest shadow-2xl hover:bg-slate-800 transition-all active:scale-95">
              Start Your Request
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
