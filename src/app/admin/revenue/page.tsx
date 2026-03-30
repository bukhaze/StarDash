import React from 'react';
import { createSupabaseServerClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import DashboardSidebar from '@/components/layout/DashboardSidebar';

export default async function AdminRevenuePage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') redirect('/dashboard');

  const { data: allBookings } = await supabase
    .from('bookings')
    .select('total_amount, status, created_at');

  const completed = allBookings?.filter(b => b.status === 'completed') || [];
  const totalRevenue = completed.reduce((sum, b) => sum + parseInt(b.total_amount || '0'), 0);
  const pendingRevenue = (allBookings?.filter(b => b.status === 'pending') || [])
    .reduce((sum, b) => sum + parseInt(b.total_amount || '0'), 0);

  return (
    <div className="flex bg-surface min-h-screen">
      <DashboardSidebar />
      <div className="flex-1 md:ml-72 flex flex-col">
        <header className="w-full relative md:sticky top-0 z-30 bg-white/80 backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between px-6 md:px-8 py-4 md:h-20 gap-4 md:gap-0 shadow-sm border-b border-outline-variant/5">
          <h1 className="font-headline font-semibold tracking-tight text-slate-900 text-xl">Financial Revenue Metrics</h1>
          <div className="flex items-center gap-4">
             <span className="text-secondary font-bold text-sm bg-secondary/10 px-4 py-2 rounded-xl">Nairobi Coverage 2024</span>
          </div>
        </header>

        <main className="flex-1 p-8 max-w-7xl mx-auto w-full space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-8 rounded-3xl shadow-premium border border-outline-variant/5">
               <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant font-headline mb-2">Realized Revenue</p>
               <p className="text-3xl font-black text-primary font-headline">KES {totalRevenue.toLocaleString()}</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-premium border border-outline-variant/5">
               <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant font-headline mb-2">Pending Value</p>
               <p className="text-3xl font-black text-amber-500 font-headline">KES {pendingRevenue.toLocaleString()}</p>
            </div>
            <div className="bg-slate-900 p-8 rounded-3xl shadow-premium text-white relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                 <span className="material-symbols-outlined text-6xl">insights</span>
               </div>
               <p className="text-xs font-bold uppercase tracking-widest text-white/60 font-headline mb-2">Platform Tax (10%)</p>
               <p className="text-3xl font-black font-headline">KES {(totalRevenue * 0.1).toLocaleString()}</p>
            </div>
            <div className="bg-secondary p-8 rounded-3xl shadow-premium text-white">
               <p className="text-xs font-bold uppercase tracking-widest text-white/60 font-headline mb-2">Service Growth</p>
               <p className="text-3xl font-black font-headline text-white">+12.4%</p>
            </div>
          </div>

          <div className="bg-white rounded-[2rem] shadow-premium border border-outline-variant/5 p-12 text-center space-y-6">
            <div className="w-20 h-20 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mx-auto mb-10">
              <span className="material-symbols-outlined text-4xl">analytics</span>
            </div>
            <h3 className="text-3xl font-headline font-bold text-primary">Revenue Trends Visualization</h3>
            <p className="text-on-surface-variant font-body mb-10 max-w-xl mx-auto leading-relaxed">Detailed graph analysis of Nairobi service volume and financial growth trends are ready for dashboard rendering when live booking telemetry reaches critical volume.</p>
            <button className="bg-secondary text-white px-10 py-4 rounded-xl font-bold font-headline shadow-premium hover:shadow-xl transition-all">Generate Full Report</button>
          </div>

        </main>
      </div>
    </div>
  );
}
