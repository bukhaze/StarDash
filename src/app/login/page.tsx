"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { login } from '@/app/actions/auth';
import Logo from '@/components/ui/Logo';

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loginType, setLoginType] = useState<'customer' | 'admin'>('customer');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const type = searchParams.get('type') as any;
    if (['customer', 'admin'].includes(type)) {
      setLoginType(type);
    }
  }, [searchParams]);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    const result = await login(formData);
    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else if (result.success && result.redirectUrl) {
      router.push(result.redirectUrl);
    }
  }

  const isAdmin = loginType === 'admin';

  return (
    <div className="min-h-screen flex font-body">
      {/* LEFT PANEL — Brand & Trust */}
      <div
        className={`hidden lg:flex flex-col justify-between w-[45%] p-16 relative overflow-hidden transition-all duration-700 ${
          isAdmin
            ? 'bg-slate-900'
            : 'bg-[#1a56db]'
        }`}
      >
        {/* Background Orbs */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-10"
          style={{ background: isAdmin ? 'radial-gradient(circle, #fff 0%, transparent 70%)' : 'radial-gradient(circle, #60a5fa 0%, transparent 70%)' }}>
        </div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #fff 0%, transparent 70%)' }}>
        </div>

        {/* Logo */}
        <div>
          <Logo isDark />
        </div>

        {/* Center Content */}
        <div className="space-y-10 relative z-10">
          <div className="space-y-4">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border ${
              isAdmin ? 'border-white/20 text-white/70' : 'border-white/30 text-white/80'
            }`}>
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              {isAdmin ? 'Operations Center' : 'Customer Portal'}
            </div>
            <h2 className="text-5xl font-black text-white leading-tight tracking-tight">
              {isAdmin
                ? 'Manage your entire operation.'
                : 'Premium home care, at your service.'
              }
            </h2>
            <p className="text-white/60 text-lg leading-relaxed max-w-sm">
              {isAdmin
                ? 'Control requests, dispatch workers, monitor performance and grow your network — all from one place.'
                : 'Request cleaning, laundry, security and more. Our team handles everything, so you don\'t have to.'
              }
            </p>
          </div>

          {/* Trust Signals */}
          <div className="space-y-4">
            {(isAdmin
              ? [
                  { icon: 'shield', text: 'Full control over the dispatch workflow' },
                  { icon: 'people', text: 'Manage and register your specialist network' },
                  { icon: 'analytics', text: 'Revenue analytics and performance reports' },
                ]
              : [
                  { icon: 'verified', text: 'All specialists are background-verified' },
                  { icon: 'schedule', text: 'Book a service in under 2 minutes' },
                  { icon: 'support_agent', text: 'Dedicated support 7 days a week' },
                ]
            ).map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                  isAdmin ? 'bg-white/10' : 'bg-white/15'
                }`}>
                  <span className="material-symbols-outlined text-white text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
                </div>
                <p className="text-white/80 text-sm font-medium">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Tagline */}
        <div>
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
          <Link href="/" className="text-sm text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-2 font-medium">
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Back to Home
          </Link>
        </div>

        {/* Form Area */}
        <div className="flex-1 flex items-center justify-center px-8 py-12">
          <div className="w-full max-w-md space-y-8">

            {/* Role Toggle */}
            <div className="bg-slate-100 p-1.5 rounded-2xl flex gap-1">
              <button
                onClick={() => { setLoginType('customer'); setError(null); }}
                className={`flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 ${
                  !isAdmin
                    ? 'bg-white text-[#1a56db] shadow-md'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: !isAdmin ? "'FILL' 1" : undefined }}>home_work</span>
                Customer Login
              </button>
              <button
                onClick={() => { setLoginType('admin'); setError(null); }}
                className={`flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 ${
                  isAdmin
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: isAdmin ? "'FILL' 1" : undefined }}>admin_panel_settings</span>
                Admin Login
              </button>
            </div>

            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                {isAdmin ? 'Admin Portal' : 'Welcome back'}
              </h1>
              <p className="text-slate-500 text-sm">
                {isAdmin
                  ? 'Sign in to access the StarDash operations center.'
                  : 'Sign in to manage your home services and bookings.'
                }
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-2xl text-sm font-medium flex items-center gap-3">
                <span className="material-symbols-outlined text-lg flex-shrink-0">error</span>
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              <input type="hidden" name="role" value={loginType} />

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Email address</label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full border border-slate-200 rounded-xl px-4 py-3.5 pl-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50 hover:bg-white placeholder:text-slate-400"
                    placeholder={isAdmin ? 'admin@stardash.com' : 'you@example.com'}
                  />
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">mail</span>
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-slate-700">Password</label>
                  <Link href="/forgot-password" className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    required
                    className="w-full border border-slate-200 rounded-xl px-4 py-3.5 pl-12 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50 hover:bg-white placeholder:text-slate-400 tracking-widest"
                    placeholder="••••••••"
                  />
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">lock</span>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors"
                  >
                    <span className="material-symbols-outlined text-lg">{showPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <label htmlFor="remember" className="text-sm text-slate-600 cursor-pointer select-none">
                  Keep me signed in
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-sm text-white transition-all duration-300 disabled:opacity-60 disabled:pointer-events-none hover:opacity-90 hover:shadow-lg active:scale-[0.98] ${
                  isAdmin
                    ? 'bg-slate-900 hover:bg-slate-800'
                    : 'bg-[#1a56db] hover:bg-blue-700'
                }`}
              >
                {loading ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-base">progress_activity</span>
                    Signing in...
                  </>
                ) : (
                  <>
                    {isAdmin ? 'Access Operations Center' : 'Sign in to my account'}
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </>
                )}
              </button>
            </form>

            {/* Divider (Customer only) */}
            {!isAdmin && (
              <div className="space-y-5">
                <div className="relative flex items-center gap-4">
                  <div className="flex-1 border-t border-slate-200" />
                  <span className="text-xs text-slate-400 font-medium">or continue with</span>
                  <div className="flex-1 border-t border-slate-200" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-3 py-3 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all">
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                  </button>
                  <button className="flex items-center justify-center gap-3 py-3 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all">
                    <span className="material-symbols-outlined text-base text-slate-700">phone_iphone</span>
                    Apple
                  </button>
                </div>
              </div>
            )}

            {/* Sign Up Link (Customer only) */}
            {!isAdmin && (
              <p className="text-center text-sm text-slate-500">
                Don't have an account?{' '}
                <Link href="/signup" className="text-blue-600 hover:text-blue-800 font-semibold transition-colors">
                  Create one free
                </Link>
              </p>
            )}

            {/* Admin Notice */}
            {isAdmin && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
                <span className="material-symbols-outlined text-amber-600 text-lg flex-shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
                <p className="text-amber-800 text-xs leading-relaxed font-medium">
                  This portal is restricted to StarDash administrators only. Unauthorized access attempts are logged and monitored.
                </p>
              </div>
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

export default LoginPage;
