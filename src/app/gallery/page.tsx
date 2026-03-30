import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const GALLERY_IMAGES = [
  { url: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2670&auto=format&fit=crop", title: "Residential Deep Clean" },
  { url: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=2574&auto=format&fit=crop", title: "Office Sanitation" },
  { url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2670&auto=format&fit=crop", title: "Hotel Hygiene" },
  { url: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?q=80&w=2670&auto=format&fit=crop", title: "Fumigation Protocol" },
  { url: "https://images.unsplash.com/photo-1563453392212-326f5e854473?q=80&w=2670&auto=format&fit=crop", title: "Upholstery Care" },
  { url: "https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?q=80&w=2574&auto=format&fit=crop", title: "Construction Cleanup" },
];

export default function GalleryPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900 font-body">
      <Navbar />
      
      <main className="flex-grow pt-40 pb-40 px-10 max-w-7xl mx-auto w-full">
        <header className="text-center mb-32 space-y-8 max-w-3xl mx-auto">
          <span className="text-[#2563eb] font-black text-xs uppercase tracking-widest italic border border-[#2563eb]/20 px-6 py-2 rounded-full">
            Our Work in Action
          </span>
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-none">
            Project Gallery.
          </h1>
          <p className="text-xl text-slate-500 font-medium leading-relaxed">
            Witness the StarDash standard. Real results from residential and commercial projects managed by our BBS Mall operations team.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {GALLERY_IMAGES.map((item, i) => (
            <div key={i} className="group relative aspect-[4/5] overflow-hidden rounded-[3rem] shadow-xl hover:shadow-2xl transition-all duration-700 bg-slate-100">
               <img 
                 src={item.url} 
                 alt={item.title} 
                 className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100"
               />
               <div className="absolute inset-x-8 bottom-8 bg-white/90 backdrop-blur-3xl p-8 rounded-[2.5rem] translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-2xl">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#2563eb] mb-2">Service Excellence</p>
                  <h4 className="text-2xl font-black text-slate-900 tracking-tight">{item.title}</h4>
               </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
