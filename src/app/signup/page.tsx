"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Logo from '@/components/ui/Logo';
import Link from 'next/link';

const SignupNoticePage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 font-body p-6">
      <div className="w-full max-w-lg bg-white rounded-[3rem] p-16 shadow-2xl border border-slate-100 text-center space-y-10 group">
        <div className="flex justify-center">
          <Logo />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Public Registration Disabled</h1>
          <p className="text-slate-500 text-base leading-relaxed">
            StarDash is a managed professional service network. We no longer accept public customer signups to ensure the highest quality of care and security.
          </p>
        </div>

        <div className="p-8 bg-blue-50 rounded-[2rem] border border-blue-100 space-y-4">
          <h3 className="text-blue-600 font-bold uppercase tracking-widest text-[10px]">How to proceed</h3>
          <p className="text-slate-700 text-sm font-medium">To book a service, please browse our catalog and submit a direct service request. No account is required for customers.</p>
        </div>

        <div className="flex flex-col gap-4">
          <Link href="/services" className="bg-slate-900 text-white py-5 rounded-2xl font-bold text-sm uppercase tracking-widest shadow-xl hover:bg-slate-800 transition-all active:scale-95">
            Submit Service Request
          </Link>
          <Link href="/login" className="text-slate-400 hover:text-slate-900 text-xs font-bold uppercase tracking-widest py-2 transition-all">
            Management Login
          </Link>
        </div>

        <div className="pt-4">
           <p className="text-[10px] text-slate-300 font-bold uppercase tracking-[0.2em] italic">Official StarDash Operations Policy</p>
        </div>
      </div>
    </div>
  );
};

export default SignupNoticePage;
