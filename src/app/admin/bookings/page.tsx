import React from 'react';
import { createSupabaseServerClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import AssignWorkerSelect from './AssignWorkerSelect';
import CreateBookingForm from './CreateBookingForm';

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

  const { data: workersRaw } = await supabase
    .from('profiles')
    .select('id, full_name')
    .eq('role', 'worker');

  const { data: services } = await supabase
    .from('services')
    .select('id, title');

  const { data: allBookings } = await supabase
    .from('bookings')
    .select(`
      *,
      service:services(title),
      customer:profiles!bookings_customer_id_fkey(full_name, phone, email),
      address:addresses(neighborhood, street_address)
    `)
    .order('created_at', { ascending: false });

  return (
    <div className="flex-1 flex flex-col font-body bg-slate-50 min-h-screen">
         
         <header className="w-full relative md:sticky top-0 z-30 bg-white border-b border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between px-10 py-8 md:h-28 animate-in fade-in duration-700">
            <div className="space-y-1">
               <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Service Bookings</h1>
               <p className="text-sm font-medium text-slate-400">Manage customer service requests and staff assignments.</p>
            </div>
            <div className="flex items-center gap-4">
               <CreateBookingForm services={services || []} />
            </div>
         </header>

         <main className="flex-1 p-10 max-w-[1600px] mx-auto w-full space-y-10 animate-in slide-in-from-bottom-4 duration-1000">
           
           <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden font-body relative">
            <div className="p-10 border-b border-slate-50 flex justify-between items-center bg-slate-50/20">
               <div>
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">Service Appointments</h3>
                  <p className="text-xs font-medium text-slate-400 mt-1">Live overview of all booking activity</p>
               </div>
               <div className="flex bg-slate-100 p-1.5 rounded-2xl">
                  <button className="px-6 py-3 bg-white rounded-xl shadow-sm text-[10px] font-bold uppercase tracking-widest text-slate-900 border border-slate-100">All Bookings</button>
                  <button className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-all border border-transparent">Needs Staff</button>
               </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 text-slate-400 text-[10px] uppercase tracking-widest font-bold">
                    <th className="px-10 py-6 border-b border-slate-50">Customer</th>
                    <th className="px-10 py-6 border-b border-slate-50">Service & Area</th>
                    <th className="px-10 py-6 border-b border-slate-50">Assigned Staff</th>
                    <th className="px-10 py-6 border-b border-slate-50">Total Amount</th>
                    <th className="px-10 py-6 border-b border-slate-50 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {allBookings && allBookings.length > 0 ? (allBookings as any[]).map((booking) => (
                    <tr key={booking.id} className="hover:bg-slate-50 transition-all group">
                      <td className="px-10 py-10">
                        <div className="flex items-center gap-6">
                          <div className="w-14 h-14 bg-slate-100 border border-slate-200 rounded-2xl flex items-center justify-center text-slate-500 font-bold text-lg group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                             {(booking.customer?.full_name || booking.guest_name)?.[0]?.toUpperCase() || 'G'}
                          </div>
                          <div className="space-y-1">
                            <p className="font-bold text-slate-900 text-lg tracking-tight">{booking.customer?.full_name || booking.guest_name}</p>
                            <p className="text-[11px] text-slate-400 font-bold tracking-widest uppercase">{booking.customer?.phone || booking.guest_phone || 'N/A'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-10">
                        <div className="space-y-2">
                           <p className="font-bold text-slate-900 text-sm">{booking.service?.title || 'Residential Service'}</p>
                           <p className="text-[11px] text-slate-400 font-medium uppercase tracking-tight">{booking.address?.neighborhood || 'Nairobi'} • {booking.address?.street_address || 'TBD'}</p>
                           <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">{booking.scheduled_date} @ {booking.scheduled_time}</p>
                        </div>
                      </td>
                      <td className="px-10 py-10">
                         <AssignWorkerSelect 
                            bookingId={booking.id} 
                            currentWorkerId={booking.worker_id} 
                            workers={workersRaw || []} 
                         />
                      </td>
                      <td className="px-10 py-10">
                         <p className="text-xl font-bold text-slate-900 tracking-tight">KSh {parseInt(booking.total_amount || '0').toLocaleString()}</p>
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Gross Price</p>
                      </td>
                      <td className="px-10 py-10 text-right">
                        <div className="flex flex-col items-end gap-2">
                           <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                              booking.status === 'completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                              booking.status === 'cancelled' ? 'bg-red-50 text-red-600 border-red-100' :
                              booking.status === 'worker_assigned' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                              'bg-amber-50 text-amber-600 border-amber-100 animate-pulse'
                           }`}>
                              {booking.status?.replace('_', ' ') || 'Pending'}
                           </span>
                           <p className="text-[9px] text-slate-300 font-bold uppercase tracking-widest leading-none">Job No. #{booking.id.slice(0, 5)}</p>
                        </div>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={5} className="px-10 py-40 text-center">
                        <div className="max-w-xs mx-auto space-y-4 opacity-30">
                           <span className="material-symbols-outlined text-4xl">inbox</span>
                           <p className="text-sm font-bold uppercase tracking-widest">No booking records found</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
    </div>
  );
}
