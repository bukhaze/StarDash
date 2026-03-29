import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import TrustBadge from '@/components/ui/TrustBadge';

const BecomeAWorkerPage = () => {
  const benefits = [
    { icon: 'payments', title: 'High Earnings', description: 'Set your own competitive rates and keep 90% of your earnings + 100% of tips.' },
    { icon: 'schedule', title: 'Total Flexibility', description: 'Work when you want, where you want. No minimum hours, no fixed shifts.' },
    { icon: 'shield_person', title: 'Insurance Covered', description: 'Every job is covered by our comprehensive liability insurance for your peace of mind.' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-8 overflow-hidden bg-surface">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="space-y-10 relative z-10">
            <span className="bg-secondary/10 text-secondary border border-secondary/20 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest font-headline">Join the elite network</span>
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-primary leading-tight font-headline">
              Turn your skill into a <br/><span className="text-secondary font-headline">Thriving Business.</span>
            </h1>
            <p className="text-xl text-on-surface-variant font-body leading-relaxed max-w-xl">
              StarDash connects Nairobi's most talented home service professionals with high-end clients. Apply now to start your journey with the market leader.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <button className="bg-primary text-white border-2 border-primary px-12 py-5 rounded-2xl font-bold font-headline text-lg shadow-premium hover:shadow-xl transition-all scale-95 active:scale-90 bg-gradient-to-br from-primary to-primary-container">
                Apply to Join
              </button>
              <button className="bg-white border-2 border-outline-variant/20 text-on-surface px-12 py-5 rounded-2xl font-bold font-headline text-lg hover:border-secondary hover:text-secondary transition-all">
                Learn the Process
              </button>
            </div>
            
            <div className="flex items-center gap-6 pt-10 border-t border-outline-variant/10">
               <div className="flex -space-x-4">
                 {[1,2,3,4].map(idx => (
                   <div key={idx} className="w-12 h-12 rounded-full border-4 border-white bg-slate-200 overflow-hidden shadow-sm">
                     <img src={`https://lh3.googleusercontent.com/aida-public/AB6AXuAVG66K04esVegDZKl9LHH8Q3OIMRJFodR8wmuEa0Dny54y-jt7gC4zqvPsSzmXWLdHkrOSEYluPYreiYXotR-kNz4OYluzQG2SdqntEQLQRzVT-0Pk7luO2lcQNqi7epHoWu0PJLLjGG0DB4u44wMVNtn3pPnv8pQ5uyHr6eonPuCDcp8BYneCHai-Gg82Q4ObOmP5NMWwa4snQbHpZkJHA_vwMJl2UMs6Z2AXx4S2kUXObSaPIgC8Fg1upyYig9EEhkBmA3we5lo`} alt="Worker" />
                   </div>
                 ))}
                 <div className="w-12 h-12 rounded-full border-4 border-white bg-secondary text-white flex items-center justify-center font-bold text-xs">+500</div>
               </div>
               <p className="text-sm font-bold text-on-surface-variant font-headline uppercase tracking-widest leading-none">500+ professionals <br/>earning in Nairobi</p>
            </div>
          </div>
          
          <div className="relative group">
            <div className="absolute top-[-20px] left-[-20px] bg-secondary w-full h-full rounded-[4rem] -z-10 group-hover:scale-105 transition-transform duration-700"></div>
            <div className="aspect-[3/4] rounded-[3.5rem] overflow-hidden shadow-premium">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKnH4N6AIAQ0rDEH5Qt3nzcVo06uYFhnG-CiJpYCzUFAJiQ81g10ckDZmkelShFBppqTvLm8fuHfwHBMPSMFULmRp9DUQt9F0CvIa4I4EU1JvXJwjmflvIxgkovTC48fDi1FteCVEv2WUHS_swqC7RnTfRCk1AkCaf3Dq1Nte7ShrYjtX5mYDWBa5oVloov444He-Xf0rxOBGDL0jLF0RhC75xPXow0owedQ5XOITcFiMZ50bh9TQiSNAqYnm7Rnq56Oo0Qwy0BZw" alt="Pro" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
            </div>
            <div className="absolute bottom-8 right-[-20px] bg-white p-6 rounded-3xl shadow-xl border border-outline-variant/10 max-w-[240px] animate-bounce-slow">
              <div className="flex gap-2 mb-2">
                {[1,2,3,4,5].map(s => <span key={s} className="material-symbols-outlined text-amber-400 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>)}
              </div>
              <p className="text-sm font-bold text-primary font-headline italic">"StarDash changed my life. I finally have the control I always wanted over my career."</p>
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="max-w-7xl mx-auto py-24 mb-24 border-y border-outline-variant/10">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-extrabold tracking-tight text-primary font-headline">Why Partner with StarDash?</h2>
            <p className="text-on-surface-variant font-body max-w-2xl mx-auto">We've built the ultimate platform for high-end home professionals to scale their business with premium domestic logistics.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {benefits.map(benefit => (
              <TrustBadge key={benefit.title} {...benefit} />
            ))}
          </div>
        </section>

        {/* Process Steps */}
        <section className="max-w-7xl mx-auto pb-24 mb-24 text-center">
           <h2 className="text-4xl font-extrabold tracking-tight text-primary font-headline mb-20">Seamless Onboarding</h2>
           <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
             <div className="hidden md:block absolute top-[28%] left-[10%] right-[10%] h-[2px] bg-outline-variant/10 -z-10"></div>
             {[
               { id: 1, label: 'Apply', desc: 'Sumbit your profile and previous work portfolio.', icon: 'edit_note' },
               { id: 2, label: 'Vet', desc: 'Background check and professional skill assessment.', icon: 'verified_user' },
               { id: 3, label: 'Onboard', desc: 'Digital interview and platform training.', icon: 'school' },
               { id: 4, label: 'Earn', desc: 'Start receiving premium bookings in Nairobi.', icon: 'payments' }
             ].map(s => (
               <div key={s.id} className="flex flex-col items-center">
                 <div className="w-20 h-20 rounded-full bg-white border-2 border-outline-variant/20 flex items-center justify-center text-primary group hover:border-secondary hover:bg-secondary hover:text-white transition-all shadow-sm mb-6 relative">
                    <span className="material-symbols-outlined text-3xl">{s.icon}</span>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-white text-xs font-bold border-4 border-white flex items-center justify-center">{s.id}</div>
                 </div>
                 <h3 className="font-bold text-xl font-headline mb-3">{s.label}</h3>
                 <p className="text-sm text-on-surface-variant font-body leading-relaxed">{s.desc}</p>
               </div>
             ))}
           </div>
        </section>

        {/* CTA Banner */}
        <section className="max-w-7xl mx-auto">
          <div className="bg-slate-900 rounded-[3rem] p-16 md:p-24 text-center text-white relative overflow-hidden shadow-premium">
             <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-gxCRsK2sz_xsBAmqGUkk56kEkQ7iGeqRnvtSTve6cYx5tNctR8rGd0eqx2KQgEm8pOl7UVmmx2C9afAbTWKUBrg1_P_rS-A79D_BTHIOLzSHnbgNa37yihC_sjGNTZNnwqYOikFWu-0Dl9dFffC85nfT3v-pzhsxLTgEmct7bxAP5nux9hSZiq_YyIzwS-grXQU6ZanZlf4KqrsPuj11i4lTouPjndau3AbYocMi0XLS9dsEJY1cMH3Wx6kW-EiXGz21DR_a7E" className="w-full h-full object-cover" alt="Join us" />
             </div>
             <div className="relative z-10 space-y-10">
               <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight font-headline">Ready to take control?</h2>
               <p className="text-xl text-slate-400 font-body max-w-xl mx-auto">Join StarDash today and become part of Nairobi's most prestigious home services network.</p>
               <button className="bg-secondary text-white px-16 py-6 rounded-2xl font-extrabold font-headline text-lg shadow-xl hover:brightness-110 active:scale-95 transition-all bg-gradient-to-br from-secondary to-[#005047]">
                 Start Application Now
               </button>
             </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default BecomeAWorkerPage;
