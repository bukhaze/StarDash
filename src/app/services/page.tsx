import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ServiceCard from '@/components/ui/ServiceCard';
import FilterSidebar from '@/components/ui/FilterSidebar';
import Link from 'next/link';

const SERVICES = [
  {
    title: "Apartment Deep Clean",
    description: "A complete top-to-bottom sanitization of your home. Includes kitchen, bathrooms, dusting, and floor mopping.",
    price: "KSh 2,500",
    rating: "4.9",
    reviews: "1.2k",
    category: "Cleaning & Hygiene",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBz9SEngPPSGdT-bNVfVL29xjYd49fGVb28iZJtkKd37eljC3dCw3aWyadT2V5a6wdaoBuJBv1Us4fDXforppwr0vkErB7PozaXsaKbkB8SEgbfmsP2E3PrxOIrUQAa7jfVTfqHCqKEqvaso7LnBv2PIrMW2jMSf8He7gNsR9UKFSoo8TPDhljqtroGaYENDcib8Tp06s54i8t5RrmQ5vaMoC8WSYWm43zkbBr1VulnA4_y43yocd1R7AnTQVaziEKAecwHJK2SrVU"
  },
  {
    title: "Executive Laundry Care",
    description: "Professional wash, dry, and fold with expert stain treatment. Pickup and delivery included for your convenience.",
    price: "KSh 1,200",
    rating: "4.8",
    reviews: "850",
    category: "Laundry & Restoration",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBiJEmP3F9M6Hs7_A0X74dTI7S3yO-pqDOJoEjXbpjfxdhZsRTzB00HVRDDbJwJQmHQOMCxPSTd6ZPdrXCzWX3b20UtJYQCyE7Pmgkfj7xzXpeAm44PleyuGnHlOZgzJRveiJ8PaKEW7TNJz3gAc4WlKMBUaerr1alkWtmRtvDVl2XIzHWVYbA3UvqRapOI5_4c4iAz6Z6lLPXiWjhI4g3u40PCAp-zx-VaQr4JzpuZ1mynIivtN5YJvr6yqMuC4fafkgVzmtjiANY"
  },
  {
    title: "Upholstery Extraction",
    description: "Deep steam cleaning for sofas, carpets, and mattresses. Removes deep-seated allergens and stubborn stains.",
    price: "KSh 3,500",
    rating: "5.0",
    reviews: "420",
    category: "Cleaning & Hygiene",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-8tc6xli7rnLb4i65TqEOlZc74quvkJ3U5BAV4Yh7zFcTqhWlcPFNhvoIC4gDR7ywdj40s_R3CldmQM_MIH2dsQC2wT3wk0XGyzOnjtUkPiBVJULkBtAS8D98Nh1-WFEkVjHNq1OUnwA6r3zd7XSbZ3pDPBLglEDXSnvHPHGT-2PORRxdkP9zHiBy4TuRvhbRj_jD9EfzOMBsope6o-yebyV3ohSjh5CqrwXd0AxocxEHmYFwYQYPt18P7O9z5mzJ3nr9RiLuVkY"
  },
  {
    title: "Move In / Out Special",
    description: "Total property preparation for new tenants or owners. Every corner, drawer, and appliance cleaned to perfection.",
    price: "KSh 8,500",
    rating: "4.7",
    reviews: "630",
    category: "Cleaning & Hygiene",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCBrPwjHl9zE5yBYW7qpYPMxq3hpSnoNeCWlyBg-nHQUs_hS1yNEfWSnQ3XgS_7t-K90evFk2WWnO7Al457fq070rruwsxGtmwyHaA0RFDYhLbuS5ec2MVecBGF-fiK35IyKE3VuL0uikkt2j7GzO6c8TbMCRJzSPiwC6cI_XlxYP2Ldiw071Iq8ONpq-UWKlVfWhrAz3D73402sG-wR_Fs58ZfnNO2w1GSb-boQv5bfN29f3wmn7gXKYeJEm-4NBTRhEglDOi6Yjg"
  },
  {
    title: "Commercial Office Hygiene",
    description: "Regular sanitation for corporate environments. Daily or weekly schedules available to maintain workplace wellness.",
    price: "Request Quote",
    rating: "4.8",
    reviews: "210",
    category: "Specialized Projects",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAOiax_FY_1Gkk4X4y9ukYaZLZVIuao1TJMmkPvablr-lZbsquRze4yZ_JPx6aPY5pV8F9xwb6PMen0Mpborl8n6rN_-uTepleZh5rkf9w_XogE92n0puQqwQXDUy9x5kHN9U5n9bHCbhaEEi1FmKFgCvnqvDkJLZCQ_6dZN6VW0M1GH3WJvaKI9bDev7YkW23NnKwExftUT6IysD69p8ovyS4a80WyNkBxaDcqidws0amJGc60bxosy9JreDSBZ3LHZv7MTG0E5Wc"
  },
  {
    title: "Elite Property Watch",
    description: "Professional property monitoring and concierge security for homes and residential estates. Vetted security nodes.",
    price: "KSh 45,000",
    rating: "5.0",
    reviews: "45",
    category: "Elite Security",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9aO7Fi-w52Mn1jhnyuWgnhPijEDOPRX_C4DLtWeNrminanzFh501fgpvRKhdvGHjCeGFpUm96LquSTYOZlB319FT1eFtaYfImh0jtArIJ6m4FmR9NcyW-3DsXIqx6VG4OGmGKDvI2gB4yitBQRgBK3awmCHnwLXJa4NG13LcwGenwKGYJt0mQc-q-D1sClEtNi22CYo620vdhHpHH0O1aeyecFv3kuro6DUeDqJsGS-Au0AqaO4sgZaxwjKtMdA4_IZv4fyOMuns"
  }
];

const ServicesPage = () => {
  return (
    <div className="flex flex-col min-h-screen text-slate-900 font-body items-stretch bg-white">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-40 max-w-7xl mx-auto px-6 md:px-10 w-full animate-in fade-in duration-700">
        
        {/* Header */}
        <header className="mb-20 space-y-6 flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="space-y-4">
             <span className="text-blue-600 font-black tracking-widest uppercase text-xs">Our Expert Services</span>
             <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">Professional care for everything you own.</h1>
          </div>
          <p className="text-lg text-slate-500 leading-relaxed font-medium">
            Browse our catalog of premium services. Every booking is managed by our central operations hub to ensure the highest standards in Nairobi.
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Sidebar */}
          <FilterSidebar />

          {/* Service Grid */}
          <div className="flex-1 space-y-16">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8">
              {SERVICES.map((service, index) => (
                <ServiceCard key={index} {...service} />
              ))}
            </div>

            {/* Empty State / Pagination Placeholder */}
            {SERVICES.length > 0 && (
              <div className="mt-24 flex items-center justify-center space-x-4">
                <button className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white border border-slate-200 text-slate-400 hover:text-slate-900 hover:border-slate-900 transition-all">
                  <span className="material-symbols-outlined text-sm">west</span>
                </button>
                <div className="flex items-center gap-2">
                   {[1, 2, 3].map(p => (
                      <button key={p} className={`w-12 h-12 flex items-center justify-center rounded-2xl font-black text-sm transition-all ${p === 1 ? 'bg-slate-900 text-white shadow-lg' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>{p}</button>
                   ))}
                </div>
                <button className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white border border-slate-200 text-slate-400 hover:text-slate-900 hover:border-slate-900 transition-all">
                  <span className="material-symbols-outlined text-sm">east</span>
                </button>
              </div>
            )}
            
            {/* Help Block */}
            <div className="bg-slate-50 rounded-[2.5rem] p-12 text-center space-y-6 border border-slate-100 mt-12">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>help_center</span>
              </div>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">Don&apos;t see what you need?</h3>
              <p className="text-slate-500 text-lg max-w-lg mx-auto">Tell us about your custom project and our team will provide a tailored solution managed by StarDash.</p>
              <Link href="/contact" className="inline-flex items-center justify-center gap-3 bg-slate-900 text-white px-10 py-4 rounded-2xl font-black transition-all hover:bg-blue-600 shadow-xl shadow-slate-200">
                Contact Ops Hub
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ServicesPage;
