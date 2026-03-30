import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900 font-body">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-40 px-6 md:px-10 max-w-7xl mx-auto w-full animate-in fade-in duration-700">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Info Side */}
          <div className="space-y-12">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 border border-blue-100 px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest font-headline italic">
                Get in Touch
              </span>
              <h1 className="text-5xl lg:text-7xl font-black tracking-tight font-headline text-slate-900 leading-[1.05]">
                How can we<br /> help you today?
              </h1>
              <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-md">
                Whether you have a question about a booking, want to give feedback, or are interested in joining our network, we&apos;re here to help.
              </p>
            </div>
            
            <div className="space-y-6 bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-[30px] rounded-full pointer-events-none" />
               
               <div className="flex items-center gap-6 relative z-10 p-2 rounded-3xl hover:bg-white transition-all duration-300">
                 <div className="w-16 h-16 bg-white shadow-md flex items-center justify-center rounded-2xl text-blue-600 border border-slate-100 flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <span className="material-symbols-outlined text-2xl font-black" style={{ fontVariationSettings: "'FILL' 1" }}>call</span>
                 </div>
                 <div>
                   <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 font-headline">Call Direct</p>
                   <p className="text-xl font-black text-slate-900 font-body">+254 723 531 085</p>
                 </div>
               </div>
               
               <div className="flex items-center gap-6 relative z-10 p-2 rounded-3xl hover:bg-white transition-all duration-300">
                 <div className="w-16 h-16 bg-white shadow-md flex items-center justify-center rounded-2xl text-blue-600 border border-slate-100 flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <span className="material-symbols-outlined text-2xl font-black" style={{ fontVariationSettings: "'FILL' 1" }}>mail</span>
                 </div>
                 <div>
                   <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 font-headline">Email StarDash</p>
                   <p className="text-xl font-black text-slate-900 font-body">nimcaz22@gmail.com</p>
                 </div>
               </div>
               
               <div className="flex items-center gap-6 relative z-10 p-2 rounded-3xl hover:bg-white transition-all duration-300">
                 <div className="w-16 h-16 bg-white shadow-md flex items-center justify-center rounded-2xl text-blue-600 border border-slate-100 flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <span className="material-symbols-outlined text-2xl font-black" style={{ fontVariationSettings: "'FILL' 1" }}>pin_drop</span>
                 </div>
                 <div>
                   <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 font-headline">Office Location</p>
                   <p className="text-xl font-black text-slate-900 font-body">Nairobi, Kenya</p>
                 </div>
               </div>
            </div>

            {/* Support Notice */}
            <div className="flex items-start gap-4 p-8 bg-blue-600/5 rounded-3xl border border-blue-600/10">
               <span className="material-symbols-outlined text-blue-600" style={{ fontVariationSettings: "'FILL' 1" }}>support_agent</span>
               <div className="space-y-1">
                  <p className="text-sm font-black text-slate-900">Direct Operations Support</p>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">Our central hub monitors every project in real-time. If you have an active booking, please log in for faster service matching.</p>
               </div>
            </div>
          </div>
          
          {/* Form Side */}
          <div className="bg-slate-900 p-12 lg:p-14 rounded-[3.5rem] shadow-2xl relative overflow-hidden group">
            {/* Background Orbs */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-600/10 blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-emerald-600/5 blur-[80px] pointer-events-none" />
            
            <div className="relative z-10 space-y-10">
              <div className="space-y-2">
                <h2 className="text-3xl font-black text-white tracking-tight italic">Send a message</h2>
                <p className="text-white/40 text-sm font-medium">Leave your details and our ops team will respond shortly.</p>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/40 font-headline uppercase tracking-[0.3em] px-1">First Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:border-blue-500 focus:bg-white/10 transition-all outline-none text-white font-medium placeholder:text-white/10" 
                      placeholder="John" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/40 font-headline uppercase tracking-[0.3em] px-1">Last Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:border-blue-500 focus:bg-white/10 transition-all outline-none text-white font-medium placeholder:text-white/10" 
                      placeholder="Doe" 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-white/40 font-headline uppercase tracking-[0.3em] px-1">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:border-blue-500 focus:bg-white/10 transition-all outline-none text-white font-medium placeholder:text-white/10" 
                    placeholder="john@example.com" 
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-white/40 font-headline uppercase tracking-[0.3em] px-1">Your Message</label>
                  <textarea 
                    rows={5} 
                    className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:border-blue-500 focus:bg-white/10 transition-all outline-none text-white font-medium resize-none placeholder:text-white/10" 
                    placeholder="Tell us how we can help..." 
                  />
                </div>
                
                <button 
                  type="button" 
                  className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-900/40 hover:bg-blue-500 hover:shadow-blue-500/20 active:scale-[0.98] transition-all text-sm uppercase tracking-[0.3em] font-headline"
                >
                  Confirm Submission
                </button>
              </form>
            </div>
          </div>
          
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
