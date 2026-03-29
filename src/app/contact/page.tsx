import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-surface-container-lowest">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Info Side */}
          <div className="space-y-12">
            <div>
              <span className="bg-secondary/10 text-secondary border border-secondary/20 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest font-headline">
                Always Here
              </span>
              <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight font-headline text-primary mt-8 mb-4">
                Let's get in touch.
              </h1>
              <p className="text-xl text-on-surface-variant font-body leading-relaxed max-w-md">
                Questions about a booking? Interested in joining our Nairobi network? Reach out directly.
              </p>
            </div>
            
            <div className="space-y-8 bg-surface-container-low p-10 rounded-[2.5rem] shadow-premium relative overflow-hidden group">
               <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-secondary/10 blur-[40px] group-hover:bg-secondary/30 transition-all duration-700"></div>
               
               <div className="flex items-center gap-6 relative z-10">
                 <div className="w-14 h-14 bg-white shadow-sm flex items-center justify-center rounded-2xl text-secondary border border-outline-variant/10">
                    <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>call</span>
                 </div>
                 <div>
                   <p className="text-sm font-bold uppercase tracking-widest text-on-surface-variant font-headline">Call Us</p>
                   <p className="text-xl font-extrabold text-primary font-body">+254 723 531 085</p>
                 </div>
               </div>
               
               <div className="flex items-center gap-6 relative z-10">
                 <div className="w-14 h-14 bg-white shadow-sm flex items-center justify-center rounded-2xl text-secondary border border-outline-variant/10">
                    <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>mail</span>
                 </div>
                 <div>
                   <p className="text-sm font-bold uppercase tracking-widest text-on-surface-variant font-headline">Email Direct</p>
                   <p className="text-xl font-extrabold text-primary font-body">nimcaz22@gmail.com</p>
                 </div>
               </div>
               
               <div className="flex items-center gap-6 relative z-10">
                 <div className="w-14 h-14 bg-white shadow-sm flex items-center justify-center rounded-2xl text-secondary border border-outline-variant/10">
                    <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>pin_drop</span>
                 </div>
                 <div>
                   <p className="text-sm font-bold uppercase tracking-widest text-on-surface-variant font-headline">Headquarters</p>
                   <p className="text-xl font-extrabold text-primary font-body">Nairobi, Kenya</p>
                 </div>
               </div>
            </div>
          </div>
          
          {/* Form Side */}
          <div className="bg-white p-12 rounded-[3.5rem] shadow-premium border border-outline-variant/10">
            <h2 className="text-3xl font-bold font-headline text-primary mb-8">Send a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-on-surface-variant font-headline uppercase tracking-wide px-1">First Name</label>
                  <input type="text" className="w-full bg-surface-container-low px-6 py-4 rounded-xl border border-transparent focus:border-secondary focus:bg-white transition-all outline-none font-body" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-on-surface-variant font-headline uppercase tracking-wide px-1">Last Name</label>
                  <input type="text" className="w-full bg-surface-container-low px-6 py-4 rounded-xl border border-transparent focus:border-secondary focus:bg-white transition-all outline-none font-body" placeholder="Doe" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-on-surface-variant font-headline uppercase tracking-wide px-1">Email Address</label>
                <input type="email" className="w-full bg-surface-container-low px-6 py-4 rounded-xl border border-transparent focus:border-secondary focus:bg-white transition-all outline-none font-body" placeholder="john@example.com" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-on-surface-variant font-headline uppercase tracking-wide px-1">Message</label>
                <textarea rows={5} className="w-full bg-surface-container-low px-6 py-4 rounded-xl border border-transparent focus:border-secondary focus:bg-white transition-all outline-none font-body resize-none" placeholder="How can we help you?" />
              </div>
              
              <button type="button" className="w-full bg-primary text-white font-extrabold font-headline py-5 rounded-xl shadow-premium hover:shadow-xl active:scale-95 transition-all text-lg mt-4">
                Send Message
              </button>
            </form>
          </div>
          
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
