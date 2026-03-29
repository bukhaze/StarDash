"use client";

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { resetPassword } from '@/app/actions/auth';

const ForgotPasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleReset(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);
    const result = await resetPassword(formData);

    if (result.error) {
       setError(result.error);
    } else if (result.success && result.message) {
       setSuccess(result.message);
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center pt-32 pb-24 px-8 relative overflow-hidden bg-surface">
        {/* Background Visuals */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary-container/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary-container/10 rounded-full blur-[120px]"></div>
        
        <div className="w-full max-w-xl relative z-10">
          <div className="bg-white/80 backdrop-blur-2xl p-12 rounded-[2.5rem] shadow-premium border border-white/50 space-y-10">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-extrabold tracking-tight text-primary font-headline">Reset Password</h1>
              <p className="text-on-surface-variant font-body font-medium">Enter your email and we'll send you instructions to reset your password.</p>
            </div>

            {error && (
              <div className="bg-error-container text-error px-4 py-3 rounded-xl text-sm font-bold border border-error/20 flex items-center gap-3">
                <span className="material-symbols-outlined text-xl">error</span>
                {error}
              </div>
            )}

            {success && (
              <div className="bg-secondary/10 text-secondary px-4 py-3 rounded-xl text-sm font-bold border border-secondary/20 flex items-center gap-3">
                <span className="material-symbols-outlined text-xl">mark_email_read</span>
                {success}
              </div>
            )}
            
            <form onSubmit={handleReset} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-extrabold uppercase tracking-widest text-on-surface-variant px-1 font-headline">Email Address</label>
                <div className="relative group">
                   <input 
                     type="email" 
                     name="email"
                     required
                     className="w-full bg-surface-container-low/50 border border-outline-variant/10 rounded-2xl px-5 py-4 pl-12 focus:ring-2 focus:ring-secondary/30 transition-all outline-none font-body group-hover:bg-white" 
                     placeholder="name@example.com" 
                   />
                   <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl">mail</span>
                </div>
              </div>

              <button 
                disabled={loading || !!success}
                className="w-full flex justify-center items-center gap-2 bg-primary text-white py-5 rounded-2xl font-bold font-headline text-lg shadow-premium hover:shadow-xl transition-all scale-[0.98] active:scale-95 bg-gradient-to-br from-primary to-primary-container disabled:opacity-50 disabled:pointer-events-none"
              >
                {loading ? (
                  <span className="material-symbols-outlined animate-spin">progress_activity</span>
                ) : 'Send Reset Link'}
              </button>
            </form>
            
            <p className="text-center font-body text-sm text-on-surface-variant mt-10">
              Remember your password? <Link href="/login" className="text-secondary font-bold hover:underline">Log in</Link>
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ForgotPasswordPage;
