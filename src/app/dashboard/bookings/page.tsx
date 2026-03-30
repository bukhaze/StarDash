import React from 'react';
import { createSupabaseServerClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function CustomerBookingsPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: bookings } = await supabase
    .from('bookings')
    .select(`
      *,
      service:services(name)
    `)
    .eq('customer_id', user.id)
    .order('created_at', { ascending: false });

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
           <h2 className="font-headline text-4xl font-extrabold tracking-tight text-primary">Your Bookings</h2>
           <p className="text-on-surface-variant mt-2 text-lg font-body">Manage and track all your scheduled home services in Nairobi.</p>
        </div>
        <Link href="/services" className="bg-primary text-white border-none px-8 py-4 rounded-2xl font-bold font-headline shadow-premium hover:shadow-xl transition-all scale-95 active:scale-90 flex items-center gap-2">
           <span className="material-symbols-outlined">add_circle</span>
           Book New Service
        </Link>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-premium border border-outline-variant/5 overflow-hidden font-body">
        <div className="p-8 border-b border-surface-container-high/20 bg-surface-container-low/30 flex justify-between items-center">
           <h3 className="font-headline text-xl font-bold text-primary">Booking History</h3>
           <div className="flex gap-2">
              <button className="bg-white px-4 py-2 rounded-xl text-xs font-bold border border-outline-variant/10 text-slate-600 hover:bg-slate-50 transition-colors">Active</button>
              <button className="bg-white px-4 py-2 rounded-xl text-xs font-bold border border-outline-variant/10 text-slate-600 hover:bg-slate-50 transition-colors">Past</button>
           </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-high/10 text-on-surface-variant text-[10px] uppercase tracking-widest font-extrabold font-headline">
                <th className="px-8 py-5">Service Provider</th>
                <th className="px-8 py-5">Date & Time</th>
                <th className="px-8 py-5">Value</th>
                <th className="px-8 py-5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-high/20">
              {bookings && bookings.length > 0 ? (bookings as { id: string; service?: { name: string }; scheduled_date: string; scheduled_time: string; total_amount: string; status: string }[]).map((booking) => (
                <tr key={booking.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                          <span className="material-symbols-outlined text-xl">engineering</span>
                       </div>
                       <div>
                          <p className="font-bold text-primary font-headline group-hover:text-secondary transition-colors">{booking.service?.name}</p>
                          <p className="text-xs text-slate-500 font-body">Service ID: SD-{booking.id.slice(0, 5).toUpperCase()}</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap">
                    <p className="text-sm font-bold text-on-surface font-headline">{booking.scheduled_date}</p>
                    <p className="text-xs text-on-surface-variant font-body">{booking.scheduled_time}</p>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm font-bold text-primary font-headline">KES {parseInt(booking.total_amount || '0').toLocaleString()}</span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <span className={`inline-flex px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest border border-current opacity-90 ${
                      booking.status === 'completed' ? 'bg-secondary/10 text-secondary' :
                      booking.status === 'cancelled' ? 'bg-error/10 text-error' :
                      'bg-primary/20 text-primary'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} className="px-8 py-12 text-center text-on-surface-variant font-medium">
                    No bookings found. <Link href="/services" className="text-secondary font-bold hover:underline">Book your first service now!</Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="h-10 md:hidden"></div>
    </div>
  );
}
