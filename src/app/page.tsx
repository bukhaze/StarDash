import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ServiceCard from "@/components/ui/ServiceCard";
import TrustBadge from "@/components/ui/TrustBadge";
import Link from "next/link";

export default function Home() {
  const popularServices = [
    {
      title: "House Cleaning",
      description: "Meticulous top-to-bottom dusting and sanitization for your home. Includes sanitizing high-touch surfaces.",
      price: "KES 2,500/hr",
      rating: "4.9",
      reviews: "1.2k",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBB-R26jKB9i5PlNdbB10f9Ma2Uo_jRX7We7SUvf63kLH5hYeEAemnuUbAa8KeKDkhu24zx4uwVtAI-cVcTGNvteU4mwAApBCUAFdj0MfBwN5qKm0sX6mpyr5IOsjz253SUVcOksLsIPRTY2aj-TYiLcbxMsg4vkNAKlxuuOZbpOUVKZLPB-78oM79k1dWlFzkD5jdCzSH0f44dockVHijxasnbUZZm9vPohOTqjH6u9AdkGFpl4_3JuYB5vliGXUy1w83Ni2qHAv8"
    },
    {
      title: "Laundry Service",
      description: "Professional wash, dry, and expert fold with care and premium detergents. Pick-up and delivery available.",
      price: "KES 1,800/hr",
      rating: "4.8",
      reviews: "850",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCy_3inT4RfYTJbixlmrKxrXwLPqDnODrEf_W_N_8Je1KQdAbxaWyrCrAxUwu_LJwdywXhgdypr141hN5pLXeVcdPy_3hJnnutq1r4aDxwr0E79tNffhWxXGKgI7UHQScFFtkPlBLnNVDCQvHhxBUygIGojC9eOKZaFuR1qoKRNH3ggZK35qpYWKE85ss08CmdcXwGnMl0z4SCTvLoKTqouCOhzGw58YYTTR4GmgtiUwrA06doWb2COUiD3yCsATfoi4_qlfApUj7M"
    },
    {
      title: "Sofa Cleaning",
      description: "Deep fabric extraction and stain removal using advanced equipment. Safe for all fabric types including velvet.",
      price: "KES 4,500/job",
      rating: "5.0",
      reviews: "420",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQ-gxCRsK2sz_xsBAmqGUkk56kEkQ7iGeqRnvtSTve6cYx5tNctR8rGd0eqx2KQgEm8pOl7UVmmx2C9afAbTWKUBrg3_P_rS-A79D_BTHIOLzSHnbgNa37yihC_sjGNTZNnwqYOikFWu-0Dl9dFffC85nfT3v-pzhsxLTgEmct7bxAP5nux9hSZiq_YyIzwS-grXQU6ZanZlf4KqrsPuj11i4lTouPjndau3AbYocMi0XLS9dsEJY1cMH3Wx6kW-EiXGz21DR_a7E"
    },
    {
      title: "Carpet Cleaning",
      description: "Professional grade steam deep cleaning for all carpet types. Removes deep-seated dirt and allergens.",
      price: "KES 3,500/room",
      rating: "4.7",
      reviews: "630",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAIDHHKS5ZfBdEjHAsEc23Lx4Ja40kFAXC6p4cF6uek_ru469bGUf-BYPL4C3XlUMbIpIJisUGpVNO2de3WY6WMlRsNNBZbClwyPQi79wx_AXo9kZhOcTaUwJtx9wCyPprTn1CjRzmh4_F9mPe7aVwyt-g1MTloZxbNXU7-JgnkvfnLxcfMcF1w8IAuvqSNBRGA7x7Nt8NBeVptYmR-hJhxywNVC4deU8DmnbKBbO_ve1DrLb6ScCRZn4efTxObh2kD7RDB4Bh1xGo"
    }
  ];

  const trustBadges = [
    {
      icon: "verified_user",
      title: "Vetted Professionals",
      description: "Background checked and skill-tested experts only."
    },
    {
      icon: "payments",
      title: "Secure Payments",
      description: "Escrow-style payments released only after your approval."
    },
    {
      icon: "shield",
      title: "Insurance Protected",
      description: "All bookings are fully insured for up to $1,000,000."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 lg:pt-48 lg:pb-32 overflow-hidden px-6 md:px-8">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-tr from-surface-container-low to-transparent opacity-60"></div>
            <div className="absolute top-20 right-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-secondary-container/20 rounded-full blur-[80px] md:blur-[120px]"></div>
          </div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-on-surface mb-6 leading-[1.1] font-headline">
                Your Home, <br/><span className="text-secondary font-headline">Perfectly Handled.</span>
              </h1>
              <p className="text-lg md:text-xl text-on-surface-variant mb-10 max-w-2xl leading-relaxed font-body">
                Experience the Digital Concierge. On-demand cleaning, laundry, and specialized home services from vetted local professionals in Nairobi, delivered with precision.
              </p>
              
              {/* Search/Booking Bar */}
              <div className="bg-white p-2 md:p-3 rounded-2xl shadow-premium flex flex-col md:flex-row gap-3 md:gap-4 items-center premium-shadow">
                <div className="flex-1 w-full flex items-center px-4 py-3 bg-surface-container-high rounded-xl group focus-within:ring-2 focus-within:ring-secondary/20 transition-all">
                  <span className="material-symbols-outlined text-outline mr-3 group-focus-within:text-secondary">home_repair_service</span>
                  <select className="bg-transparent border-none focus:ring-0 text-on-surface font-medium w-full focus:outline-none text-sm md:text-base">
                    <option>Select Service</option>
                    <option>House Cleaning</option>
                    <option>Laundry Service</option>
                    <option>Sofa Cleaning</option>
                    <option>Carpet Deep Clean</option>
                  </select>
                </div>
                <div className="flex-1 w-full flex items-center px-4 py-3 bg-surface-container-high rounded-xl group focus-within:ring-2 focus-within:ring-secondary/20 transition-all">
                  <span className="material-symbols-outlined text-outline mr-3 group-focus-within:text-secondary">location_on</span>
                  <input className="bg-transparent border-none focus:ring-0 text-on-surface font-medium w-full focus:outline-none text-sm md:text-base" placeholder="Location in Nairobi" type="text" defaultValue="Kilimani, Nairobi" />
                </div>
                <button className="w-full md:w-auto bg-primary text-white px-10 py-4 h-14 md:h-auto rounded-xl font-bold text-base md:text-lg shadow-premium hover:shadow-xl hover:translate-y-[-2px] active:scale-95 transition-all bg-gradient-to-br from-primary to-primary-container shrink-0">
                  Book Now
                </button>
              </div>
            </div>
          </div>
          
          {/* Floating Abstract Visual */}
          <div className="hidden lg:block absolute top-1/2 right-0 -translate-y-1/2 w-1/3 h-[500px] rounded-l-[4rem] overflow-hidden shadow-2xl border-l-8 border-white">
            <img 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0xwDhunjl49xtWBVJibHLxD8M1eoB8XVk-egJDf4VmHQYchYFQE-xg7TxEb_iJOHoZPlMCFPP4gyk7PcjoiR5qMTlaLCItHajnq4zeSCV57NXS3tRzgtjNSiWmznXUnQ76zoux7rfgR4TSGf65o4W3rVd_GmM47QRxu4P-ZSB-qj7DEntRKcTuolVhhqrfhOiDrN3iOrP9R1TZiO-j-gWS4Q3rnsUbdYUPW2rpzN3mBVKOw3WPz7ypXBsZTfwkgT87oBRfCsT8IA" 
              alt="Modern home"
            />
          </div>
        </section>

        {/* Popular Services Grid */}
        <section className="py-24 bg-surface">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex justify-between items-end mb-16">
              <div>
                <span className="text-secondary font-bold tracking-widest uppercase text-xs mb-4 block">Our Specialities</span>
                <h2 className="text-4xl font-extrabold text-on-surface font-headline">Popular Services</h2>
              </div>
              <Link href="/services" className="text-secondary font-semibold flex items-center group">
                Explore All Services 
                <span className="material-symbols-outlined ml-2 group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {popularServices.map((service, index) => (
                <ServiceCard key={index} {...service} />
              ))}
            </div>
          </div>
        </section>

        {/* Trust Badges Section */}
        <section className="py-16 bg-surface-container-low">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
              {trustBadges.map((badge, index) => (
                <TrustBadge key={index} {...badge} />
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-extrabold mb-4 font-headline text-primary">Seamless Experience in 3 Steps</h2>
              <p className="text-on-surface-variant max-w-xl mx-auto font-body">From booking to completion, we've refined every detail to ensure absolute peace of mind.</p>
            </div>
            
            <div className="relative">
              <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-surface-container-high -translate-y-1/2 z-0"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 relative z-10">
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mb-8 border-8 border-white">01</div>
                  <h3 className="text-2xl font-bold mb-4 font-headline">Choose a Service</h3>
                  <p className="text-on-surface-variant text-center leading-relaxed font-body">Select from our wide range of premium services and specify your unique requirements.</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mb-8 border-8 border-white">02</div>
                  <h3 className="text-2xl font-bold mb-4 font-headline">Pick a Time</h3>
                  <p className="text-on-surface-variant text-center leading-relaxed font-body">Choose a slot that fits your schedule. Our pros are available 7 days a week, 7am to 9pm.</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mb-8 border-8 border-white">03</div>
                  <h3 className="text-2xl font-bold mb-4 font-headline text-primary">Relax while we work</h3>
                  <p className="text-on-surface-variant text-center leading-relaxed font-body">Track progress in real-time. We'll notify you the moment your home is sparkling clean.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Become a Worker CTA */}
        <section className="py-24 px-8">
          <div className="max-w-7xl mx-auto bg-primary rounded-[3rem] p-12 md:p-24 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
              <img 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKnH4N6AIAQ0rDEH5Qt3nzcVo06uYFhnG-CiJpYCzUFAJiQ81g10ckDZmkelShFBppqTvLm8fuHfwHBMPSMFULmRp9DUQt9F0CvIa4I4EU1JvXJwjmflvIxgkovTC48fDi1FteCVEv2WUHS_swqC7RnTfRCk1AkCaf3Dq1Nte7ShrYjtX5mYDWBa5oVloov444He-Xf0rxOBGDL0jLF0RhC75xPXow0owedQ5XOITcFiMZ50bh9TQiSNAqYnm7Rnq56Oo0Qwy0BZw" 
                alt="Support team"
              />
            </div>
            <div className="max-w-xl relative z-10">
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8 leading-tight font-headline">Ready to earn on your own terms?</h2>
              <p className="text-blue-100 text-lg mb-12 leading-relaxed font-body">Join the StarDash elite network. Set your own schedule, choose your rates, and work with premium clients in Nairobi.</p>
              <div className="flex flex-col sm:flex-row gap-6">
                <button className="bg-secondary text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-secondary/90 transition-all scale-95 active:scale-90">
                  Become a Partner
                </button>
                <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

