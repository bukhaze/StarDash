import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BookingSidebar from '@/components/ui/BookingSidebar';
import Link from 'next/link';

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  console.log('Rendering service:', slug);
  // In a real app, you would fetch service data based on params.slug
  const service = {
    title: "Premium House Cleaning",
    description: "Experience a level of detail that transforms your home into a sanctuary. Our elite professionals use eco-friendly products for a flawless finish.",
    detailedDescription: "Our premium house cleaning service is designed for those who demand architectural precision in home maintenance. We don&apos;t just clean; we restore your living space using high-grade, sustainable materials and meticulous protocols.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBYOCYFkbPkEAzTp6yRMPRlYzAocjNaXaGFv0rV0TWHn8RF7b_9wxvJNIFlCWYtsiPbPrWgajdQI2mAOHExmaQo-b-__uZiX_O3hqeJOQPCmj5-Y7eRG-1jeh8EOR_uAN5LFc11Q8z1GWLhSPrlB5QG-8_4ziDi9NHa4R_CD7IUjf7SAt1ttmkxRcdWNl8KRPoYy8bx_U4gKPRdsbXB57DUwDb5yUN3DsGth6eb6-2H5_JATBxK4joAYchy_i33ct48TQzMqe-hhS8",
    labels: ["Top Rated", "Elite Tier"],
    rating: "4.9",
    reviewsCount: "428"
  };

  const checklist = [
    "Deep Dusting (Surfaces & Baseboards)",
    "Micro-Mopping & Floor Buffing",
    "Kitchen Sanitization (Ext. Appliances)",
    "Bathroom Polishing & Mirror Care",
    "Upholstery Refresh & Vacuuming",
    "High-Touch Point Sanitization"
  ];

  const addons = [
    { name: "Fridge Interior", price: "KES 2,500", icon: "kitchen" },
    { name: "Deep Oven Clean", price: "KES 3,500", icon: "oven_gen" },
    { name: "Interior Windows", price: "KES 4,000", icon: "window" }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-32 max-w-7xl mx-auto px-8 w-full">
        {/* Breadcrumbs */}
        <nav className="flex mb-8 items-center space-x-2 text-sm text-on-surface-variant font-body">
          <Link href="/" className="hover:text-secondary transition-colors">Home</Link>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <Link href="/services" className="hover:text-secondary transition-colors">Services</Link>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="font-medium text-on-surface">{service.title}</span>
        </nav>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-8 space-y-8">
            <div className="relative h-[500px] w-full rounded-3xl overflow-hidden group shadow-premium">
              <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-10">
                <div className="flex gap-3 mb-4">
                  {service.labels.map(label => (
                    <span key={label} className="bg-secondary-container text-on-secondary-container px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase font-headline">
                      {label}
                    </span>
                  ))}
                </div>
                <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tighter mb-4 font-headline">
                  {service.title}
                </h1>
                <p className="text-white/90 text-lg max-w-2xl font-medium leading-relaxed font-body">
                  {service.description}
                </p>
              </div>
            </div>

            {/* Trust Tokens */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: "verified_user", text: "Insured" },
                { icon: "workspace_premium", text: "Vetted Pros" },
                { icon: "eco", text: "Eco-Friendly" },
                { icon: "history", text: "Always On-Time" }
              ].map(token => (
                <div key={token.text} className="bg-surface-container-low p-6 rounded-2xl flex flex-col items-center text-center gap-3 border border-outline-variant/10 shadow-sm">
                  <span className="material-symbols-outlined text-secondary text-3xl">{token.icon}</span>
                  <span className="text-xs font-bold text-on-surface uppercase tracking-widest font-headline">{token.text}</span>
                </div>
              ))}
            </div>

            {/* Bento Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 items-stretch">
              {/* Tasks Included */}
              <div className="bg-surface-container-low p-8 rounded-3xl border border-outline-variant/10">
                <h3 className="text-2xl font-bold mb-6 text-on-surface font-headline">Standard Checklist</h3>
                <ul className="space-y-4">
                  {checklist.map(item => (
                    <li key={item} className="flex items-center gap-4 text-on-surface-variant font-medium font-body">
                      <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Founder Guarantee */}
              <div className="bg-primary text-on-primary p-8 rounded-3xl flex flex-col justify-between shadow-premium">
                <div>
                  <span className="material-symbols-outlined text-secondary-container text-4xl mb-4">format_quote</span>
                  <p className="text-xl font-medium leading-relaxed italic mb-6 font-body">
                    &quot;Our standard isn&apos;t just clean; it&apos;s pristine. If you aren&apos;t absolutely thrilled with the results, we&apos;ll return to make it right—guaranteed.&quot;
                  </p>
                </div>
                <div className="flex items-center gap-4 border-t border-white/10 pt-6 mt-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200 border-2 border-white/20">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5DpM3n5XB9Sb40NMfh9mF-uFZbEyBh9Ah39RLRtq1fxfKliD9ZrH8Z19vi4zzsWI1wp1AG3cmJlkGum8Hewv2hBH3qSpPMxQVAP_Z2vPdUq0z3_lwpynJOP49sMNKAITbLeMfYfNmL7BTfkChcpnNY-n8CaWIEyeprc7RWvL-lSPeYYn7LXgPrVW3oZTsRnU7w0Qjhbd9-hILcqIZVKhlzMKnEh-H9_2w_3YMpeOLloULQ8w7GLAq1BC6ffgoy6kFmZpFbb_jTCM" alt="Founder" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold font-headline">Nimca Abdirashid</h4>
                    <p className="text-sm text-on-primary-container font-body">Founder, StarDash Premium</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Add-ons */}
            <div className="pt-12">
              <h3 className="text-2xl font-bold mb-8 text-on-surface px-2 font-headline">Elevate Your Clean</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {addons.map(addon => (
                  <label key={addon.name} className="group cursor-pointer">
                    <input className="hidden peer" type="checkbox" />
                    <div className="bg-white p-6 rounded-2xl border-2 border-transparent peer-checked:border-secondary peer-checked:bg-secondary/5 transition-all shadow-sm hover:shadow-md h-full flex flex-col">
                      <span className="material-symbols-outlined text-on-surface-variant mb-4 group-hover:text-secondary transition-colors text-3xl">{addon.icon}</span>
                      <div className="font-bold text-on-surface font-headline mb-1">{addon.name}</div>
                      <div className="text-sm text-secondary font-bold font-body">{addon.price}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Client Reviews Snippet */}
            <div className="pt-16">
              <div className="flex items-end justify-between mb-8 px-2">
                <h3 className="text-3xl font-bold text-on-surface font-headline">What Clients Say</h3>
                <div className="flex items-center gap-2 text-secondary font-bold font-body">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  {service.rating} ({service.reviewsCount} Reviews)
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-outline-variant/5 flex gap-6 hover:shadow-premium transition-all">
                <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-slate-50">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKeNaTCjI1ddmky7F5F3w17otyOCrYI6ItZkHyfC2gq8y8jLfkgyMTPAuxy0Tm1HTMweim4UudHM7xWgcHk4aLBBDqpaMoFC_o5VXpNX4RfbCVC4wcwdpdh4n7lx7BkagZp_4wAS_KzsAT1oM-QYDut8axKUUNK26CASD27c5IvwveBuHgujz9U9F3ZP3NhjaigXk4gf5OxHVUzxrwRDI4IPnYgVth0yEotB7oeuc5VnDOfLekz3VuXPWyHrPWEqitSMr6mETKL94" alt="Reviewer" className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="flex gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <span key={star} className="material-symbols-outlined text-amber-400 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    ))}
                  </div>
                  <p className="text-on-surface-variant font-medium leading-relaxed mb-4 font-body">
                    &quot;Absolutely impeccable service. They didn&apos;t just clean—they organized my entryway and left a custom fragrance that made the whole house feel brand new.&quot;
                  </p>
                  <div className="text-sm font-bold text-on-surface font-headline">Sarah J. <span className="text-slate-400 font-normal ml-2 font-body">— 3 days ago</span></div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <BookingSidebar />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
