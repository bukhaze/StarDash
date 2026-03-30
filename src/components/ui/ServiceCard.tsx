import React from 'react';
import Link from 'next/link';

interface ServiceCardProps {
  title: string;
  description: string;
  price: string;
  rating: string;
  reviews: string;
  image: string;
  category?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, price, rating, reviews, image, category }) => {
  return (
    <div className="group bg-white rounded-[3rem] overflow-hidden hover:shadow-2xl transition-all duration-700 border border-slate-100 flex flex-col h-full relative">
      {/* Image Container */}
      <div className="h-64 overflow-hidden relative">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
        />
        {category && (
          <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-xl px-4 py-2 rounded-2xl text-[10px] font-black tracking-widest text-[#2563eb] shadow-xl border border-white/20 uppercase">
            {category}
          </div>
        )}
        <div className="absolute bottom-6 right-6 bg-[#f97316] text-white px-4 py-2 rounded-2xl text-[10px] font-black flex items-center shadow-2xl uppercase tracking-widest">
          <span className="material-symbols-outlined text-xs mr-1.5" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
          {rating} ({reviews})
        </div>
      </div>

      {/* Content */}
      <div className="p-10 flex flex-col flex-1 space-y-8">
        <div className="space-y-4 flex-1">
          <h3 className="text-2xl font-black text-slate-900 leading-tight group-hover:text-[#2563eb] transition-colors tracking-tight">{title}</h3>
          <p className="text-slate-500 text-base font-medium leading-relaxed font-body">{description}</p>
        </div>
        
        <div className="pt-8 border-t border-slate-50 flex justify-between items-center bg-white">
          <div className="space-y-1">
             <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Professional Rate</p>
             <span className="font-black text-slate-900 text-3xl tracking-tighter">{price}</span>
          </div>
          <Link 
            href="#request-form" 
            className="w-16 h-16 rounded-2xl bg-slate-900 text-white hover:bg-[#2563eb] transition-all duration-500 flex items-center justify-center shadow-xl active:scale-95 group-hover:shadow-[#2563eb]/10"
          >
            <span className="material-symbols-outlined font-black text-xl">arrow_forward</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
