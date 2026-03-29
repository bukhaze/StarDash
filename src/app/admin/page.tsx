import React from 'react';
import { createSupabaseServerClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import DashboardSidebar from '@/components/layout/DashboardSidebar';

export default async function AdminDashboard() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') redirect('/dashboard');

  // Fetch all bookings for administration
  const { data: allBookings, error } = await supabase
    .from('bookings')
    .select(`
      *,
      service:services(name),
      customer:profiles!bookings_customer_id_fkey(full_name, phone),
      address:addresses(neighborhood, street_address)
    `)
    .order('created_at', { ascending: false })
    .limit(50);
    
  const pendingJobs = allBookings?.filter(b => b.status === 'pending') || [];
  const completedJobs = allBookings?.filter(b => b.status === 'completed') || [];

  return (
    <div className="flex bg-surface min-h-screen">
      <DashboardSidebar />
      <div className="flex-1 md:ml-72 flex flex-col">
        {/* Dashboard Header */}
        <header className="w-full sticky top-0 z-40 bg-white/80 backdrop-blur-xl flex items-center justify-between px-8 h-20 shadow-sm border-b border-outline-variant/5">
          <h1 className="font-headline font-semibold tracking-tight text-slate-900 text-xl">Admin Control Center</h1>
          <div className="flex items-center gap-4">
            <button className="p-2.5 hover:bg-slate-100 rounded-full transition-colors active:scale-90 group relative">
              <span className="material-symbols-outlined text-slate-500 group-hover:text-primary transition-colors">notifications</span>
            </button>
            <div className="w-10 h-10 rounded-full bg-error text-white font-bold flex items-center justify-center font-headline shadow-sm">
              AD
            </div>
          </div>
        </header>

        <main className="flex-1 p-8 max-w-7xl mx-auto w-full space-y-10">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-3xl shadow-premium border border-outline-variant/5 hover:shadow-xl transition-all">
              <span className="material-symbols-outlined text-3xl text-secondary mb-4">work_history</span>
              <p className="text-4xl font-headline font-extrabold text-primary">{allBookings?.length || 0}</p>
              <p className="text-sm font-bold uppercase tracking-widest text-on-surface-variant font-headline mt-1">Total Bookings</p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-premium border border-outline-variant/5 hover:shadow-xl transition-all">
              <span className="material-symbols-outlined text-3xl text-amber-500 mb-4">pending_actions</span>
              <p className="text-4xl font-headline font-extrabold text-primary">{pendingJobs.length}</p>
              <p className="text-sm font-bold uppercase tracking-widest text-on-surface-variant font-headline mt-1">Pending Assignments</p>
            </div>

            <div className="bg-secondary p-8 rounded-3xl shadow-premium text-white relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
              <span className="material-symbols-outlined text-3xl mb-4 relative z-10">payments</span>
              <p className="text-4xl font-headline font-extrabold relative z-10">Platform</p>
              <p className="text-sm font-bold uppercase tracking-widest text-white/80 font-headline mt-1 relative z-10">Revenue Center &gt;</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-premium border border-outline-variant/5 overflow-hidden font-body">
            <div className="p-6 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-lowest">
               <h3 className="font-headline text-xl font-bold text-primary">Recent Network Activity</h3>
               <button className="text-sm font-bold text-secondary flex items-center gap-1 hover:underline">
                 Export Logs <span className="material-symbols-outlined text-sm">download</span>
               </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-high/30 text-on-surface-variant text-[10px] uppercase tracking-widest font-extrabold font-headline">
                    <th className="px-8 py-5">Customer ID</th>
                    <th className="px-8 py-5">Service details</th>
                    <th className="px-8 py-5">Location</th>
                    <th className="px-8 py-5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container-high/20">
                  {allBookings && allBookings.length > 0 ? allBookings.map((booking: any) => (
                    <tr key={booking.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-8 py-6">
                        <p className="font-bold text-primary font-headline">{booking.customer?.full_name || booking.guest_name || 'Anonymous Guest'}</p>
                        <p className="text-xs text-on-surface-variant font-body">{booking.customer?.phone || booking.guest_phone || 'No phone'}</p>
                      </td>
                      <td className="px-8 py-6">
                        <p className="font-bold text-primary font-headline group-hover:text-secondary transition-colors">{booking.service?.name || 'Standard Cleaning'}</p>
                        <p className="text-xs text-on-surface-variant font-body">{booking.scheduled_date} @ {booking.scheduled_time}</p>
                      </td>
                      <td className="px-8 py-6 text-on-surface-variant text-sm font-medium">
                        {booking.address?.neighborhood}
                      </td>
                      <td className="px-8 py-6 text-right">
                        <span className={`inline-flex px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest border border-current opacity-90 ${
                          booking.status === 'completed' ? 'bg-secondary/10 text-secondary' :
                          booking.status === 'cancelled' ? 'bg-error/10 text-error' :
                          'bg-primary/10 text-primary'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={4} className="px-8 py-10 text-center text-on-surface-variant font-medium">
                        No platform bookings recorded yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
