import React from 'react';
import { createSupabaseServerClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import Link from 'next/link';

export default async function AdminBookingsPage() {
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
    .select(`
      *,
      service:services(name),
      customer:profiles!bookings_customer_id_fkey(full_name, phone, email)
    `)
    .order('created_at', { ascending: false });

  return (
    <div className="flex bg-surface min-h-screen">
      <DashboardSidebar />
      <div className="flex-1 md:ml-72 flex flex-col">
        <header className="w-full relative md:sticky top-0 z-30 bg-white/80 backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between px-6 md:px-8 py-4 md:h-20 gap-4 md:gap-0 shadow-sm border-b border-outline-variant/5">
          <h1 className="font-headline font-semibold tracking-tight text-slate-900 text-xl">Service Bookings Roster</h1>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl font-headline font-bold text-sm hover:opacity-90 active:scale-95 transition-all">
              <span className="material-symbols-outlined text-sm">filter_list</span>
              Filter View
            </button>
          </div>
        </header>

        <main className="flex-1 p-8 max-w-7xl mx-auto w-full space-y-10">
          <div className="bg-white rounded-[2rem] shadow-premium border border-outline-variant/5 overflow-hidden font-body">
            <div className="p-6 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-lowest">
               <h3 className="font-headline text-xl font-bold text-primary text-xl">Master Network Bookings</h3>
               <span className="bg-secondary/10 text-secondary px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest">{allBookings?.length || 0} Total</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-high/30 text-on-surface-variant text-[10px] uppercase tracking-widest font-extrabold font-headline">
                    <th className="px-8 py-5">Customer Connection</th>
                    <th className="px-8 py-5">Service Details</th>
                    <th className="px-8 py-5">Booking ID</th>
                    <th className="px-8 py-5">Value</th>
                    <th className="px-8 py-5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container-high/20">
                  {allBookings && allBookings.length > 0 ? allBookings.map((booking: any) => (
                    <tr key={booking.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-primary/5 rounded-full flex items-center justify-center text-primary font-bold">
                             {booking.customer?.full_name?.[0] || 'G'}
                          </div>
                          <div>
                            <p className="font-bold text-primary font-headline">{booking.customer?.full_name || booking.guest_name}</p>
                            <p className="text-xs text-on-surface-variant font-body">{booking.customer?.email || booking.guest_email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <p className="font-bold text-primary font-headline group-hover:text-secondary transition-colors">{booking.service?.name}</p>
                        <p className="text-xs text-on-surface-variant font-body">{booking.scheduled_date} @ {booking.scheduled_time}</p>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-[10px] font-mono bg-slate-100 px-2 py-1 rounded text-slate-500 uppercase">SD-{booking.id.slice(0, 8)}</span>
                      </td>
                      <td className="px-8 py-6 font-bold text-slate-900 font-headline">
                        KES {parseInt(booking.total_amount).toLocaleString()}
                      </td>
                      <td className="px-8 py-6 text-right">
                        <span className={`inline-flex px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest border border-current opacity-90 ${
                          booking.status === 'completed' ? 'bg-secondary/10 text-secondary' :
                          booking.status === 'cancelled' ? 'bg-error/10 text-error' :
                          'bg-amber-500/10 text-amber-600'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={5} className="px-8 py-10 text-center text-on-surface-variant font-medium">
                        No bookings captured on the network yet.
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
