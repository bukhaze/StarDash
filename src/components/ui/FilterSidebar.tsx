import React from 'react';

const FilterSidebar = () => {
  return (
    <aside className="w-72 flex-shrink-0 hidden lg:block">
      <div className="sticky top-28 space-y-8 bg-surface-container-low p-6 rounded-xl">
        {/* Search Input */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-3 font-headline">Search Services</label>
          <div className="relative">
            <input 
              className="w-full bg-surface-container-high border-none rounded-lg py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-secondary/30 focus:bg-surface-container-lowest transition-all outline-none" 
              placeholder="What do you need?" 
              type="text"
            />
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
          </div>
        </div>

        {/* Categories */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-4 font-headline">Category</label>
          <div className="space-y-3">
            {['Cleaning', 'Laundry', 'Security', 'Specialized'].map((category) => (
              <label key={category} className="flex items-center group cursor-pointer">
                <input 
                  type="checkbox" 
                  className="rounded border-outline-variant text-secondary focus:ring-secondary w-5 h-5 accent-secondary"
                  defaultChecked={category === 'Cleaning'}
                />
                <span className="ml-3 text-sm text-on-surface group-hover:text-secondary transition-colors font-body">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Rating */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-4 font-headline">Rating</label>
          <button className="flex items-center justify-between w-full p-3 rounded-lg bg-white border border-outline-variant/15 text-sm hover:border-secondary/30 transition-all shadow-sm">
            <span className="flex items-center text-on-surface">
              <span className="material-symbols-outlined text-[#FFB800] mr-2" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              4.0 & Above
            </span>
            <span className="material-symbols-outlined text-xs">keyboard_arrow_down</span>
          </button>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-4 font-headline">Price Range</label>
          <input 
            className="w-full h-1.5 bg-surface-container-highest rounded-full appearance-none cursor-pointer accent-secondary" 
            max="500" 
            min="0" 
            type="range"
          />
          <div className="flex justify-between mt-2 text-xs font-medium text-on-surface-variant">
            <span>$0</span>
            <span>$500+</span>
          </div>
        </div>

        {/* Availability */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-4 font-headline">Availability</label>
          <div className="flex flex-wrap gap-2">
            <button className="px-4 py-2 rounded-full border border-outline-variant/15 text-xs font-medium bg-white text-on-surface hover:border-secondary transition-all shadow-sm">Today</button>
            <button className="px-4 py-2 rounded-full border border-outline-variant/15 text-xs font-medium bg-secondary text-white shadow-sm">This Week</button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
