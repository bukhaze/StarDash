import React from 'react';

interface TrustBadgeProps {
  icon: string;
  title: string;
  description: string;
}

const TrustBadge: React.FC<TrustBadgeProps> = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center p-10 bg-slate-50 rounded-[3rem] border border-slate-100 shadow-sm hover:bg-white hover:shadow-2xl transition-all duration-700 group h-full">
      <div className="w-20 h-20 bg-[#2563eb]/10 text-[#2563eb] rounded-[2rem] flex items-center justify-center mb-10 transition-transform group-hover:scale-110 duration-500 shadow-xl shadow-[#2563eb]/5">
        <span className="material-symbols-outlined text-4xl">{icon}</span>
      </div>
      <h4 className="text-2xl font-black mb-4 tracking-tighter text-slate-900">{title}</h4>
      <p className="text-slate-500 text-base font-medium leading-relaxed font-body">{description}</p>
    </div>
  );
};

export default TrustBadge;
