import React from 'react';

const BookingSidebar = () => {
  return (
    <div className="sticky top-28 bg-white rounded-3xl shadow-premium p-8 border border-slate-100">
      <div className="flex justify-between items-start mb-8">
        <div>
          <span className="text-slate-400 text-sm font-bold uppercase tracking-widest block mb-1">Starting from</span>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-extrabold text-primary font-headline">KES 12,000</span>
            <span className="text-slate-500 font-medium font-body">/visit</span>
          </div>
        </div>
        <div className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider font-headline">
          Instant Booking
        </div>
      </div>
      
      <div className="space-y-6 mb-8">
        <div>
          <label className="block text-sm font-bold text-on-surface mb-3 uppercase tracking-wider font-headline font-semibold text-slate-900">Home Size</label>
          <select className="w-full bg-surface-container-high border-none rounded-xl py-3.5 px-4 font-medium focus:ring-2 focus:ring-secondary/20 transition-all outline-none font-body">
            <option>1 Bedroom, 1 Bath</option>
            <option selected>2 Bedrooms, 2 Baths</option>
            <option>3+ Bedrooms, 2+ Baths</option>
            <option>Large Family Home (4+ BR)</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-bold text-on-surface mb-3 uppercase tracking-wider font-headline font-semibold text-slate-900">Frequency</label>
          <div className="grid grid-cols-2 gap-3">
            <button className="py-3 rounded-xl border-2 border-secondary bg-secondary/5 text-secondary font-bold text-sm font-headline">Weekly (-15%)</button>
            <button className="py-3 rounded-xl border-2 border-slate-100 text-slate-500 font-bold text-sm font-headline hover:border-slate-200">One-time</button>
          </div>
        </div>
        
        <div className="pt-6 border-t border-slate-100 space-y-3 font-body">
          <div className="flex justify-between text-on-surface-variant">
            <span>Service Base Price</span>
            <span className="font-bold text-slate-900">KES 14,000.00</span>
          </div>
          <div className="flex justify-between text-on-surface-variant">
            <span>Weekly Discount</span>
            <span className="text-secondary font-bold font-semibold">-KES 2,100.00</span>
          </div>
          <div className="flex justify-between text-primary text-xl font-extrabold pt-3 font-headline border-t border-slate-100 mt-3 pt-3">
            <span>Total Price</span>
            <span>KES 11,900.00</span>
          </div>
        </div>
      </div>
      
      <button className="w-full bg-primary text-on-primary py-5 rounded-2xl font-bold text-lg hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-95 font-headline">
        Reserve Your Cleaning
      </button>
      <p className="text-center text-slate-400 text-sm mt-6 font-medium font-body">No charge until service is complete</p>
    </div>
  );
};

export default BookingSidebar;
