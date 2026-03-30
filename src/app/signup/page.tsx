"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signup } from '@/app/actions/auth';
import Logo from '@/components/ui/Logo';

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
    <div className="min-h-screen flex font-body">
      {/* LEFT PANEL — Brand & Trust */}
      <div className="hidden lg:flex flex-col justify-between w-[45%] p-16 relative overflow-hidden bg-[#1a56db]">
        {/* Background Orbs */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-blue-400/20 blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-indigo-500/20 blur-[80px]" />
        
        {/* Logo */}
        <div className="relative z-10">
          <Logo isDark />
        </div>

        {/* Center Content */}
        <div className="space-y-10 relative z-10">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-white/30 text-white/80">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              Join the Network
            </div>
            <h2 className="text-5xl font-black text-white leading-tight tracking-tight">
              Premium home care,<br />just a click away.
            </h2>
            <p className="text-white/70 text-lg leading-relaxed max-w-sm">
              Create your free account today and start booking Nairobi&apos;s most trusted home service specialists.
            </p>
          </div>

          {/* Trust Signals */}
          <div className="space-y-4">
            {[
              { icon: 'verified', text: '50+ Background-verified specialists' },
              { icon: 'schedule', text: 'Flexible scheduling that works for you' },
              { icon: 'payments', text: 'Secure payments & transparent pricing' },
              { icon: 'shield_with_heart', text: 'Satisfaction guaranteed on every job' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-white text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
                </div>
                <p className="text-white/80 text-sm font-medium">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Tagline */}
        <div className="relative z-10">
          <p className="text-white/30 text-xs font-medium tracking-widest uppercase">
            StarDash · Nairobi, Kenya · Est. 2024
          </p>
        </div>
      </div>

      {/* RIGHT PANEL — Form */}
      <div className="flex-1 flex flex-col min-h-screen bg-white">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100">
          <div className="lg:hidden">
            <Logo />
          </div>
          <div className="hidden lg:block" />
          <Link href="/login" className="text-sm text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-2 font-medium">
            Already have an account? <span className="text-blue-600 font-bold">Sign in</span>
          </Link>
        </div>

        {/* Form Area */}
        <div className="flex-1 flex items-center justify-center px-8 py-12">
          <div className="w-full max-w-md space-y-8">
            
            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">Create your account</h1>
              <p className="text-slate-500 text-sm">Join the StarDash community and experience better home care.</p>
            </div>

            {/* Success State */}
            {success ? (
              <div className="bg-green-50 border border-green-200 p-8 rounded-[2.5rem] text-center space-y-4">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto text-white">
                  <span className="material-symbols-outlined text-3xl">check</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">Check your email</h3>
                <p className="text-slate-600 text-sm">{success}</p>
                <div className="pt-4">
                  <Link href="/login" className="inline-flex items-center gap-2 text-blue-600 font-bold hover:underline underline-offset-4">
                    Back to login
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </Link>
                </div>
              </div>
            ) : (
              <>
                {/* Error */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-2xl text-sm font-medium flex items-center gap-3">
                    <span className="material-symbols-outlined text-lg flex-shrink-0">error</span>
                    {error}
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSignup} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">First name</label>
                      <input 
                        type="text" 
                        name="first_name"
                        required
                        className="w-full border border-slate-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50 hover:bg-white placeholder:text-slate-400" 
                        placeholder="John" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Last name</label>
                      <input 
                        type="text" 
                        name="last_name"
                        required
                        className="w-full border border-slate-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50 hover:bg-white placeholder:text-slate-400" 
                        placeholder="Doe" 
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Email address</label>
                    <div className="relative">
                      <input 
                        type="email" 
                        name="email"
                        required
                        className="w-full border border-slate-200 rounded-xl px-4 py-3.5 pl-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50 hover:bg-white placeholder:text-slate-400" 
                        placeholder="you@example.com" 
                      />
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">mail</span>
                    </div>
                  </div>
                  
                  {/* Password */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Password</label>
                    <div className="relative">
                      <input 
                        type="password" 
                        name="password"
                        required
                        className="w-full border border-slate-200 rounded-xl px-4 py-3.5 pl-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50 hover:bg-white placeholder:text-slate-400 tracking-widest" 
                        placeholder="••••••••" 
                      />
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">lock</span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-medium px-1">Must be at least 8 characters long.</p>
                  </div>

                  <input type="hidden" name="role" value="customer" />

                  {/* Submit Button */}
                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 py-4 bg-[#1a56db] text-white rounded-xl font-bold text-sm transition-all duration-300 disabled:opacity-60 disabled:pointer-events-none hover:bg-blue-700 hover:shadow-lg active:scale-[0.98]"
                  >
                    {loading ? (
                      <>
                        <span className="material-symbols-outlined animate-spin text-base">progress_activity</span>
                        Creating account...
                      </>
                    ) : (
                      <>
                        Create free account
                        <span className="material-symbols-outlined text-base">arrow_forward</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-slate-400 text-center leading-relaxed font-medium">
                    By creating an account, you agree to StarDash&apos;s{' '}
                    <Link href="/terms" className="text-slate-600 hover:underline">Terms of Service</Link> and{' '}
                    <Link href="/privacy" className="text-slate-600 hover:underline">Privacy Policy</Link>.
                  </p>
                </form>

                {/* Divider */}
                <div className="space-y-5">
                  <div className="relative flex items-center gap-4">
                    <div className="flex-1 border-t border-slate-200" />
                    <span className="text-xs text-slate-400 font-medium">or join with</span>
                    <div className="flex-1 border-t border-slate-200" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center gap-3 py-3 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all">
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Google
                    </button>
                    <button className="flex items-center justify-center gap-3 py-3 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all">
                      <span className="material-symbols-outlined text-base text-slate-700">phone_iphone</span>
                      Apple
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-400">
            © 2024 StarDash. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-xs text-slate-400 hover:text-slate-700 transition-colors">Privacy</Link>
            <Link href="/terms" className="text-xs text-slate-400 hover:text-slate-700 transition-colors">Terms</Link>
            <Link href="/contact" className="text-xs text-slate-400 hover:text-slate-700 transition-colors">Support</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
