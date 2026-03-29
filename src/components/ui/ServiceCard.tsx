import React from 'react';
import Image from 'next/image';

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
    <div className="group bg-surface-container-low rounded-2xl overflow-hidden hover:translate-y-[-8px] transition-all duration-300 shadow-sm hover:shadow-premium">
      <div className="h-64 overflow-hidden relative">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary flex items-center shadow-sm">
          <span className="material-symbols-outlined text-sm mr-1 text-[#FFB800]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
          {rating} ({reviews})
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 font-headline">{title}</h3>
        <p className="text-on-surface-variant text-sm mb-4 line-clamp-2">{description}</p>
        <div className="flex justify-between items-center">
          <span className="font-bold text-secondary">From {price}</span>
          <button className="p-2 rounded-full bg-white text-primary hover:bg-primary hover:text-white transition-colors border border-outline-variant/30">
            <span className="material-symbols-outlined">add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
