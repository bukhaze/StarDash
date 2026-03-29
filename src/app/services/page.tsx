import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ServiceCard from '@/components/ui/ServiceCard';
import FilterSidebar from '@/components/ui/FilterSidebar';

const ServicesPage = () => {
  const services = [
    {
      title: "House Cleaning",
      description: "Complete maintenance for your home including dusting, mopping, and vacuuming.",
      price: "KES 8,500",
      rating: "4.9",
      reviews: "1.2k",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBz9SEngPPSGdT-bNVfVL29xjYd49fGVb28iZJtkKd37eljC3dCw3aWyadT2V5a6wdaoBuJBv1Us4fDXforppwr0vkErB7PozaXsaKbkB8SEgbfmsP2E3PrxOIrUQAa7jfVTfqHCqKEqvaso7LnBv2PIrMW2jMSf8He7gNsR9UKFSoo8TPDhljqtroGaYENDcib8Tp06s54i8t5RrmQ5vaMoC8WSYWm43zkbBr1VulnA4_y43yocd1R7AnTQVaziEKAecwHJK2SrVU"
    },
    {
      title: "Office Cleaning",
      description: "Maintain a professional environment with specialized commercial sanitation.",
      price: "KES 12,000",
      rating: "4.8",
      reviews: "95",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAOiax_FY_1Gkk4X4y9ukYaZLZVIuao1TJMmkPvablr-lZbsquRze4yZ_JPx6aPY5pV8F9xwb6PMen0Mpborl8n6rN_-uTepleZh5rkf9w_XogE92n0puQqwQXDUy9x5kHN9U5n9bHCbhaEEi1FmKFgCvnqvDkJLZCQ_6dZN6VW0M1GH3WJvaKI9bDev7YkW23NnKwExftUT6IysD69p8ovyS4a80WyNkBxaDcqidws0amJGc60bxosy9JreDSBZ3LHZv7MTG0E5Wc"
    },
    {
      title: "Move In / Out",
      description: "Deep cleaning for a fresh start in your new home or a stress-free departure.",
      price: "KES 19,500",
      rating: "5.0",
      reviews: "210",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCBrPwjHl9zE5yBYW7qpYPMxq3hpSnoNeCWlyBg-nHQUs_hS1yNEfWSnQ3XgS_7t-K90evFk2WWnO7Al457fq070rruwsxGtmwyHaA0RFDYhLbuS5ec2MVecBGF-fiK35IyKE3VuL0uikkt2j7GzO6c8TbMCRJzSPiwC6cI_XlxYP2Ldiw071Iq8ONpq-UWKlVfWhrAz3D73402sG-wR_Fs58ZfnNO2w1GSb-boQv5bfN29f3wmn7gXKYeJEm-4NBTRhEglDOi6Yjg"
    },
    {
      title: "Laundry Washing",
      description: "Professional wash, dry, and fold service with eco-friendly detergents.",
      price: "KES 4,500",
      rating: "4.7",
      reviews: "320",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBiJEmP3F9M6Hs7_A0X74dTI7S3yO-pqDOJoEjXbpjfxdhZsRTzB00HVRDDbJwJQmHQOMCxPSTd6ZPdrXCzWX3b20UtJYQCyE7Pmgkfj7xzXpeAm44PleyuGnHlOZgzJRveiJ8PaKEW7TNJz3gAc4WlKMBUaerr1alkWtmRtvDVl2XIzHWVYbA3UvqRapOI5_4c4iAz6Z6lLPXiWjhI4g3u40PCAp-zx-VaQr4JzpuZ1mynIivtN5YJvr6yqMuC4fafkgVzmtjiANY"
    },
    {
      title: "Sofa Set Cleaning",
      description: "Specialized upholstery cleaning to remove stains and allergens.",
      price: "KES 11,000",
      rating: "4.9",
      reviews: "150",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-8tc6xli7rnLb4i65TqEOlZc74quvkJ3U5BAV4Yh7zFcTqhWlcPFNhvoIC4gDR7ywdj40s_R3CldmQM_MIH2dsQC2wT3wk0XGyzOnjtUkPiBVJULkBtAS8D98Nh1-WFEkVjHNq1OUnwA6r3zd7XSbZ3pDPBLglEDXSnvHPHGT-2PORRxdkP9zHiBy4TuRvhbRj_jD9EfzOMBsope6o-yebyV3ohSjh5CqrwXd0AxocxEHmYFwYQYPt18P7O9z5mzJ3nr9RiLuVkY"
    },
    {
      title: "Security Services",
      description: "Premium home monitoring and physical security by certified personnel.",
      price: "KES 35,000",
      rating: "5.0",
      reviews: "45",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9aO7Fi-w52Mn1jhnyuWgnhPijEDOPRX_C4DLtWeNrminanzFh501fgpvRKhdvGHjCeGFpUm96LquSTYOZlB319FT1eFtaYfImh0jtArIJ6m4FmR9NcyW-3DsXIqx6VG4OGmGKDvI2gB4yitBQRgBK3awmCHnwLXJa4NG13LcwGenwKGYJt0mQc-q-D1sClEtNi22CYo620vdhHpHH0O1aeyecFv3kuro6DUeDqJsGS-Au0AqaO4sgZaxwjKtMdA4_IZv4fyOMuns"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-20 max-w-7xl mx-auto px-8 w-full">
        {/* Breadcrumbs */}
        <nav className="flex mb-8 items-center space-x-2 text-sm text-on-surface-variant font-body">
          <a href="/" className="hover:text-secondary transition-colors">Home</a>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="font-medium text-on-surface">Services</span>
        </nav>

        <header className="mb-12">
          <h1 className="text-5xl font-extrabold font-headline tracking-tight text-primary mb-4">Premium Home Services</h1>
          <p className="text-lg text-on-surface-variant max-w-2xl leading-relaxed font-body">
            Experience the Digital Concierge. Curated home services delivered by vetted professionals in Nairobi with seamless booking.
          </p>
        </header>

        <div className="flex gap-12">
          {/* Filter Sidebar */}
          <FilterSidebar />

          {/* Service Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <ServiceCard key={index} {...service} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-16 flex items-center justify-center space-x-2 font-headline">
              <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-surface-container-high text-on-surface-variant hover:bg-secondary hover:text-white transition-all">
                <span className="material-symbols-outlined text-sm">chevron_left</span>
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-secondary text-white font-bold shadow-sm">1</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white text-on-surface-variant hover:bg-surface-container-high transition-all shadow-sm border border-outline-variant/10">2</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white text-on-surface-variant hover:bg-surface-container-high transition-all shadow-sm border border-outline-variant/10">3</button>
              <span className="px-2 text-on-surface-variant">...</span>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white text-on-surface-variant hover:bg-surface-container-high transition-all shadow-sm border border-outline-variant/10">8</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-surface-container-high text-on-surface-variant hover:bg-secondary hover:text-white transition-all">
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ServicesPage;
