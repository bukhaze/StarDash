import React from 'react';
import { createSupabaseServerClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';

export default async function WorkerDashboard() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'worker') redirect('/dashboard');

  return (
    <div className="flex flex-col min-h-screen bg-surface-container-lowest">
      <Navbar />
      <main className="pt-24 pb-32 px-4 md:px-8 max-w-6xl mx-auto w-full flex-grow">
        <h1 className="text-3xl font-extrabold font-headline mb-8 text-primary">Worker Portal</h1>
        
        <div className="bg-white p-8 rounded-3xl shadow-premium border border-outline-variant/5 text-center">
          <span className="material-symbols-outlined text-6xl text-secondary mb-4">construction</span>
          <h2 className="text-2xl font-bold font-headline mb-2">Portal Under Construction</h2>
          <p className="text-on-surface-variant font-body mb-6 max-w-md mx-auto">
            Welcome to the StarDash worker network! Your dedicated tools for managing jobs, schedule, and earnings are currently being finalized.
          </p>
        </div>
      </main>
    </div>
  );
}
