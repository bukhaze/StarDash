import React from 'react';

interface TrustBadgeProps {
  icon: string;
  title: string;
  description: string;
}

const TrustBadge: React.FC<TrustBadgeProps> = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center p-8 bg-surface-container-lowest rounded-3xl premium-shadow shadow-premium">
      <div className="w-16 h-16 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center mb-6">
        <span className="material-symbols-outlined text-3xl">{icon}</span>
      </div>
      <h4 className="text-lg font-bold mb-2 font-headline">{title}</h4>
      <p className="text-on-surface-variant text-sm">{description}</p>
    </div>
  );
};

export default TrustBadge;
