import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

const SERVICES_DETAILED = [
  {
    title: "Cockroach Control",
    description: "Effective cockroach elimination using safe and eco-friendly treatment methods specialized for Nairobi homes and offices.",
    icon: "bug_report",
    image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?q=80&w=2670&auto=format&fit=crop",
    checklist: ["Gel bait treatment", "Kitchen & cabinet treatment", "Safe for children & pets", "Follow-up inspection"]
  },
  {
    title: "Snake Control & Safe Removal",
    description: "Professional snake removal and prevention services for residential and commercial properties. We ensure safe relocation.",
    icon: "shield",
    image: "https://images.unsplash.com/photo-1549443586-13d28f09072a?q=80&w=2670&auto=format&fit=crop",
    checklist: ["Safe capture & relocation", "Compound inspection", "Entry point sealing", "Preventive treatment"]
  },
  {
    title: "Bedbug Eradication",
    description: "High-intensity heat and chemical treatments to completely eliminate bedbug infestations and their eggs permanently.",
    icon: "pest_control",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2670&auto=format&fit=crop",
    checklist: ["Mattress treatment", "Wall & crack injection", "Egg elimination", "100% success rate"]
  },
  {
    title: "Termite Control",
    description: "Structural protection using specialized soil barriers and baiting systems to stop termite damage to your property.",
    icon: "architecture",
    image: "https://images.unsplash.com/photo-1513584684374-8bdb74838a0f?q=80&w=2670&auto=format&fit=crop",
    checklist: ["Soil barrier treatment", "Foundation injection", "Baiting systems", "Structural audit"]
  },
  {
    title: "Window Exterior Cleaning",
    description: "Exterior window cleaning for high-rise residential and commercial buildings using specialized equipment and non-streak solutions.",
    icon: "stat_minus_1",
    image: "https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?q=80&w=2574&auto=format&fit=crop",
    checklist: ["High-reach cleaning", "Streak-free finish", "Frame & sill cleaning", "Commercial & residential"]
  },
  {
    title: "Oven Deep Clean",
    description: "Thorough oven degreasing and sanitization to restore hygiene and performance. Makes your appliances look and work like new.",
    icon: "cleaning_services",
    image: "https://images.unsplash.com/photo-1556911227-491958bca127?q=80&w=2670&auto=format&fit=crop",
    checklist: ["Grease removal", "Interior scrubbing", "Odor elimination", "Food-safe products"]
  },
  {
    title: "Sofa Set Cleaning",
    description: "Deep upholstery extraction for all fabric types. We remove deep-seated dirt, stains, and allergens from your seating.",
    icon: "weekend",
    image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=2670&auto=format&fit=crop",
    checklist: ["Stain removal", "Odor neutralization", "Fabric protection", "Rapid dry tech"]
  },
  {
    title: "Carpet & Rug Restoration",
    description: "Steam and extraction cleaning for luxury rugs and wall-to-wall carpets. Restores pile and vibrant color.",
    icon: "mop",
    image: "https://images.unsplash.com/photo-1558317374-067df5f15430?q=80&w=2670&auto=format&fit=crop",
    checklist: ["Deep fiber cleaning", "Bacteria elimination", "Fringe detailing", "Industrial dry"]
  },
  {
    title: "Move In / Move Out Cleaning",
    description: "Comprehensive deep cleaning for transitions. We ensure every corner, shelf, and floor is sanitized for new occupants.",
    icon: "vpn_key",
    image: "https://images.unsplash.com/photo-1581578731522-aa0861173663?q=80&w=2670&auto=format&fit=crop",
    checklist: ["Full sanitization", "Cabinet interior detail", "Window ledge clean", "Sanitary bin service"]
  },
  {
    title: "Post-Construction Deep Clean",
    description: "Heavy-duty cleaning for newly built or renovated spaces. We remove cement dust, paint splatters, and construction debris.",
    icon: "construction",
    image: "https://images.unsplash.com/photo-1505798577917-a65157d3320a?q=80&w=2670&auto=format&fit=crop",
    checklist: ["Dust extraction", "Paint removal", "Floor polishing", "Ready-to-use finish"]
  },
  {
    title: "Office Sanitization",
    description: "Bespoke workspace hygiene protocols. We maintain professional environments with scheduled high-standard cleaning.",
    icon: "apartment",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2670&auto=format&fit=crop",
    checklist: ["Keyboard sanitization", "Common area focus", "Waste management", "Flexible scheduling"]
  },
  {
    title: "Mosque & Venue Cleaning",
    description: "Specialized large-venue hygiene for community spaces. We handle high-traffic areas with precision and respect.",
    icon: "mosque",
    image: "https://images.unsplash.com/photo-1563245339-dfc201633f70?q=80&w=2670&auto=format&fit=crop",
    checklist: ["Carpet disinfection", "Ablution area sanitization", "High-traffic protocol", "Managed teams"]
  }
];

const HOW_IT_WORKS = [
  { id: 1, title: "Book Online or Call", desc: "Reach out via our form, WhatsApp, or phone call to our BBS Mall hub." },
  { id: 2, title: "Get a Quote", desc: "We assess your needs and give a transparent, fixed-rate professional quote." },
  { id: 3, title: "We Clean/Fumigate", desc: "Our trained team arrives fully equipped with specialized tools and eco-products." },
  { id: 4, title: "Enjoy Your Space", desc: "Walk into a spotless, pest-free environment with our satisfaction guarantee." }
];

const ServicesPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900 font-body items-stretch">
      <Navbar />
      
      <main className="flex-grow pt-40 md:pt-48 pb-40 w-full animate-in fade-in duration-700">
        
        {/* Header Section */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 mb-32 space-y-4">
           <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter">Our Services</h1>
           <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl">
             Professional cleaning and pest control solutions tailored to your needs from our central StarDash dispatch at BBS Mall.
           </p>
        </section>

        {/* Services Horizontal Rows */}
        <section className="space-y-24 mb-40">
           {SERVICES_DETAILED.map((service, index) => (
             <div key={index} className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className={`space-y-10 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                   <div className="w-16 h-16 bg-[#2563eb]/5 text-[#2563eb] rounded-2xl flex items-center justify-center shadow-sm border border-[#2563eb]/10">
                      <span className="material-symbols-outlined text-3xl font-black">{service.icon}</span>
                   </div>
                   <div className="space-y-6">
                      <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">{service.title}</h2>
                      <p className="text-lg text-slate-500 leading-relaxed font-body font-medium">{service.description}</p>
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                      {service.checklist.map((item, i) => (
                        <div key={i} className="flex items-center gap-3 text-slate-600 font-bold text-sm tracking-tight italic">
                           <div className="w-5 h-5 rounded-full bg-[#22c55e]/10 flex items-center justify-center text-[#22c55e]">
                              <span className="material-symbols-outlined text-[14px]">check</span>
                           </div>
                           {item}
                        </div>
                      ))}
                   </div>

                   <div className="flex flex-wrap gap-4 pt-6">
                      <Link href="/contact" className="bg-[#f97316] text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-orange-600 shadow-xl shadow-orange-100 transition-all active:scale-95">
                         Book This Service
                      </Link>
                      <Link href="/contact" className="border-2 border-slate-200 text-slate-500 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all">
                         Get a Quote
                      </Link>
                   </div>
                </div>

                <div className={`aspect-[16/10] bg-slate-50 rounded-[4rem] overflow-hidden shadow-2xl relative border border-slate-100 group ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                   <img src={service.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-80" alt={service.title} />
                   <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 bg-white/60 backdrop-blur-xl rounded-full flex items-center justify-center text-[#2563eb] shadow-2xl border border-white/20">
                         <span className="material-symbols-outlined text-4xl">{service.icon}</span>
                      </div>
                   </div>
                </div>
             </div>
           ))}
        </section>

        {/* How It Works Section */}
        <section className="bg-slate-50 py-40 border-y border-slate-100">
           <div className="max-w-7xl mx-auto px-6 md:px-10 text-center space-y-24">
              <div className="space-y-6 max-w-2xl mx-auto">
                 <h2 className="text-5xl font-black text-slate-900 tracking-tighter">How It Works</h2>
                 <p className="text-lg text-slate-500 font-medium leading-relaxed font-body">Getting your space cleaned or fumigated is easy with our simple 4-step process ritual.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                 {HOW_IT_WORKS.map((step, i) => (
                   <div key={i} className="relative group">
                      <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 h-full flex flex-col items-center text-center space-y-6">
                         <div className="w-14 h-14 bg-[#2563eb] text-white rounded-full flex items-center justify-center font-black text-xl shadow-xl shadow-blue-100 italic">
                            {step.id}
                         </div>
                         <div className="space-y-4">
                            <h4 className="text-xl font-black text-slate-900 tracking-tight">{step.title}</h4>
                            <p className="text-sm text-slate-500 font-medium leading-relaxed">{step.desc}</p>
                         </div>
                      </div>
                      {i < 3 && (
                        <div className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2 z-10 text-slate-300">
                           <span className="material-symbols-outlined text-3xl">arrow_forward</span>
                        </div>
                      )}
                   </div>
                 ))}
              </div>
           </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default ServicesPage;
