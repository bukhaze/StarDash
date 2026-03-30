import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import TrustBadge from '@/components/ui/TrustBadge';

const ArtisanOnboardingPage = () => {
  const protocolBenefits = [
    { icon: 'military_tech', title: 'Elite Status', description: 'Join the top 1% of Nairobi artisan professionals in our strictly managed network.' },
    { icon: 'hub', title: 'Managed Dispatch', description: 'Focus on your craft. Our central operations team handles all triage and intake logistics.' },
    { icon: 'shield_with_heart', title: 'Full Protocol Support', description: 'Every deployment is backed by StarDash administrative protection and high-level support.' },
  ];

  return (
    <div className="flex flex-col min-h-screen text-slate-900 font-body items-stretch bg-surface">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-40 px-8 overflow-hidden">
        {/* Managed Network Hero */}
        <section className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-32">
          <div className="space-y-12 relative z-10">
            <div className="flex items-center gap-3">
               <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-on-surface-variant font-headline opacity-60 italic">Specialist In-take</span>
            </div>
            <h1 className="text-6xl lg:text-8xl font-black tracking-tighter text-slate-900 leading-[0.9] font-headline lowercase first-letter:uppercase italic">
              Nairobi's elite <br/><span className="text-secondary">Artisan Network.</span>
            </h1>
            <p className="text-xl md:text-2xl text-on-surface-variant/70 font-medium leading-relaxed max-w-xl">
              StarDash is a managed dispatch terminal for the city's finest home service specialists. We strictly select elite partners for our high-fidelity residence care protocol.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <button className="bg-slate-900 text-white px-12 py-6 rounded-3xl font-black font-headline text-[10px] uppercase tracking-[0.4em] shadow-xl hover:scale-[1.05] active:scale-95 transition-all text-center">
                Submit Signal Key
              </button>
              <button className="bg-white border-2 border-slate-100 text-slate-900 px-12 py-6 rounded-3xl font-black font-headline text-[10px] uppercase tracking-[0.4em] hover:bg-slate-50 transition-all text-center">
                Protocol Overview
              </button>
            </div>
            
            <div className="flex items-center gap-8 pt-12 border-t border-outline-variant/5">
               <div className="flex -space-x-6">
                 {[1,2,3,4].map(idx => (
                    <div key={idx} className="w-14 h-14 rounded-full border-4 border-white bg-slate-100 overflow-hidden shadow-premium transition-transform hover:scale-110 relative z-[10]">
                       <img src={`https://i.pravatar.cc/150?u=${idx + 10}`} alt="Specialist" className="w-full h-full object-cover grayscale" />
                    </div>
                 ))}
                 <div className="w-14 h-14 rounded-full border-4 border-white bg-secondary text-white flex items-center justify-center font-black text-[10px] uppercase tracking-widest relative z-[20] shadow-xl">+250</div>
               </div>
               <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest font-headline">Managed Network Nodes</p>
                  <p className="text-[9px] font-bold text-on-surface-variant/40 uppercase tracking-[0.2em]">Verified Specialist Pool</p>
               </div>
            </div>
          </div>
          
          <div className="relative group">
            <div className="aspect-[4/5] rounded-[5rem] overflow-hidden shadow-[0_64px_128px_-16px_rgba(0,0,0,0.25)] border-[16px] border-white group-hover:scale-[1.02] transition-transform duration-1000 relative z-10">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKnH4N6AIAQ0rDEH5Qt3nzcVo06uYFhnG-CiJpYCzUFAJiQ81g10ckDZmkelShFBppqTvLm8fuHfwHBMPSMFULmRp9DUQt9F0CvIa4I4EU1JvXJwjmflvIxgkovTC48fDi1FteCVEv2WUHS_swqC7RnTfRCk1AkCaf3Dq1Nte7ShrYjtX5mYDWBa5oVloov444He-Xf0rxOBGDL0jLF0RhC75xPXow0owedQ5XOITcFiMZ50bh9TQiSNAqYnm7Rnq56Oo0Qwy0BZw" alt="Elite Pro" className="w-full h-full object-cover saturate-[0.7] group-hover:saturate-100 transition-all duration-1000" />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-slate-900 text-white p-12 rounded-[3.5rem] shadow-2xl z-20 space-y-4 animate-bounce-slow max-w-[280px]">
               <span className="material-symbols-outlined text-4xl font-black text-secondary">verified</span>
               <p className="text-[11px] font-black uppercase tracking-[0.2em] font-headline leading-relaxed text-white/60">"The StarDash managed system allows me to focus purely on my craftsmanship while the hub handles all the logistics."</p>
            </div>
          </div>
        </section>

        {/* Managed Network Protocol */}
        <section className="max-w-[1400px] mx-auto py-32 border-y border-outline-variant/5">
          <div className="text-center mb-24 space-y-6">
            <div className="flex items-center justify-center gap-3">
               <span className="w-2 h-2 rounded-full bg-secondary"></span>
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-on-surface-variant font-headline italic">Why Apply?</span>
            </div>
            <h2 className="text-6xl font-black tracking-tighter text-slate-900 font-headline italic lowercase first-letter:uppercase">Network Advantages</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            {protocolBenefits.map(benefit => (
              <div key={benefit.title} className="space-y-6 group">
                 <div className="w-16 h-16 rounded-[2rem] bg-slate-50 flex items-center justify-center text-primary shadow-inner transition-transform group-hover:scale-110">
                    <span className="material-symbols-outlined text-2xl font-black italic">{benefit.icon}</span>
                 </div>
                 <div className="space-y-4">
                    <h4 className="text-xl font-black font-headline tracking-tight leading-loose uppercase italic">{benefit.title}</h4>
                    <p className="text-on-surface-variant font-medium leading-loose text-sm opacity-60">{benefit.description}</p>
                 </div>
              </div>
            ))}
          </div>
        </section>

        {/* The In-take Cycle */}
        <section className="max-w-[1400px] mx-auto py-32 text-center">
           <div className="mb-24 space-y-6">
              <span className="text-secondary font-black tracking-[0.4em] uppercase text-[10px] italic font-headline">Operational Step-thru</span>
              <h2 className="text-6xl font-black tracking-tighter text-slate-900 font-headline italic lowercase first-letter:uppercase">Access Onboarding Protocol</h2>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-4 gap-16 relative">
             <div className="hidden md:block absolute top-[40%] left-[5%] right-[5%] h-[1px] bg-slate-100 -z-10"></div>
             {[
               { id: 1, label: 'Signal Intent', desc: 'Submit your technical portfolio and specialized artisan vectors.', icon: 'sensors' },
               { id: 2, label: 'Verification Hub', desc: 'Mandatory profile audit, criminal record scan, and skill signal test.', icon: 'verified_user' },
               { id: 3, label: 'Hub Onboarding', desc: 'Managed network training and operational protocol briefing.', icon: 'terminal' },
               { id: 4, label: 'Dispatch Access', desc: 'Receive assigned service signals from the central command center.', icon: 'hub' }
             ].map(s => (
               <div key={s.id} className="flex flex-col items-center group">
                 <div className="w-24 h-24 rounded-[3.5rem] bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all duration-700 shadow-premium mb-8 relative italic">
                    <span className="material-symbols-outlined text-3xl font-black">{s.icon}</span>
                    <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-secondary text-white text-[10px] font-black border-4 border-white flex items-center justify-center italic">{s.id}</div>
                 </div>
                 <h3 className="font-black text-[10px] font-headline uppercase tracking-[0.3em] text-slate-900 mb-4">{s.label}</h3>
                 <p className="text-[11px] font-bold text-on-surface-variant/40 uppercase tracking-[0.2em] leading-relaxed max-w-[180px]">{s.desc}</p>
               </div>
             ))}
           </div>
        </section>

        {/* Final Access Banner */}
        <section className="max-w-[1400px] mx-auto">
          <div className="bg-slate-900 rounded-[5rem] p-24 md:p-32 text-center text-white relative overflow-hidden shadow-[0_64px_128px_-16px_rgba(0,0,0,0.5)]">
             <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none scale-105 group-hover:rotate-3 transition-transform duration-1000">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-gxCRsK2sz_xsBAmqGUkk56kEkQ7iGeqRnvtSTve6cYx5tNctR8rGd0eqx2KQgEm8pOl7UVmmx2C9afAbTWKUBrg1_P_rS-A79D_BTHIOLzSHnbgNa37yihC_sjGNTZNnwqYOikFWu-0Dl9dFffC85nfT3v-pzhsxLTgEmct7bxAP5nux9hSZiq_YyIzwS-grXQU6ZanZlf4KqrsPuj11i4lTouPjndau3AbYocMi0XLS9dsEJY1cMH3Wx6kW-EiXGz21DR_a7E" className="w-full h-full object-cover" alt="Join the network" />
             </div>
             <div className="relative z-10 space-y-12">
               <h2 className="text-5xl md:text-8xl font-black font-headline tracking-tighter italic lowercase first-letter:uppercase leading-none">Apply for <br/>Network Access</h2>
               <p className="text-xl text-white/40 font-body max-w-2xl mx-auto italic">Join Nairobi's most prestigious managed artisan network today and revolutionize your professional dispatch lifecycle.</p>
               <button className="bg-white text-slate-900 px-16 py-7 rounded-[2.5rem] font-black font-headline text-[10px] uppercase tracking-[0.4em] shadow-2xl hover:bg-secondary hover:text-white transition-all scale-[1.05] active:scale-95">
                 Initialize Access Signal
               </button>
             </div>
             <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px]"></div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ArtisanOnboardingPage;
