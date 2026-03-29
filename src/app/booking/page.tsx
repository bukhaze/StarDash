"use client";

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

const BookingPage = () => {
  const [step, setStep] = useState(2); // Starting at Step 2 based on the design I have
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [date, setDate] = useState('2024-10-03');
  const [time, setTime] = useState('09:30 AM');
  const [neighborhood, setNeighborhood] = useState('Westlands');
  const [apartment, setApartment] = useState('');
  const [street, setStreet] = useState('');
  
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestEmail, setGuestEmail] = useState('');

  const selectedServiceId = 'c7e1dbab-bd8e-4f24-9bbf-01584041bcca'; // Dummy uuid for real backend matching later or dynamic params
  const totalAmount = '4750';

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleBookingSubmit = async () => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('date', date);
    formData.append('time', time);
    formData.append('neighborhood', neighborhood);
    formData.append('apartment', apartment);
    formData.append('street', street);
    formData.append('service_id', selectedServiceId);
    formData.append('total_amount', totalAmount);
    formData.append('guest_name', guestName);
    formData.append('guest_phone', guestPhone);
    formData.append('guest_email', guestEmail);

    const { submitBooking } = await import('@/app/actions/booking');
    const result = await submitBooking(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else {
      window.location.href = '/dashboard';
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="pt-20 md:pt-32 pb-24 px-4 md:px-8 max-w-7xl mx-auto w-full flex-grow">
        {/* Step Indicator */}
        <div className="mb-10 md:mb-16">
          <div className="flex items-center justify-between max-w-xl mx-auto relative px-2 md:px-6">
            {/* Progress Line */}
            <div className="absolute top-5 left-8 right-8 h-[2px] bg-surface-container-highest -z-10">
               <div 
                className="h-full bg-secondary transition-all duration-500"
                style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
              ></div>
            </div>
            
            {/* Steps */}
            {[
              { id: 1, label: 'Details', icon: 'check' },
              { id: 2, label: 'Schedule', icon: '2' },
              { id: 3, label: 'Payment', icon: '3' }
            ].map((s) => (
              <div key={s.id} className="flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                  step > s.id ? 'bg-secondary text-white shadow-lg' : 
                  step === s.id ? 'bg-secondary text-white ring-4 ring-secondary-container' : 
                  'bg-surface-container-highest text-on-surface-variant'
                }`}>
                  {step > s.id ? <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check</span> : s.icon}
                </div>
                <span className={`text-[10px] md:text-xs font-bold uppercase tracking-wider ${
                  step >= s.id ? 'text-secondary' : 'text-on-surface-variant'
                }`}>
                   {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {error && (
          <div className="mb-8 bg-error-container text-error px-4 py-3 rounded-xl text-sm font-bold border border-error/20 flex items-center gap-3">
            <span className="material-symbols-outlined text-xl">error</span>
            {error}
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* Left Column: Form Content */}
          <div className="w-full lg:flex-1 space-y-8 md:space-y-10 order-2 lg:order-1">
            {step === 2 && (
              <>
                {/* Section: When */}
                <section className="bg-white p-5 sm:p-8 rounded-[2rem] shadow-premium border border-outline-variant/5">
                  <div className="flex items-center gap-3 mb-8">
                    <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_month</span>
                    <h2 className="text-2xl font-bold font-headline tracking-tight">Pick a Date & Time</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Simplified Calendar Placeholder */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center px-4 py-2 bg-surface-container-low rounded-xl">
                        <span className="font-bold text-on-surface font-headline">October 2024</span>
                        <div className="flex gap-2">
                          <button className="material-symbols-outlined p-1 hover:bg-surface-container-high rounded-lg transition-all">chevron_left</button>
                          <button className="material-symbols-outlined p-1 hover:bg-surface-container-high rounded-lg transition-all">chevron_right</button>
                        </div>
                      </div>
                      <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold font-headline text-on-surface-variant uppercase mb-4">
                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => <span key={d}>{d}</span>)}
                        <button className="h-10 flex items-center justify-center rounded-xl opacity-20">29</button>
                        <button className="h-10 flex items-center justify-center rounded-xl opacity-20">30</button>
                        <button className="h-10 flex items-center justify-center rounded-xl hover:bg-secondary/10 transition-all">1</button>
                        <button className="h-10 flex items-center justify-center rounded-xl hover:bg-secondary/10 transition-all">2</button>
                        <button className="h-10 flex items-center justify-center rounded-xl bg-secondary text-white font-bold shadow-md shadow-secondary/10">3</button>
                        {[4,5,6,7,8,9,10,11,12].map(d => (
                          <button key={d} className="h-10 flex items-center justify-center rounded-xl hover:bg-secondary/10 transition-all">{d}</button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Time Selection */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-4 font-headline">Morning</h3>
                        <div className="flex flex-wrap gap-2">
                          <button onClick={() => setTime('08:00 AM')} className={`px-4 py-3 rounded-xl text-sm font-medium transition-all font-body ${time === '08:00 AM' ? 'bg-secondary text-white font-bold shadow-md shadow-secondary/10' : 'bg-surface-container-low text-on-surface hover:bg-secondary/10'}`}>08:00 AM</button>
                          <button onClick={() => setTime('09:30 AM')} className={`px-4 py-3 rounded-xl text-sm font-medium transition-all font-body ${time === '09:30 AM' ? 'bg-secondary text-white font-bold shadow-md shadow-secondary/10' : 'bg-surface-container-low text-on-surface hover:bg-secondary/10'}`}>09:30 AM</button>
                          <button onClick={() => setTime('11:00 AM')} className={`px-4 py-3 rounded-xl text-sm font-medium transition-all font-body ${time === '11:00 AM' ? 'bg-secondary text-white font-bold shadow-md shadow-secondary/10' : 'bg-surface-container-low text-on-surface hover:bg-secondary/10'}`}>11:00 AM</button>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-4 font-headline">Afternoon</h3>
                        <div className="flex flex-wrap gap-2">
                          <button onClick={() => setTime('01:00 PM')} className={`px-4 py-3 rounded-xl text-sm font-medium transition-all font-body ${time === '01:00 PM' ? 'bg-secondary text-white font-bold shadow-md shadow-secondary/10' : 'bg-surface-container-low text-on-surface hover:bg-secondary/10'}`}>01:00 PM</button>
                          <button onClick={() => setTime('02:30 PM')} className={`px-4 py-3 rounded-xl text-sm font-medium transition-all font-body ${time === '02:30 PM' ? 'bg-secondary text-white font-bold shadow-md shadow-secondary/10' : 'bg-surface-container-low text-on-surface hover:bg-secondary/10'}`}>02:30 PM</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Section: Guest Details */}
                <section className="bg-white p-8 rounded-3xl shadow-premium border border-outline-variant/5">
                  <div className="flex items-center gap-3 mb-8">
                    <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
                    <h2 className="text-2xl font-bold font-headline tracking-tight">Your Information</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-xs font-extrabold uppercase tracking-wider text-on-surface-variant px-1 font-headline">Full Name</label>
                       <input value={guestName} onChange={(e) => setGuestName(e.target.value)} required className="w-full bg-surface-container-low border-none rounded-2xl px-5 py-4 text-on-surface focus:ring-2 focus:ring-secondary/30 transition-all outline-none font-body" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-extrabold uppercase tracking-wider text-on-surface-variant px-1 font-headline">Phone Number</label>
                       <input value={guestPhone} onChange={(e) => setGuestPhone(e.target.value)} required className="w-full bg-surface-container-low border-none rounded-2xl px-5 py-4 text-on-surface focus:ring-2 focus:ring-secondary/30 transition-all outline-none font-body" placeholder="0723 531 085" />
                    </div>
                  </div>
                </section>

                {/* Section: Where */}
                <section className="bg-white p-5 sm:p-8 rounded-[2rem] shadow-premium border border-outline-variant/5">
                  <div className="flex items-center gap-3 mb-8">
                    <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                    <h2 className="text-2xl font-bold font-headline tracking-tight">Service Location</h2>
                  </div>
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-extrabold uppercase tracking-wider text-on-surface-variant px-1 font-headline">Neighborhood</label>
                        <select value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} className="w-full bg-surface-container-low border-none rounded-2xl px-5 py-4 text-on-surface focus:ring-2 focus:ring-secondary/30 transition-all outline-none font-body">
                          <option>Westlands</option>
                          <option>Kilimani</option>
                          <option>Lavington</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-extrabold uppercase tracking-wider text-on-surface-variant px-1 font-headline">Apartment / Suite</label>
                        <input value={apartment} onChange={(e) => setApartment(e.target.value)} className="w-full bg-surface-container-low border-none rounded-2xl px-5 py-4 text-on-surface focus:ring-2 focus:ring-secondary/30 transition-all outline-none font-body" placeholder="B4, Azure Heights" type="text" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-extrabold uppercase tracking-wider text-on-surface-variant px-1 font-headline">Street Address</label>
                      <input value={street} onChange={(e) => setStreet(e.target.value)} className="w-full bg-surface-container-low border-none rounded-2xl px-5 py-4 text-on-surface focus:ring-2 focus:ring-secondary/30 transition-all outline-none font-body" placeholder="Start typing your address..." type="text" />
                    </div>
                  </div>
                </section>
              </>
            )}

            {step === 3 && (
              <section className="bg-white p-5 sm:p-8 rounded-[2rem] shadow-premium border border-outline-variant/5">
                <div className="flex items-center gap-3 mb-8">
                  <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
                  <h2 className="text-2xl font-bold font-headline tracking-tight">Confirm & Book</h2>
                </div>
                
                <div className="space-y-6">
                  <div className="p-5 bg-surface-container-lowest border border-outline-variant/10 flex items-start gap-4 rounded-2xl">
                    <span className="material-symbols-outlined text-green-500 bg-green-50 p-2 rounded-full">info</span>
                    <div>
                      <h4 className="font-bold text-sm">Pay After Service</h4>
                      <p className="text-on-surface-variant text-sm font-medium mt-1">
                        You won't be charged now. Place your booking request, and you can pay the worker directly upon satisfactory completion of your premium service via safe local gateways (M-Pesa or Cash).
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Step Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">
              <button 
                onClick={prevStep}
                disabled={step === 1}
                className="w-full sm:w-auto flex items-center justify-center gap-2 text-on-surface font-bold px-8 py-4 rounded-xl hover:bg-surface-container-low transition-all disabled:opacity-30 disabled:pointer-events-none font-headline order-2 sm:order-1"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                Back
              </button>
              
              {step < 3 ? (
                <button 
                  onClick={nextStep}
                  className="w-full sm:w-auto bg-primary text-white font-bold px-12 py-4 rounded-2xl shadow-premium hover:shadow-xl transition-all scale-95 active:scale-90 flex items-center justify-center gap-3 font-headline order-1 sm:order-2"
                >
                  Continue to Payment
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              ) : (
                <button 
                  onClick={handleBookingSubmit}
                  disabled={loading}
                  className="w-full sm:w-auto bg-secondary text-white font-extrabold px-12 py-4 rounded-2xl shadow-premium shadow-secondary/20 hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3 font-headline disabled:opacity-50 order-1 sm:order-2"
                >
                  {loading ? <span className="material-symbols-outlined animate-spin">progress_activity</span> : 'Place Booking Request'}
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Summary Card */}
          <div className="w-full lg:w-96 sticky top-28 order-1 lg:order-2">
            <div className="bg-white rounded-[2rem] shadow-premium overflow-hidden border border-outline-variant/5">
              <div className="p-8 border-b border-surface-container-low bg-surface-container-lowest/50">
                <h3 className="text-xl font-bold font-headline tracking-tight">Booking Summary</h3>
              </div>
              <div className="p-8 space-y-8">
                {/* Service Info */}
                <div className="flex gap-4">
                  <div className="h-20 w-20 rounded-2xl bg-surface-container-low flex-shrink-0 overflow-hidden shadow-sm">
                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_oAMyxocTYOvvSdqoyn06pdFW1o6-3MqlVzf5U40LfiKaE_K7f6qKqKX4AD4tT53cGb7m3PCWLj6l-6W5qbqeguir_i1r1aNE03QbxBtedt-B6Jdm2SmxHpOWxPlZ5pi7D8oFgoJHBNM8rSMkmO1QkBTBjv9Ut9QjcpzrnY1PAYvNiBMzY-308mFyJS8cU4gvcCbRyvKYHL5fIa4XItTJkydMHJhrQHuXmXWjevnJAZTQ1NTb20vGdsDVs8rPs1dcGPTXCZFfO8M" alt="Service" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="font-bold text-on-surface font-headline leading-tight">Premium Deep Clean</h4>
                    <p className="text-sm text-on-surface-variant font-body">3 BR • 2 BA • Westlands</p>
                  </div>
                </div>

                {/* Details List */}
                <div className="space-y-5 pt-2 border-t border-surface-container-low mt-4">
                  {[
                    { icon: 'calendar_today', label: 'Date', value: date },
                    { icon: 'schedule', label: 'Time', value: time },
                    { icon: 'location_on', label: 'Location', value: neighborhood }
                  ].map(item => (
                    <div key={item.label} className="flex justify-between items-center bg-surface-container-lowest p-1 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-secondary text-sm">{item.icon}</span>
                        <span className="text-sm text-on-surface-variant font-medium font-body">{item.label}</span>
                      </div>
                      <span className="text-sm font-bold text-on-surface font-headline">{item.value}</span>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="pt-8 border-t border-slate-100 space-y-4">
                  <div className="flex justify-between text-sm font-body">
                    <span className="text-on-surface-variant">Base Rate</span>
                    <span className="font-bold text-on-surface">KES 4,500</span>
                  </div>
                  <div className="flex justify-between text-sm font-body">
                    <span className="text-on-surface-variant">Service Fee</span>
                    <span className="font-bold text-on-surface">KES 250</span>
                  </div>
                  <div className="flex justify-between pt-4 border-t border-slate-100">
                    <span className="font-bold text-xl font-headline">Total</span>
                    <span className="font-extrabold text-3xl tracking-tighter font-headline">KES 4,750</span>
                  </div>
                </div>

                {/* StarDash Guarantee */}
                <div className="bg-secondary/5 p-5 rounded-2xl flex items-center gap-4 border border-secondary/10">
                  <div className="bg-white p-2 rounded-xl shadow-sm">
                    <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-secondary font-headline">StarDash Guarantee</p>
                    <p className="text-[10px] text-on-surface-variant font-body leading-tight">Insured & vetted professionals only.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookingPage;
