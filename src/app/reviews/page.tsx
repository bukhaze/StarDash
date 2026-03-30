import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const REVIEWS = [
  {
    name: "Amina J.",
    location: "Kilimani",
    rating: 5,
    text: "StarDash provided an exceptional deep cleaning service for my apartment. Their attention to detail in the kitchen and bathrooms was stunning. Highly recommended for busy Nairobi professionals."
  },
  {
    name: "David O.",
    location: "Westlands",
    rating: 5,
    text: "The fumigation service was incredibly professional. They addressed a massive cockroach problem and provided a full safety briefing. I feel much safer in my office now."
  },
  {
    name: "Mercy K.",
    location: "Eastleigh",
    rating: 4,
    text: "Great experience with their upholstery cleaning. My sofa looks brand new after years of stains. The team from BBS Mall was on time and very efficient."
  },
  {
    name: "John S.",
    location: "Karen",
    rating: 5,
    text: "Consistently the best cleaning service we've used. Their managed oversight ensures every technician follows the same high standard every time. Worth every shilling."
  }
];

export default function ReviewsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900 font-body items-stretch">
      <Navbar />
      
      <main className="flex-grow pt-40 pb-40 px-10 max-w-7xl mx-auto w-full">
        <header className="text-center mb-32 space-y-8 max-w-3xl mx-auto">
          <span className="text-[#2563eb] font-black text-xs uppercase tracking-widest italic border border-[#2563eb]/20 px-6 py-2 rounded-full">
             Customer Testimonials
          </span>
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-none">
             Real Reviews.
          </h1>
          <p className="text-xl text-slate-500 font-medium leading-relaxed">
            See why over 500+ homes and businesses in Nairobi trust StarDash for their cleaning and fumigation needs. Managed from our BBS Mall hub.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
          {REVIEWS.map((review, i) => (
            <div key={review.name} className="p-16 bg-slate-50 rounded-[4rem] border border-slate-100 shadow-sm space-y-8 hover:bg-white hover:shadow-2xl hover:scale-105 transition-all duration-700 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#2563eb]/5 blur-[60px] rounded-full pointer-events-none" />
               <div className="flex items-center gap-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`material-symbols-outlined text-lg ${i < review.rating ? 'text-orange-500' : 'text-slate-200'}`} style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  ))}
               </div>
               <p className="text-2xl font-black text-slate-900 tracking-tight leading-relaxed italic">
                 &quot;{review.text}&quot;
               </p>
               <div className="flex items-center gap-6 pt-5 bg-transparent border-t border-slate-100">
                  <div className="w-14 h-14 bg-[#2563eb] text-white rounded-2xl flex items-center justify-center font-black text-xs shadow-xl">
                    {review.name.charAt(0)}
                  </div>
                  <div className="space-y-1">
                    <p className="text-xl font-bold text-slate-900">{review.name}</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#2563eb]">{review.location} Operations</p>
                  </div>
               </div>
            </div>
          ))}
        </div>

        <div className="mt-32 p-16 bg-slate-900 rounded-[4rem] text-white text-center space-y-10 border border-white/5 shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-64 h-64 bg-[#2563eb]/20 blur-[80px] rounded-full pointer-events-none" />
           <div className="space-y-4">
              <h3 className="text-4xl lg:text-7xl font-black tracking-tighter leading-none mb-8">Ready for a spotless space?</h3>
              <p className="text-white/50 text-xl font-medium leading-relaxed max-w-lg mx-auto">Join our long list of satisfied Nairobi clients and experience our managed professional hygiene rituals.</p>
           </div>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a href="/contact" className="bg-[#2563eb] text-white px-12 py-6 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-[#2563eb]/10">
                 Book Now
              </a>
              <a href={`tel:+254 723 531 085`} className="bg-transparent border border-white text-white px-12 py-6 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all">
                 Call BBS Mall HQ
              </a>
           </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
