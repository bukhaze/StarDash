import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import QuickRequestForm from '@/components/ui/QuickRequestForm';
import Link from 'next/link';

const CONTACT_CARDS = [
  {
    icon: "call",
    title: "Call Us",
    content: "+254 723 531 085",
    link: "tel:+254 723 531 085",
    color: "#2563eb"
  },
  {
    icon: "chat",
    title: "WhatsApp",
    content: "Chat with us instantly",
    link: "https://wa.me/254723531085",
    color: "#22c55e"
  },
  {
    icon: "mail",
    title: "Email",
    content: "nimcaz22@gmail.com",
    link: "mailto:nimcaz22@gmail.com",
    color: "#f97316"
  },
  {
    icon: "pin_drop",
    title: "Location",
    content: "BBS Mall, Eastleigh, Nairobi, Kenya",
    link: "https://maps.google.com/?q=BBS+Mall+Eastleigh+Nairobi",
    color: "#ef4444"
  }
];

const OPERATING_HOURS = [
  { day: "Monday - Friday", hours: "7:00 AM - 6:00 PM" },
  { day: "Saturday", hours: "8:00 AM - 4:00 PM" },
  { day: "Sunday", hours: "Closed" },
  { day: "Public Holidays", hours: "By Appointment" }
];

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900 font-body">
      <Navbar />
      
      <main className="flex-grow pt-40 pb-40 px-6 md:px-10 max-w-7xl mx-auto w-full animate-in fade-in duration-700">
        <div className="mb-20 space-y-4">
           <h1 className="text-6xl font-black text-slate-900 tracking-tighter">Contact Us</h1>
           <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl">
             Ready to book a cleaning or fumigation service? Get in touch today. We&apos;ll respond within 2 hours during business hours.
           </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Left Column (Info) */}
          <div className="space-y-12">
            <div className="space-y-6">
               <h3 className="text-2xl font-black text-slate-900 tracking-tight">Get in Touch</h3>
               <div className="space-y-4">
                 {CONTACT_CARDS.map((card) => (
                   <a 
                     key={card.title} 
                     href={card.link}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="flex items-center gap-6 p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 group"
                   >
                     <div 
                       className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                       style={{ backgroundColor: `${card.color}10`, color: card.color }}
                     >
                       <span className="material-symbols-outlined text-3xl font-black">{card.icon}</span>
                     </div>
                     <div>
                       <p className="text-sm font-black text-slate-900">{card.title}</p>
                       <p className="text-slate-500 font-medium text-sm leading-relaxed">{card.content}</p>
                     </div>
                   </a>
                 ))}
               </div>
            </div>

            {/* Operating Hours Section */}
            <div className="bg-slate-50 p-8 md:p-12 rounded-[2.5rem] border border-slate-100 space-y-8">
               <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-slate-400 font-black">schedule</span>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase tracking-widest text-xs">Operating Hours</h3>
               </div>
               <div className="space-y-4">
                 {OPERATING_HOURS.map((item) => (
                   <div key={item.day} className="flex justify-between items-center text-sm font-medium border-b border-slate-200/50 pb-4 last:border-0 last:pb-0">
                      <span className="text-slate-500">{item.day}</span>
                      <span className="text-slate-900 font-black">{item.hours}</span>
                   </div>
                 ))}
               </div>
            </div>
          </div>
          
          {/* Right Column (Form) */}
          <div className="animate-in fade-in slide-in-from-right-8 duration-700">
             <QuickRequestForm />
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-40 space-y-8">
           <h3 className="text-2xl font-black text-slate-900 tracking-tight">Our Headquarters</h3>
           <div className="w-full h-[500px] bg-slate-100 rounded-[3rem] overflow-hidden shadow-2xl relative border border-slate-100">
              {/* Note: In a real app we'd use Google Maps / Mapbox. Using an iframe for demonstration like the screenshot */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.824240751964!2d36.85226177579169!3d-1.272583898715362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f16d804246c4f%3A0x644265da65c40464!2sBBS%20Mall!5e0!3m2!1sen!2ske!4v1700000000000!5m2!1sen!2ske" 
                className="w-full h-full border-0 grayscale saturate-50 hover:grayscale-0 transition-all duration-1000"
                allowFullScreen
                loading="lazy"
              />
              <div className="absolute top-8 left-8 bg-white p-6 rounded-2xl shadow-2xl border border-slate-100 max-w-xs animate-in slide-in-from-left-4 duration-1000">
                 <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#2563eb] mb-2 font-headline">BBS Mall Hub</p>
                 <h4 className="text-lg font-black text-slate-900 mb-1">StarDash Operations</h4>
                 <p className="text-slate-500 text-xs font-medium leading-relaxed">Eastleigh, General Waruinge St, Nairobi, Kenya</p>
                 <a href="https://maps.google.com" className="inline-flex items-center gap-2 mt-4 text-[#2563eb] text-xs font-black uppercase tracking-widest hover:gap-4 transition-all group">
                    Get Directions
                    <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">near_me</span>
                 </a>
              </div>
           </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
