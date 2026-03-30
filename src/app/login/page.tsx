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
    <div className="min-h-screen flex font-body bg-white">
      {/* LEFT PANEL — Professional Branding */}
      <div className="hidden lg:flex flex-col justify-between w-[40%] p-16 relative overflow-hidden bg-slate-900 border-r border-slate-800">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10 bg-blue-500 blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full opacity-5 bg-white blur-[100px]"></div>

        <div>
          <Logo isDark />
        </div>

        <div className="space-y-8 relative z-10">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] border border-white/20 text-white/60 bg-white/5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
              Administrative Access Only
            </div>
            <h2 className="text-4xl font-bold text-white leading-tight tracking-tight">
              Manage StarDash Service Delivery
            </h2>
            <p className="text-slate-400 text-base leading-relaxed max-w-sm">
              The central portal for StarDash administrators and specialists to manage Nairobi bookings and field staff.
            </p>
          </div>

          <div className="space-y-4 pt-6">
            {[
              { icon: 'shield', text: 'Secure dispatch workflow management' },
              { icon: 'group', text: 'Personnel & workforce coordination' },
              { icon: 'account_balance', text: 'Financial reporting and audit logs' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-white/5 border border-white/10">
                  <span className="material-symbols-outlined text-white text-lg opacity-60">{item.icon}</span>
                </div>
                <p className="text-slate-300 text-sm font-medium">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-white/20 text-[10px] font-bold tracking-widest uppercase">
            StarDash · Nairobi, Kenya · Official Portal
          </p>
        </div>
      </div>

      {/* RIGHT PANEL — Form */}
      <div className="flex-1 flex flex-col min-h-screen bg-white">
        <div className="flex items-center justify-between px-10 py-8">
          <div className="lg:hidden">
            <Logo />
          </div>
          <div className="hidden lg:block" />
          <Link href="/" className="text-xs text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-2 font-bold uppercase tracking-widest">
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Public Site
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center px-10 py-12">
          <div className="w-full max-w-md space-y-10">

            <div className="space-y-3">
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Management Login</h1>
              <p className="text-slate-500 text-sm">
                Enter your credentials to access the administrative dashboard.
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 px-6 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest flex items-center gap-3 animate-in shake duration-300">
                <span className="material-symbols-outlined text-lg flex-shrink-0">error</span>
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 px-1">Email Connection</label>
                <div className="relative group">
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full border border-slate-100 rounded-2xl px-5 py-4 pl-12 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/20 transition-all bg-slate-50 hover:bg-slate-50 group-hover:bg-white"
                    placeholder="Staff Email"
                  />
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">mail</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 px-1">Password Key</label>
                </div>
                <div className="relative group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    required
                    className="w-full border border-slate-100 rounded-2xl px-5 py-4 pl-12 pr-12 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/20 transition-all bg-slate-50 hover:bg-slate-50 group-hover:bg-white tracking-widest"
                    placeholder="••••••••"
                  />
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">lock</span>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 transition-colors"
                  >
                    <span className="material-symbols-outlined text-lg">{showPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-4 py-5 bg-slate-900 rounded-2xl font-bold text-xs text-white uppercase tracking-[0.2em] shadow-xl shadow-slate-200 transition-all active:scale-[0.98] disabled:opacity-50 hover:bg-slate-800"
              >
                {loading ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                    Verifying...
                  </>
                ) : (
                  <>
                    Sign In to Dashboard
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </>
                )}
              </button>
            </form>

            <div className="bg-slate-50 rounded-2xl p-6 flex flex-col items-center text-center space-y-3 border border-slate-100">
               <span className="material-symbols-outlined text-slate-400" style={{ fontVariationSettings: "'FILL' 1" }}>gpp_maybe</span>
               <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
                  Notice: This is a restricted area. Access is limited to authorized StarDash staff and specialists.
               </p>
            </div>

          </div>
        </div>

        <div className="px-10 py-8 border-t border-slate-50 flex items-center justify-between opacity-50">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            © 2024 StarDash · Nairobi Headquarters
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">Privacy</Link>
            <Link href="/terms" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">Terms</Link>
          </div>
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
