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
    <div className="group bg-white rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col h-full">
      {/* Image Container */}
      <div className="h-56 overflow-hidden relative">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {category && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-bold tracking-wider text-slate-800 shadow-sm border border-white/20 uppercase">
            {category}
          </div>
        )}
        <div className="absolute bottom-4 right-4 bg-blue-600 text-white px-3 py-1.5 rounded-xl text-[10px] font-bold flex items-center shadow-lg uppercase tracking-wider">
          <span className="material-symbols-outlined text-xs mr-1" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
          {rating} ({reviews})
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="space-y-2 flex-1">
          <h3 className="text-xl font-black text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">{title}</h3>
          <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">{description}</p>
        </div>
        
        <div className="pt-5 border-t border-slate-50 mt-4 flex justify-between items-center">
          <div className="space-y-0.5">
             <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Starting from</p>
             <span className="font-black text-slate-900 text-xl tracking-tight">{price}</span>
          </div>
          <Link 
            href="/signup" 
            className="w-12 h-12 rounded-2xl bg-slate-900 text-white hover:bg-blue-600 transition-all duration-300 flex items-center justify-center shadow-md active:scale-95"
          >
            <span className="material-symbols-outlined font-bold text-lg">arrow_forward</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
