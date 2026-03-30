"use client";

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { login } from '@/app/actions/auth';
import Logo from '@/components/ui/Logo';

const LoginContent = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

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

  return (
    <div className="min-h-screen flex font-body bg-slate-50 items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-20 bg-blue-500 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full opacity-10 bg-[#f97316] blur-[100px] pointer-events-none"></div>

      {/* Small Centered Card */}
      <div className="w-full max-w-[420px] bg-white rounded-3xl shadow-2xl border border-slate-100 p-10 relative z-10 animate-in fade-in zoom-in-95 duration-500">
        
        <div className="flex flex-col items-center text-center space-y-6 mb-10">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Logo />
          </Link>
          <div className="space-y-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Admin Portal</h1>
            <p className="text-slate-500 text-xs font-medium px-4">
              Enter your secure credentials to manage StarDash bookings.
            </p>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center gap-3 animate-in shake duration-300 mb-6">
            <span className="material-symbols-outlined text-base flex-shrink-0">error</span>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Email Connection</label>
            <div className="relative group">
              <input
                type="email"
                name="email"
                required
                className="w-full border border-slate-200 rounded-xl px-4 py-3.5 pl-11 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all bg-white hover:bg-slate-50"
                placeholder="bukhari@stardash.com"
              />
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg group-focus-within:text-blue-500 transition-colors">mail</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between px-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Security Key</label>
            </div>
            <div className="relative group">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                className="w-full border border-slate-200 rounded-xl px-4 py-3.5 pl-11 pr-11 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all bg-white hover:bg-slate-50 tracking-widest"
                placeholder="••••••••"
              />
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg group-focus-within:text-blue-500 transition-colors">lock</span>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 transition-colors"
              >
                <span className="material-symbols-outlined text-lg">{showPassword ? 'visibility_off' : 'visibility'}</span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-4 mt-2 bg-slate-900 rounded-xl font-black text-[11px] text-white uppercase tracking-[0.2em] shadow-lg shadow-slate-200 transition-all active:scale-[0.98] disabled:opacity-50 hover:bg-[#2563eb]"
          >
            {loading ? (
              <>
                <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                Authenticating...
              </>
            ) : (
              <>
                Login to Dashboard
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center">
            <Link href="/" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Return to Public Site
            </Link>
        </div>
      </div>
    </div>
  );
};

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50"><span className="material-symbols-outlined animate-spin text-blue-600 text-4xl">progress_activity</span></div>}>
      <LoginContent />
    </Suspense>
  );
}
