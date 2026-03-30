import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const PRICING_TIERS = [
  {
    title: "RESIDENTIAL",
    subtitle: "Apartment & Home Cleaning",
    price: "2,500",
    features: [
      "Top-to-bottom dusting",
      "Full kitchen sanitization",
      "Bathroom deep clean",
      "Vacuuming & Mopping",
      "Professional Equipment"
    ],
    highlight: false
  },
  {
    title: "FUMIGATION",
    subtitle: "Expert Pest Management",
    price: "8,500",
    features: [
      "Cockroach & Bedbug treatment",
      "Ants & Termite control",
      "Eco-friendly safety chemicals",
      "Service Warranty included",
      "Post-treatment report"
    ],
    highlight: true
  },
  {
    title: "SOFA & CARPET",
    subtitle: "Upholstery Care",
    price: "3,500",
    features: [
      "Deep extraction cleaning",
      "Stain & Odor removal",
      "Steam sanitization",
      "Multi-fabric safety",
      "Quick-dry technology"
    ],
    highlight: false
  }
];

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-body items-stretch">
      <Navbar />
      
      <main className="flex-grow pt-40 pb-40 px-6 md:px-10 max-w-7xl mx-auto w-full animate-in fade-in duration-700">
        <header className="text-center mb-32 space-y-8 max-w-3xl mx-auto">
          <span className="text-[#2563eb] font-black text-xs uppercase tracking-widest italic border border-[#2563eb]/20 px-6 py-2 rounded-full">
            Transparent Service Rates
          </span>
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-none">
            Service Pricing.
          </h1>
          <p className="text-xl text-slate-500 font-medium leading-relaxed">
            Premium hygiene shouldn&apos;t be a mystery. Browse our standardized rates for leading Nairobi services managed from our BBS Mall hub.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 items-stretch">
          {PRICING_TIERS.map((tier, i) => (
            <div key={tier.title} className={`p-16 rounded-[4rem] flex flex-col justify-between space-y-12 transition-all duration-700 shadow-xl hover:shadow-2xl hover:scale-105 ${tier.highlight ? 'bg-[#2563eb] text-white ring-8 ring-[#2563eb]/5' : 'bg-white text-slate-900 border border-slate-100'}`}>
               <div className="space-y-6">
                  <div className="space-y-2">
                    <p className={`text-[10px] font-black uppercase tracking-widest ${tier.highlight ? 'text-white/50' : 'text-[#2563eb]'}`}>{tier.title}</p>
                    <h3 className="text-3xl font-black tracking-tight">{tier.subtitle}</h3>
                  </div>
                  <div className="flex items-baseline gap-2 pt-6">
                    <span className="text-xl font-bold italic">KSh</span>
                    <span className="text-7xl font-black tracking-tighter">{tier.price}</span>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${tier.highlight ? 'text-white/40' : 'text-slate-400'}`}>/ starting</span>
                  </div>
               </div>

               <ul className="space-y-6 border-t pt-10 border-current opacity-60">
                 {tier.features.map(feat => (
                   <li key={feat} className="flex items-center gap-3 text-sm font-bold tracking-tight">
                     <span className="material-symbols-outlined text-lg">check_circle</span>
                     {feat}
                   </li>
                 ))}
               </ul>

               <a href="/contact" className={`w-full py-6 rounded-2xl font-black text-xs uppercase tracking-widest text-center transition-all shadow-xl active:scale-95 ${tier.highlight ? 'bg-white text-[#2563eb] hover:bg-slate-50' : 'bg-[#f97316] text-white hover:bg-orange-600 shadow-orange-100'}`}>
                 Request Quote
               </a>
            </div>
          ))}
        </div>

        {/* Commercial Banner */}
        <div className="mt-32 p-16 bg-slate-900 rounded-[4rem] text-white grid grid-cols-1 lg:grid-cols-2 gap-16 items-center border border-white/5 shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-[#2563eb]/20 blur-[80px] rounded-full pointer-events-none" />
           <div className="space-y-6 relative z-10">
              <h3 className="text-4xl lg:text-7xl font-black tracking-tighter leading-none">Commercial Special Projects.</h3>
              <p className="text-white/50 text-xl font-medium leading-relaxed">Large-scale operations require precision quotes. Our BBS Mall managers specialize in customized cleaning and fumigation contracts for corporate workspaces.</p>
           </div>
           <div className="flex flex-col gap-6 relative z-10 w-full md:w-auto md:ml-auto">
              <a href="/contact" className="bg-[#2563eb] text-white px-12 py-6 rounded-2xl font-black text-xs uppercase tracking-widest text-center hover:bg-blue-600 transition-all shadow-xl shadow-blue-500/10">
                 Consult Operations Hub
              </a>
           </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
