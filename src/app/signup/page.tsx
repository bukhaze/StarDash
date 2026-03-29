"use client";

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { signup } from '@/app/actions/auth';

const SignupPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);
    const result = await signup(formData);

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
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-secondary-container/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary-container/10 rounded-full blur-[120px]"></div>
        
        <div className="w-full max-w-xl relative z-10">
          <div className="bg-white/80 backdrop-blur-2xl p-12 rounded-[2.5rem] shadow-premium border border-white/50 space-y-10">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-extrabold tracking-tight text-primary font-headline">Join StarDash</h1>
              <p className="text-on-surface-variant font-body font-medium">Create your account to start booking premium home services.</p>
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
            
            <form onSubmit={handleSignup} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-extrabold uppercase tracking-widest text-on-surface-variant px-1 font-headline">First Name</label>
                  <div className="relative group">
                     <input 
                       type="text" 
                       name="first_name"
                       required
                       className="w-full bg-surface-container-low/50 border border-outline-variant/10 rounded-2xl px-5 py-4 pl-12 focus:ring-2 focus:ring-secondary/30 transition-all outline-none font-body group-hover:bg-white" 
                       placeholder="Jane" 
                     />
                     <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl">person</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-extrabold uppercase tracking-widest text-on-surface-variant px-1 font-headline">Last Name</label>
                  <div className="relative group">
                     <input 
                       type="text" 
                       name="last_name"
                       required
                       className="w-full bg-surface-container-low/50 border border-outline-variant/10 rounded-2xl px-5 py-4 pl-12 focus:ring-2 focus:ring-secondary/30 transition-all outline-none font-body group-hover:bg-white" 
                       placeholder="Doe" 
                     />
                     <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl">person</span>
                  </div>
                </div>
              </div>

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
              
              <div className="space-y-2">
                <label className="text-xs font-extrabold uppercase tracking-widest text-on-surface-variant px-1 font-headline">Password</label>
                <div className="relative group">
                   <input 
                     type="password" 
                     name="password"
                     required
                     className="w-full bg-surface-container-low/50 border border-outline-variant/10 rounded-2xl px-5 py-4 pl-12 focus:ring-2 focus:ring-secondary/30 transition-all outline-none font-body group-hover:bg-white" 
                     placeholder="••••••••" 
                   />
                   <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl">lock</span>
                </div>
              </div>

              <input type="hidden" name="role" value="customer" />

              <button 
                disabled={loading || !!success}
                className="w-full flex justify-center items-center gap-2 bg-primary text-white py-5 rounded-2xl font-bold font-headline text-lg shadow-premium hover:shadow-xl transition-all scale-[0.98] active:scale-95 bg-gradient-to-br from-primary to-primary-container disabled:opacity-50 disabled:pointer-events-none"
              >
                {loading ? (
                  <span className="material-symbols-outlined animate-spin">progress_activity</span>
                ) : 'Create Account'}
              </button>
            </form>
            
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-outline-variant/10"></div></div>
              <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold text-on-surface-variant bg-transparent px-4 font-headline">Or connect with</div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               <button className="flex items-center justify-center gap-3 bg-white border border-outline-variant/15 py-4 rounded-xl hover:bg-slate-50 transition-all font-bold text-sm shadow-sm active:scale-95">
                 <img src="https://lh3.googleusercontent.com/COxitqSgS1P-B82DcEM8a1v_6t665I9h6-v55s5H7jU_tXv60-rYf7_t60-rYf7_t60-rYf7_t60-r" className="w-5 h-5" alt="G" />
                 Google
               </button>
               <button className="flex items-center justify-center gap-3 bg-white border border-outline-variant/15 py-4 rounded-xl hover:bg-slate-50 transition-all font-bold text-sm shadow-sm active:scale-95">
                 <span className="material-symbols-outlined text-xl">apple</span>
                 Apple
               </button>
            </div>
            
            <p className="text-center font-body text-sm text-on-surface-variant mt-10">
              Already have an account? <Link href="/login" className="text-secondary font-bold hover:underline">Log in</Link>
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SignupPage;
