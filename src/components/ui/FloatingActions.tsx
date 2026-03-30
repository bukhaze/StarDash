"use client";

import React from 'react';

const FloatingActions = () => {
  const phoneNumber = "+254 723 531 085";
  const whatsappNumber = "254723531085"; // International format without +
  const message = "Hello StarDash, I would like to book a cleaning/fumigation service.";

  return (
    <div className="fixed bottom-10 right-10 z-[100] flex flex-col gap-5 animate-in slide-in-from-bottom-10 duration-1000">
      {/* WhatsApp Button */}
      <a 
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all group relative"
      >
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
          alt="WhatsApp" 
          className="w-8 h-8"
        />
        <span className="absolute right-full mr-4 bg-white text-slate-900 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-slate-100">
           Chat on WhatsApp
        </span>
      </a>

      {/* Call Button */}
      <a 
        href={`tel:${phoneNumber}`}
        className="w-16 h-16 bg-[#2563eb] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all group relative"
      >
        <span className="material-symbols-outlined text-3xl">call</span>
        <span className="absolute right-full mr-4 bg-white text-slate-900 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-slate-100">
           Call Our Office
        </span>
      </a>
    </div>
  );
};

export default FloatingActions;
