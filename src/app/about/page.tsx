import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-surface-container-lowest">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary pt-32 pb-24 px-8 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/20 blur-[100px] -z-0"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-white/5 blur-[80px] -z-0"></div>
          
          <div className="max-w-4xl mx-auto relative z-10 space-y-8">
            <span className="bg-white/10 text-white border border-white/20 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest font-headline">
              Our Story
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight font-headline">
              Redefining <span className="text-secondary-fixed">clean</span> for Nairobi's finest homes.
            </h1>
            <p className="text-xl text-white/80 font-body leading-relaxed max-w-2xl mx-auto">
              StarDash was born out of a simple need: reliable, high-quality, and transparent home services. We are building the city's premier digital concierge.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-24 px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="aspect-square bg-surface-container-low rounded-[3rem] overflow-hidden shadow-premium relative group">
             <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
             <img 
               src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2670&auto=format&fit=crop" 
               alt="Cleaning in action" 
               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
             />
          </div>
          
          <div className="space-y-8">
            <h2 className="text-4xl font-extrabold text-primary font-headline">Founded in Nairobi, crafted for excellence.</h2>
            <div className="space-y-6 text-lg text-on-surface-variant font-body leading-relaxed">
              <p>
                As a fast-paced city, Nairobi demands efficiency without compromising on quality. StarDash was founded by <strong>Nimca Abdirashid</strong> to bridge the gap between busy homeowners and meticulous, vetted professionals.
              </p>
              <p>
                We handle the logistics, background checks, and quality assurance so you don't have to. From deep apartment cleaning to delicate sofa shampoos, we handle your home perfectly.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-outline-variant/10">
               <div>
                  <h4 className="text-5xl font-extrabold text-secondary font-headline">10k+</h4>
                  <p className="text-sm font-bold uppercase tracking-widest text-on-surface-variant mt-2 font-headline">Homes Cleaned</p>
               </div>
               <div>
                  <h4 className="text-5xl font-extrabold text-secondary font-headline">500+</h4>
                  <p className="text-sm font-bold uppercase tracking-widest text-on-surface-variant mt-2 font-headline">Vetted Pros</p>
               </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-surface-container px-8 py-24 text-center">
          <h2 className="text-3xl font-bold font-headline text-primary mb-6">Experience the StarDash difference</h2>
          <button className="bg-primary text-white font-bold font-headline px-10 py-4 rounded-xl shadow-premium hover:shadow-xl active:scale-95 transition-all">
            Book Your First Service
          </button>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
