import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900 font-body">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-slate-900 pt-40 pb-32 px-10 text-center relative overflow-hidden">
          {/* Background Decorative */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-400/10 blur-[120px] pointer-events-none" />
          
          <div className="max-w-4xl mx-auto relative z-10 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <span className="inline-flex items-center gap-2 bg-white/10 text-white/80 border border-white/20 px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest font-headline italic">
              Our Mission
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tight">
              A higher standard<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300 underline underline-offset-[12px] decoration-blue-500/30">for Nairobi homes.</span>
            </h1>
            <p className="text-xl text-white/50 leading-relaxed max-w-2xl mx-auto font-medium">
              StarDash was established to bridge the gap between busy homeowners and professional, fully vetted service specialists. We don&apos;t just connect you — we manage the process.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-24 px-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="relative group">
             <div className="aspect-[4/5] bg-slate-100 rounded-[3rem] overflow-hidden shadow-2xl relative">
                <img 
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2670&auto=format&fit=crop" 
                  alt="Founder and operations" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
             </div>
             {/* Dynamic Badge */}
             <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-50 space-y-2 max-w-xs group-hover:-translate-y-2 transition-transform duration-500">
                <p className="text-blue-600 font-black text-xs uppercase tracking-widest italic">Operations Hub</p>
                <h4 className="text-xl font-black text-slate-900 leading-tight">Managed Care Protocols</h4>
                <p className="text-slate-400 text-xs font-medium leading-relaxed">Every specialist is vetted through our 12-point security and quality protocol.</p>
             </div>
          </div>
          
          <div className="space-y-10 animate-in fade-in slide-in-from-right-8 duration-700 delay-200">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight italic">Founded in Nairobi,<br />built for excellence.</h2>
              <div className="w-20 h-2 bg-blue-600 rounded-full" />
            </div>
            
            <div className="space-y-6 text-lg text-slate-500 font-medium leading-relaxed font-body">
              <p>
                Nairobi is a fast-paced city, and finding reliable home services shouldn&apos;t be a second job. StarDash was founded by <strong>Nimca Abdirashid</strong> to transform how premium home services are delivered.
              </p>
              <p>
                Unlike generic marketplaces where you're on your own, StarDash takes full responsibility. We manage the request, assign the specialist, and monitor the quality until the job is done perfectly.
              </p>
              <p>
                Our vision is to provide every household in Nairobi with an "estate identity" — a direct line to elite care for their cleaning, laundry, and security needs.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-12 pt-10 border-t border-slate-50">
               <div>
                  <h4 className="text-5xl font-black text-blue-600 font-headline italic tracking-tighter">500+</h4>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mt-3">Managed Jobs</p>
               </div>
               <div>
                  <h4 className="text-5xl font-black text-blue-600 font-headline italic tracking-tighter">50+</h4>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mt-3">Vetted Pros</p>
               </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-slate-50 py-24 px-10">
          <div className="max-w-7xl mx-auto">
             <div className="text-center mb-16 space-y-4">
                <p className="text-blue-600 font-black text-xs uppercase tracking-widest italic">Core Values</p>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">The StarDash Promise</h2>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { icon: 'handshake', title: 'Managed Trust', desc: 'We take full responsibility for every service delivered. You\'re never on your own.' },
                  { icon: 'verified', title: 'Elite Vetting', desc: 'Specialists pass rigorous background checks and quality testing before joining.' },
                  { icon: 'verified_user', title: 'Security First', desc: 'Your home is your sanctuary. We treat it with the absolute highest security protocols.' }
                ].map((val, i) => (
                  <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6 group hover:shadow-xl transition-all duration-500">
                    <div className="w-16 h-16 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                       <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>{val.icon}</span>
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">{val.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed font-medium">{val.desc}</p>
                  </div>
                ))}
             </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="relative py-24 px-10 text-center overflow-hidden bg-white">
          <div className="max-w-3xl mx-auto space-y-8 relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Ready to experience<br />StarDash?</h2>
            <p className="text-slate-500 text-lg font-medium">Join the growing community of Nairobi homeowners who trust us for their home care needs.</p>
            <Link href="/signup" className="inline-flex items-center justify-center gap-4 bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-blue-700 shadow-[0_20px_40px_-10px_rgba(37,99,235,0.3)] hover:shadow-blue-300 transition-all active:scale-95">
              Book Your First Service
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-100 -z-0" />
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
