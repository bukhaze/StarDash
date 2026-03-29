import React from 'react';
import { createSupabaseServerClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function CustomerAddressesPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: addresses } = await supabase
    .from('addresses')
    .select('*')
    .eq('customer_id', user.id);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
           <h2 className="font-headline text-4xl font-extrabold tracking-tight text-primary">Service Addresses</h2>
           <p className="text-on-surface-variant mt-2 text-lg font-body">Manage your home, apartment, or office locations in Nairobi.</p>
        </div>
        <button className="bg-secondary text-white border-none px-8 py-4 rounded-2xl font-bold font-headline shadow-premium hover:shadow-xl transition-all scale-95 active:scale-90 flex items-center gap-2">
           <span className="material-symbols-outlined">add_location</span>
           Add New Location
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {addresses && addresses.length > 0 ? addresses.map((addr: any) => (
          <div key={addr.id} className="bg-white p-8 rounded-[2.5rem] shadow-premium border border-outline-variant/10 flex flex-col justify-between group hover:border-secondary transition-all">
             <div className="space-y-6">
                <div className="flex items-center justify-between">
                   <div className="w-14 h-14 bg-secondary/10 flex items-center justify-center text-secondary rounded-2xl group-hover:bg-secondary group-hover:text-white transition-all shadow-sm">
                      <span className="material-symbols-outlined text-2xl">home</span>
                   </div>
                   <button className="text-on-surface-variant hover:text-error transition-all active:scale-90">
                      <span className="material-symbols-outlined text-xl">delete</span>
                   </button>
                </div>
                <div>
                  <h3 className="font-headline font-bold text-xl text-primary">{addr.neighborhood}</h3>
                  <p className="text-on-surface-variant text-sm font-body mt-2 leading-relaxed">{addr.apartment_suite ? `${addr.apartment_suite}, ` : ''}{addr.street_address}</p>
                </div>
             </div>
             <div className="pt-8 border-t border-slate-100 mt-8 flex items-center justify-between">
                <span className="bg-slate-50 text-slate-500 px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest">Active Corridor</span>
                <button className="text-secondary font-bold font-headline text-sm hover:underline">Edit Hub &gt;</button>
             </div>
          </div>
        )) : (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-surface-container-low border-2 border-dashed border-outline-variant/30 rounded-[2.5rem] p-16 text-center text-on-surface-variant font-medium">
             No saved addresses available. Add a service location to speed up your bookings!
          </div>
        )}
      </div>
      <div className="h-10 md:hidden"></div>
    </div>
  );
}
