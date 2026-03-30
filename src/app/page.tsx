import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import QuickRequestForm from "@/components/ui/QuickRequestForm";
import FloatingActions from "@/components/ui/FloatingActions";
import Link from "next/link";

const SERVICES = [
  { icon: "🏠", title: "RESIDENTIAL CLEANING", desc: "Complete house and apartment cleaning with top-tier sanitization handled from our BBS Mall hub." },
  { icon: "🏢", title: "OFFICE CLEANING", desc: "Corporate office maintenance for a healthier workspace environment. Professional sanitization on your schedule." },
  { icon: "🪲", title: "FUMIGATION & PEST CONTROL", desc: "Expert treatment for cockroaches, bedbugs, termites, and more using eco-friendly products." },
  { icon: "🛋️", title: "SOFA & CARPET CLEANING", desc: "Deep extraction cleaning for sofas, carpets, and mattresses. Removes stubborn stains and allergens." },
  { icon: "🐍", title: "SNAKE CONTROL", desc: "Professional snake removal and prevention services for residential and commercial properties." },
  { icon: "🪳", title: "COCKROACH CONTROL", desc: "High-precision cockroach elimination using specialized gel bait and cabinet treatments." },
  { icon: "🏥", title: "BEDBUG ERADICATION", desc: "High-intensity heat and chemical treatments to completely eliminate bedbug infestations permanently." },
  { icon: "🏗️", title: "POST-CONSTRUCTION CLEAN", desc: "Heavy-duty cleaning after building or renovation to move into a pristine home. Removes debris and dust." },
  { icon: "🪟", title: "WINDOW EXTERIOR", desc: "High-rise exterior window cleaning using specialized high-reach equipment and non-streak solutions." },
  { icon: "🍳", title: "OVEN DEEP CLEAN", desc: "Thorough oven degreasing and sanitization to restore hygiene and performance to like-new state." },
  { icon: "🕋", title: "MOSQUE & VENUE CLEAN", desc: "Specialized large-venue hygiene for community spaces with high-standard precision and respect." },
  { icon: "🗝️", title: "MOVE IN / OUT CLEAN", desc: "Comprehensive deep cleaning for transitions. Every corner, shelf, and floor is perfectly sanitized." },
];

export default function Home() {
  const phoneNumber = "+254 723 531 085";

  return (
    <div className="flex flex-col min-h-screen text-slate-900 font-body bg-white">
      <Navbar />
      <FloatingActions />

      <main className="flex-grow">
        {/* HERO SECTION - REPLICATING THE EXACT MEDINA DESIGN */}
        <section className="relative min-h-[90vh] flex items-center bg-[#2563eb] overflow-hidden">
          {/* Subtle Background pattern overlay - replicating the textured look */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
             <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-white blur-[120px]" />
             <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-white blur-[100px]" />
          </div>

          <div className="max-w-7xl mx-auto px-10 relative z-10 w-full pt-20">
            <div className="flex flex-col items-center text-center space-y-12 animate-in fade-in zoom-in duration-1000">
               
               {/* Badge - EXACT SCREEN REPLICATION */}
               <div className="inline-flex items-center gap-3 bg-white/10 border border-white/20 px-6 py-2.5 rounded-full text-[12px] font-bold text-white/90 backdrop-blur-md">
                 <span className="text-orange-400">✨</span>
                 Trusted by 500+ homes & businesses in Nairobi
               </div>

               {/* Heading */}
               <div className="space-y-4">
                  <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter max-w-5xl mx-auto">
                    Spotless Spaces.<br />
                    <span className="text-[#f97316]">Pest-Free Living.</span>
                  </h1>
               </div>

               {/* Subheading - EXACT SCREEN REPLICATION */}
               <p className="text-lg md:text-xl text-white/80 font-medium leading-relaxed max-w-3xl mx-auto">
                 Professional cleaning and fumigation services in Nairobi. We deliver exceptional results with eco-friendly products, trained staff, and 100% satisfaction guaranteed.
               </p>

               {/* Action Buttons - EXACT SCREEN REPLICATION */}
               <div className="flex flex-col sm:flex-row gap-6 pt-10">
                 <Link href="#request-form" className="bg-[#f97316] text-white px-12 py-5 rounded-xl font-bold text-[14px] uppercase tracking-widest hover:bg-orange-600 shadow-2xl transition-all hover:scale-[1.05] active:scale-95 text-center flex items-center gap-3">
                   Book Now
                   <span className="material-symbols-outlined text-lg">arrow_forward</span>
                 </Link>
                 <Link href="#request-form" className="bg-transparent text-white border border-white px-12 py-5 rounded-xl font-bold text-[14px] uppercase tracking-widest hover:bg-white/10 transition-all text-center">
                   Get Free Quote
                 </Link>
               </div>

               {/* Features Checkline - EXACT SCREEN REPLICATION */}
               <div className="flex flex-col sm:flex-row items-center gap-10 pt-16 border-t border-white/5 opacity-80">
                  {[
                    'Same-Day Service',
                    'Eco-Friendly Products',
                    'Satisfaction Guaranteed'
                  ].map(feature => (
                    <div key={feature} className="flex items-center gap-2 text-white font-bold text-[13px]">
                       <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white">
                          <span className="material-symbols-outlined text-[14px] font-black">check</span>
                       </div>
                       {feature}
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </section>

        {/* SERVICES SECTION - CLEAN CARDS */}
        <section className="py-40 bg-white px-10">
          <div className="max-w-7xl mx-auto space-y-24">
             <div className="text-center space-y-6 max-w-2xl mx-auto">
                <span className="text-[#2563eb] font-black text-xs uppercase tracking-widest italic border border-[#2563eb]/20 px-6 py-2 rounded-full">Professional Offerings</span>
                <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter">Cleaning & Fumigation.</h2>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {SERVICES.map((service, i) => (
                  <div key={i} className="bg-slate-50 p-12 rounded-[4rem] group border border-transparent hover:bg-white hover:shadow-2xl hover:border-slate-100 transition-all duration-700">
                     <div className="text-6xl mb-12 transform group-hover:scale-110 transition-transform duration-500 drop-shadow-sm">{service.icon}</div>
                     <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight uppercase tracking-widest font-headline">{service.title}</h3>
                     <p className="text-slate-500 text-lg font-medium leading-relaxed mb-12">
                        {service.desc}
                     </p>
                     <Link href="/services" className="text-[#2563eb] font-black text-[10px] uppercase tracking-widest flex items-center gap-2 group-hover:gap-5 transition-all">
                        Service Details
                        <span className="material-symbols-outlined text-base">arrow_forward</span>
                     </Link>
                  </div>
                ))}
             </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section className="py-40 bg-slate-50 relative overflow-hidden">
           <div className="max-w-7xl mx-auto px-10 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center relative z-10 font-inter">
              <div className="space-y-12 animate-in fade-in slide-in-from-left-8 duration-1000">
                 <div className="space-y-6">
                    <span className="text-[#2563eb] font-black text-xs uppercase tracking-widest italic">Operations HQ</span>
                    <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-tight">About StarDash.</h2>
                 </div>
                 <div className="space-y-8 text-xl text-slate-500 font-medium leading-relaxed font-body">
                    <p>
                       StarDash is a premium provider of professional cleaning and fumigation services in Nairobi, now operating from our main office at <strong>BBS Mall, Eastleigh</strong>.
                    </p>
                    <p>
                       We deliver elite treatment for cockroaches, bedbugs, termites, mosquitoes, and more. Our sanitization protocols ensure your home or office is pristine and pest-free.
                    </p>
                 </div>
                 <div className="flex items-center gap-10 pt-10 border-t border-slate-200">
                    <div className="space-y-1">
                       <p className="text-[10px] font-black uppercase tracking-widest text-[#2563eb]">Location</p>
                       <p className="text-xl font-bold text-slate-900">BBS Mall, Eastleigh</p>
                    </div>
                    <div className="space-y-1">
                       <p className="text-[10px] font-black uppercase tracking-widest text-[#2563eb]">Phone</p>
                       <p className="text-xl font-bold text-slate-900">{phoneNumber}</p>
                    </div>
                 </div>
              </div>

              <div className="relative group">
                 <div className="aspect-[4/5] bg-slate-300 rounded-[5rem] overflow-hidden shadow-2xl relative border-8 border-white">
                    <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2670&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000 shadow-inner" alt="Clean Home" />
                 </div>
              </div>
           </div>
        </section>

        {/* INTAKE FORM SECTION */}
        <section id="request-form" className="py-40 bg-[#2563eb] relative overflow-hidden px-10">
           <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center relative z-10 w-full">
              <div className="text-white space-y-16">
                 <div className="space-y-8">
                    <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-12">Register Your Service Booking.</h2>
                    <p className="text-2xl text-white/60 font-medium leading-relaxed max-w-md">Our BBS Mall office is standing by to process your building and room specifics for immediate dispatch.</p>
                 </div>
              </div>

              <div className="animate-in fade-in zoom-in duration-700">
                <QuickRequestForm />
              </div>
           </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
