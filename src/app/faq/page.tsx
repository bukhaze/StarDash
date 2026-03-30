'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const FAQ_ITEMS = [
  {
    q: "What areas in Nairobi do you serve?",
    a: "We serve all areas within Nairobi and its environs, including Westlands, Kilimani, Karen, Lang'ata, Eastleigh, South B/C, Parklands, Lavington, Kileleshwa, and more. For locations outside Nairobi, please contact us for availability and any additional transport costs."
  },
  {
    q: "Are your cleaning products safe for children and pets?",
    a: "Yes, we prioritize the safety of your family. We use eco-friendly and non-toxic cleaning products whenever possible. For fumigation, we use high-grade chemicals that are safe for residential use once the recommended drying time has passed."
  },
  {
    q: "How long does a typical cleaning session take?",
    a: "A standard apartment cleaning usually takes 4-6 hours, while larger homes or deep cleaning services may take a full day. Our BBS Mall managers will provide a precise estimate based on your specific requirements."
  },
  {
    q: "Do I need to be home during the cleaning?",
    a: "It is not mandatory for you to be present. Many of our clients provide access and go about their day. However, we recommend being there for the initial walkthrough or at the end to ensure complete satisfaction."
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept M-Pesa (Till Number), Bank Transfers, and Cash. Payments are typically settled once the service is completed to your satisfaction."
  },
  {
    q: "How soon can I book a cleaning service?",
    a: "We recommend booking at least 24-48 hours in advance. However, we do offer same-day service for emergency requests depending on crew availability from our BBS Mall hub."
  },
  {
    q: "Do you bring your own equipment and supplies?",
    a: "Yes, our StarDash teams arrive fully equipped with all necessary cleaning detergents, vacuum cleaners, mops, and specialized fumigation tools."
  },
  {
    q: "What if I'm not satisfied with the cleaning?",
    a: "Your satisfaction is our priority. If you're not happy with any aspect of our service, notify us within 24 hours, and we will send a team back to rectify the issue free of charge."
  }
];

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900 font-body items-stretch">
      <Navbar />
      
      <main className="flex-grow pt-40 pb-40 px-6 md:px-10 max-w-5xl mx-auto w-full animate-in fade-in duration-700">
        <header className="text-center mb-24 space-y-4">
           <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter">Frequently Asked Questions</h1>
           <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
             Got questions? We&apos;ve got answers. Find information about our services, pricing, and policies below.
           </p>
        </header>

        <div className="space-y-4">
           {FAQ_ITEMS.map((item, i) => (
             <div 
               key={i} 
               className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all"
             >
                <button 
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors group"
                >
                  <span className={`text-base font-bold tracking-tight transition-colors ${openIndex === i ? 'text-[#2563eb]' : 'text-slate-700'}`}>
                    {item.q}
                  </span>
                  <span className={`material-symbols-outlined transition-transform duration-300 ${openIndex === i ? 'rotate-180 text-[#2563eb]' : 'text-slate-300 group-hover:text-slate-500'}`}>
                    expand_more
                  </span>
                </button>
                <div 
                  className={`transition-all duration-300 ease-in-out ${openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="p-6 pt-0 text-slate-500 font-medium leading-relaxed border-t border-slate-50/50">
                    {item.a}
                  </div>
                </div>
             </div>
           ))}
        </div>

        <div className="mt-32 p-16 bg-[#2563eb] rounded-[4rem] text-white text-center space-y-8 shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full pointer-events-none" />
           <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50">Still Have Questions?</p>
           <h3 className="text-4xl lg:text-7xl font-black tracking-tighter">Contact Our Office.</h3>
           <p className="text-xl text-white/70 max-w-lg mx-auto font-medium leading-relaxed">Our manage specialists at BBS Mall are standing by to explain our protocols in detail.</p>
           <a href={`tel:+254 723 531 085`} className="inline-flex items-center gap-4 bg-white text-[#2563eb] px-12 py-5 rounded-2xl font-black shadow-2xl hover:scale-105 transition-all text-sm uppercase tracking-widest active:scale-95">
              Call BBS Mall Office
              <span className="material-symbols-outlined text-base">call</span>
           </a>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQPage;
