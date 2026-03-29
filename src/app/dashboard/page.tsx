import React from 'react';
import { createSupabaseServerClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function CustomerDashboard() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch the profile to get Name and Role
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (profile?.role === 'worker') redirect('/worker');
  if (profile?.role === 'admin') redirect('/admin');

  // Fetch real bookings
  const { data: bookings } = await supabase
    .from('bookings')
    .select(`
      *,
      service:services(name),
      address:addresses(neighborhood, street_address, apartment_suite)
    `)
    .eq('customer_id', user.id)
    .order('created_at', { ascending: false });

  const activeBookings = bookings?.filter(b => b.status === 'pending' || b.status === 'confirmed') || [];
  const completedBookings = bookings?.filter(b => b.status === 'completed') || [];
  const upcomingBooking = activeBookings.length > 0 ? activeBookings[0] : null;

  const stats = [
    { icon: 'schedule', label: 'Active Bookings', value: activeBookings.length.toString() },
    { icon: 'task_alt', label: 'Completed Services', value: completedBookings.length.toString() },
    { icon: 'stars', label: 'StarDash Points', value: (completedBookings.length * 50).toString() },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12">
      {/* Welcome & Stats */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="md:col-span-2 lg:col-span-4 mb-4">
          <h2 className="font-headline text-4xl font-extrabold tracking-tight text-primary">
            Welcome back, {profile?.full_name?.split(' ')[0] || 'Customer'}
          </h2>
          <p className="text-on-surface-variant mt-2 text-lg font-body">Your home is in good hands. Here's what's happening today.</p>
        </div>
        
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-8 rounded-3xl shadow-premium border border-outline-variant/5 flex flex-col justify-between h-44 hover:shadow-xl transition-all">
            <div className="bg-secondary/10 w-12 h-12 rounded-2xl flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>{stat.icon}</span>
            </div>
            <div>
              <p className="text-4xl font-headline font-extrabold text-primary leading-none">{stat.value}</p>
              <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant font-headline mt-2">{stat.label}</p>
            </div>
          </div>
        ))}

        <div className="bg-secondary p-8 rounded-3xl flex flex-col justify-between h-44 text-white shadow-premium hover:shadow-xl transition-all relative overflow-hidden group">
          <div className="absolute top-[-20px] right-[-20px] w-24 h-24 bg-white opacity-10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
          <span className="material-symbols-outlined text-secondary-container text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>redeem</span>
          <div>
            <p className="text-lg font-headline font-bold leading-tight">Refer a Friend</p>
            <p className="text-xs opacity-90 mt-1 font-body">Get KES 1,000 off your next deep cleaning</p>
          </div>
        </div>
      </section>

      {/* Featured Content & History */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        <div className="lg:col-span-2 space-y-8">
          <h3 className="font-headline text-xl font-bold text-primary px-2">Upcoming Service</h3>
          
          {upcomingBooking ? (
            <div className="relative overflow-hidden rounded-[2.5rem] bg-primary group shadow-premium">
              <div className="absolute top-0 right-0 w-1/2 h-full opacity-30 pointer-events-none group-hover:scale-105 transition-transform duration-700">
                 <img 
                   src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfpUtKc4ZB7qtFFbI-P5MTrtig6U5m7Hxa-PwkCg0oZG9I3xCmaNl23bYwU67tNq4wUiy3U-qfLylUTL47cbZlm_QxmGm0NXg2PTut10cBR-E42XJUosb4YPepULRzvHssbYJnF3la_7dTwE0te4jeB8uSBwHsJvvyeSZgjMcdN_ChKFhFV3k2DZzzc0IEXtf01uPdL3XOFdfrzRBVXXMbVAk9iSOqxSJ_a1K_eR3Fbp_9Ko-RW_NWY9MAUVsR8xU7pYAGcSaelJk" 
                   alt="House cleaning" 
                   className="w-full h-full object-cover" 
                 />
              </div>
              <div className="relative z-10 p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 bg-secondary/30 text-secondary-fixed border border-secondary/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest font-headline">
                    {upcomingBooking.scheduled_date} • {upcomingBooking.scheduled_time}
                  </div>
                  <h4 className="text-3xl md:text-4xl font-headline font-extrabold text-white leading-tight">
                    {upcomingBooking.service?.name || 'Premium Service'}
                  </h4>
                  <div className="flex flex-wrap items-center gap-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full border-2 border-white/20 flex items-center justify-center bg-white/10 text-white">
                         <span className="material-symbols-outlined">person</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white font-headline">StarDash Pro</p>
                        <p className="text-xs text-white/60 font-body">Status: <span className="capitalize">{upcomingBooking.status}</span></p>
                      </div>
                    </div>
                    <div className="h-10 w-px bg-white/10 hidden md:block"></div>
                    <div>
                      <p className="text-sm font-bold text-white font-headline">{upcomingBooking.address?.neighborhood || 'Nairobi'}</p>
                      <p className="text-xs text-white/60 font-body">{upcomingBooking.address?.apartment_suite ? `${upcomingBooking.address?.apartment_suite}, ` : ''}{upcomingBooking.address?.street_address}</p>
                    </div>
                  </div>
                </div>
                <button className="bg-white text-primary px-10 py-5 rounded-2xl font-bold font-headline shadow-xl hover:bg-slate-50 transition-all scale-95 active:scale-90 flex-shrink-0">
                  Manage Activity
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-surface-container-low border-2 border-dashed border-outline-variant/30 rounded-[2.5rem] p-12 text-center flex flex-col items-center justify-center">
              <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-4">cleaning_services</span>
              <p className="text-on-surface font-bold font-headline text-lg">No upcoming bookings</p>
              <p className="text-on-surface-variant text-sm mb-6">Ready for your place to sparkle?</p>
              <Link href="/services" className="bg-primary text-white font-bold px-8 py-3 rounded-xl hover:brightness-110 transition-all shadow-md">
                Browse Services
              </Link>
            </div>
          )}

          <div className="pt-8 space-y-6">
            <div className="flex items-center justify-between px-2">
              <h3 className="font-headline text-xl font-bold text-primary">Recent Activity</h3>
            </div>
            <div className="bg-white rounded-3xl shadow-premium border border-outline-variant/5 overflow-hidden font-body">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-high/30 text-on-surface-variant text-[10px] uppercase tracking-widest font-extrabold font-headline">
                      <th className="px-8 py-5">Service</th>
                      <th className="px-8 py-5">Date</th>
                      <th className="px-8 py-5">Amount</th>
                      <th className="px-8 py-5 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container-high/20">
                    {bookings && bookings.length > 0 ? bookings.map((activity: any, idx: number) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                        <td className="px-8 py-6 font-bold text-primary font-headline group-hover:text-secondary transition-colors truncate max-w-[150px]">{activity.service?.name || 'Cleaning Service'}</td>
                        <td className="px-8 py-6 text-on-surface-variant font-medium whitespace-nowrap">{activity.scheduled_date}</td>
                        <td className="px-8 py-6 text-on-surface-variant font-bold">KES {activity.total_amount}</td>
                        <td className="px-8 py-6 text-right">
                          <span className={`inline-flex px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest border border-current opacity-90 group-hover:opacity-100 transition-opacity ${
                            activity.status === 'completed' ? 'bg-secondary/10 text-secondary' :
                            activity.status === 'cancelled' ? 'bg-error/10 text-error' :
                            'bg-primary/10 text-primary'
                          }`}>
                            {activity.status}
                          </span>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={4} className="px-8 py-10 text-center text-on-surface-variant font-medium">
                          No history available yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-10">
          <div className="space-y-6">
            <h3 className="font-headline text-xl font-bold text-primary px-2">Quick Actions</h3>
            <div className="space-y-4">
              {[
                { icon: 'add_circle', title: 'Book New Service', desc: 'Secure reliable pros', href: '/services' },
                { icon: 'home_pin', title: 'Manage Addresses', desc: 'Home, office, gym', href: '/dashboard' },
                { icon: 'support_agent', title: 'Support Center', desc: '24/7 dedicated help', href: '/dashboard' }
              ].map((action) => (
                 <Link href={action.href} key={action.title} className="w-full group flex items-center justify-between p-6 bg-white hover:bg-secondary/5 transition-all rounded-3xl shadow-premium border border-outline-variant/5 text-left active:scale-95">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all shadow-sm">
                        <span className="material-symbols-outlined text-2xl">{action.icon}</span>
                      </div>
                      <div>
                        <p className="font-headline font-extrabold text-primary text-base leading-tight group-hover:text-secondary transition-colors">{action.title}</p>
                        <p className="text-xs text-on-surface-variant font-body mt-1">{action.desc}</p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-outline-variant group-hover:text-secondary group-hover:translate-x-1 transition-all" style={{ fontSize: '18px' }}>arrow_forward_ios</span>
                 </Link>
              ))}
            </div>
          </div>

          {/* Referral Promo Card */}
          <div className="bg-slate-900 rounded-[2.5rem] p-10 relative overflow-hidden text-white shadow-premium group">
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-secondary/20 rounded-full blur-[80px] group-hover:bg-secondary/30 transition-all duration-700"></div>
            <div className="relative z-10 space-y-6">
              <h4 className="font-headline text-3xl font-extrabold leading-tight">Spread <br/>the sparkle</h4>
              <p className="text-slate-400 text-sm font-body leading-relaxed">Invite neighbors to StarDash and both receive <span className="text-secondary-fixed font-bold text-[#62fae3]">KES 2,000 off</span> your next deep cleaning.</p>
              <div className="pt-4 flex flex-col gap-4">
                <div className="bg-white/5 backdrop-blur-md px-5 py-4 rounded-2xl flex items-center justify-between border border-white/10 group-hover:border-white/20 transition-all">
                  <code className="text-xs font-bold text-secondary-fixed font-headline uppercase tracking-widest">
                    STARDASH-{profile?.full_name?.split(' ')[0]?.toUpperCase() || 'USER'}
                  </code>
                  <button className="text-white hover:text-secondary transition-colors active:scale-90">
                    <span className="material-symbols-outlined text-xl">content_copy</span>
                  </button>
                </div>
                <button className="w-full py-5 bg-secondary text-white rounded-2xl font-bold font-headline text-sm shadow-xl hover:brightness-110 active:scale-95 transition-all bg-gradient-to-br from-secondary to-[#005047]">
                  Share Invitation
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Padding for Mobile */}
      <div className="h-20 md:hidden"></div>
    </div>
  );
}

