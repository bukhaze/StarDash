'use client';

import React, { useState } from 'react';

const QuickRequestForm = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const services = [
    "Residential Cleaning",
    "Office Cleaning",
    "Fumigation & Pest Control",
    "Sofa & Carpet Cleaning",
    "Cockroach Control",
    "Snake Control & Safe Removal",
    "Bedbug Eradication",
    "Termite Control",
    "Window Exterior Cleaning",
    "Oven Deep Clean",
    "Post-Construction Deep Clean",
    "Move In / Move Out Cleaning",
    "Office Sanitization",
    "Mosque & Venue Cleaning"
  ];

  const nairobiNeighborhoods = [
    "Westlands",
    "Eastleigh",
    "Kilimani",
    "Karen",
    "Lavington",
    "Parklands",
    "Pangani",
    "South B",
    "South C",
    "Lang'ata",
    "Kileleshwa",
    "Hurlingham",
    "Muthaiga",
    "Runda",
    "Gigiri"
  ];

  const timeSlots = [
    "08:00 AM - 10:00 AM",
    "10:00 AM - 12:00 PM",
    "12:00 PM - 02:00 PM",
    "02:00 PM - 04:00 PM",
    "04:00 PM - 06:00 PM"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center space-y-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-[#2563eb] rounded-full flex items-center justify-center mx-auto text-white shadow-xl">
          <span className="material-symbols-outlined text-4xl">check</span>
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-slate-900">Request Sent!</h3>
          <p className="text-slate-500 font-medium">Our BBS Mall operations team will contact you within 2 hours to confirm your booking.</p>
        </div>
        <button 
          onClick={() => setSubmitted(false)}
          className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-all"
        >
          Send Another
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-100 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#2563eb]/5 blur-[80px] pointer-events-none" />
      
      <div className="relative z-10 space-y-8">
        <div className="space-y-2 text-center lg:text-left">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Book a Service</h2>
          <p className="text-slate-400 text-sm font-medium">Fill out the form below and we&apos;ll get back to you within 2 hours.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Full Name *</label>
              <input 
                required 
                type="text"
                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-4 px-5 text-sm font-bold focus:ring-4 focus:ring-[#2563eb]/5 focus:border-[#2563eb]/20 transition-all outline-none" 
                placeholder="John Kamau" 
              />
            </div>
            {/* Email */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Email Address *</label>
              <input 
                required 
                type="email"
                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-4 px-5 text-sm font-bold focus:ring-4 focus:ring-[#2563eb]/5 focus:border-[#2563eb]/20 transition-all outline-none" 
                placeholder="john@example.com" 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Phone */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Phone Number *</label>
              <input 
                required 
                type="tel"
                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-4 px-5 text-sm font-bold focus:ring-4 focus:ring-[#2563eb]/5 focus:border-[#2563eb]/20 transition-all outline-none" 
                placeholder="0712 345 678" 
              />
            </div>
            {/* Location */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Your Location *</label>
              <input 
                required 
                type="text"
                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-4 px-5 text-sm font-bold focus:ring-4 focus:ring-[#2563eb]/5 focus:border-[#2563eb]/20 transition-all outline-none" 
                placeholder="e.g., Westlands, Nairobi" 
              />
            </div>
          </div>

          {/* Service Required */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Service Required *</label>
            <select 
              required 
              className="w-full bg-slate-50 border border-slate-100 rounded-xl py-4 px-5 text-sm font-bold focus:ring-4 focus:ring-[#2563eb]/5 focus:border-[#2563eb]/20 transition-all outline-none appearance-none cursor-pointer"
            >
              <option value="" disabled selected>Select a service</option>
              {services.map(service => (
                <option key={service} value={service.toLowerCase()}>{service}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Preferred Date *</label>
              <input 
                required 
                type="date"
                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-4 px-5 text-sm font-bold focus:ring-4 focus:ring-[#2563eb]/5 focus:border-[#2563eb]/20 transition-all outline-none" 
              />
            </div>
            {/* Time */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Preferred Time *</label>
              <select 
                required 
                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-4 px-5 text-sm font-bold focus:ring-4 focus:ring-[#2563eb]/5 focus:border-[#2563eb]/20 transition-all outline-none appearance-none cursor-pointer"
              >
                <option value="" disabled selected>Select time slot</option>
                {timeSlots.map(slot => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Additional Message */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Additional Message</label>
            <textarea 
              rows={4}
              className="w-full bg-slate-50 border border-slate-100 rounded-xl py-4 px-5 text-sm font-bold focus:ring-4 focus:ring-[#2563eb]/5 focus:border-[#2563eb]/20 transition-all outline-none resize-none" 
              placeholder="Tell us more about your requirements, specific areas to clean, pest issues, etc." 
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-[#f97316] text-white py-5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-orange-600 shadow-xl shadow-orange-200 active:scale-95 transition-all outline-none disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-4 group"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Request Booking
                <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </>
            )}
          </button>

          <p className="text-[10px] text-slate-400 text-center font-medium">
            By submitting this form, you agree to our <a href="#" className="text-[#2563eb] underline">Privacy Policy</a>.
          </p>
        </form>
      </div>
    </div>
  );
};

export default QuickRequestForm;
