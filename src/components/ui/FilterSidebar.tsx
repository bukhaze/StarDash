import React from 'react';

const FilterSidebar = () => {
  return (
    <aside className="w-full lg:w-72 flex-shrink-0 animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="lg:sticky lg:top-24 space-y-8 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
        {/* Search Input */}
        <div className="space-y-3">
          <label className="block text-xs font-black uppercase tracking-wider text-slate-400 font-headline">Search Services</label>
          <div className="relative group">
            <input 
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/30 focus:bg-white transition-all outline-none font-medium text-slate-900 group-hover:bg-white shadow-inner" 
              placeholder="What do you need?" 
              type="text"
            />
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-blue-500 transition-colors">search</span>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-4">
          <label className="block text-xs font-black uppercase tracking-wider text-slate-400 font-headline">Category</label>
          <div className="space-y-2">
            {[
              { id: 'all', label: 'All Services', count: 12 },
              { id: 'cleaning', label: 'Cleaning & Hygiene', count: 5 },
              { id: 'laundry', label: 'Laundry & Restoration', count: 3 },
              { id: 'security', label: 'Elite Security', count: 2 },
              { id: 'specialized', label: 'Specialized Projects', count: 2 },
            ].map((cat, i) => (
              <label key={cat.id} className="flex items-center justify-between group cursor-pointer p-1.5 px-3 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    name="category"
                    className="rounded-full border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4 accent-blue-600"
                    defaultChecked={i === 0}
                  />
                  <span className="ml-3 text-sm font-semibold text-slate-600 group-hover:text-slate-900 transition-colors">{cat.label}</span>
                </div>
                <span className="text-[10px] font-black font-headline bg-slate-100 text-slate-400 px-2 py-0.5 rounded-lg group-hover:bg-blue-100 group-hover:text-blue-600 transition-all">{cat.count}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="block text-xs font-black uppercase tracking-wider text-slate-400 font-headline">Price Threshold</label>
            <span className="text-xs font-black text-blue-600 font-headline italic">KSh 1.5k - 45k+</span>
          </div>
          <div className="px-1">
            <input 
              className="w-full h-1.5 bg-slate-100 rounded-full appearance-none cursor-pointer accent-blue-600" 
              max="50000" 
              min="1500" 
              step="500"
              type="range"
            />
            <div className="flex justify-between mt-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <span>Min</span>
              <span>Max</span>
            </div>
          </div>
        </div>

        {/* Fast-Track Filter */}
        <div className="space-y-4 pt-4 border-t border-slate-50">
          <label className="block text-xs font-black uppercase tracking-wider text-slate-400 font-headline font-medium">Availability Signal</label>
          <div className="flex flex-wrap gap-2">
            <button className="flex-1 px-4 py-3 rounded-2xl border border-slate-100 text-[10px] font-black uppercase tracking-widest bg-blue-600 text-white shadow-lg shadow-blue-100 transition-all font-headline">Same Day</button>
            <button className="flex-1 px-4 py-3 rounded-2xl border border-slate-100 text-[10px] font-black uppercase tracking-widest bg-white text-slate-500 hover:bg-slate-50 transition-all font-headline">This Week</button>
          </div>
        </div>

        {/* Support Help */}
        <div className="bg-slate-900 rounded-2xl p-5 text-center space-y-3 relative overflow-hidden group/card shadow-xl">
          <div className="relative z-10 space-y-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 font-headline">Need Assistance?</p>
            <p className="text-xs text-white/60 font-medium leading-relaxed">Our ops hub is available to help match you with the right specialist.</p>
            <button className="w-full py-2.5 bg-white text-slate-900 rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-[1.05] transition-all font-headline">Direct Help</button>
          </div>
          <div className="absolute opacity-[0.05] -bottom-4 -right-4 scale-[2]">
             <span className="material-symbols-outlined text-[60px] text-white">support_agent</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
