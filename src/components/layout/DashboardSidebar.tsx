import React from 'react';
import Link from 'next/link';

const DashboardSidebar = () => {
  const menuItems = [
    { icon: 'dashboard', label: 'Dashboard', href: '/dashboard', active: true },
    { icon: 'calendar_month', label: 'My Bookings', href: '/dashboard/bookings' },
    { icon: 'chat_bubble', label: 'Messages', href: '/dashboard/messages' },
    { icon: 'location_on', label: 'Addresses', href: '/dashboard/addresses' },
    { icon: 'payments', label: 'Payments', href: '/dashboard/payments' },
    { icon: 'settings', label: 'Settings', href: '/dashboard/settings' },
  ];

  return (
    <aside className="h-screen w-72 fixed left-0 top-0 overflow-y-auto bg-slate-50 hidden md:flex flex-col gap-1 p-6 z-50 border-r border-slate-200">
      <div className="text-2xl font-black text-slate-900 mb-8 font-headline tracking-tighter">StarDash</div>
      
      <div className="mb-8 px-2">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary border border-secondary/20 overflow-hidden">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIBwWvryGdwoJu52m7gDudgQcLf1szjrlxVWNEc_5kBIqKbtXL8DXp8yhV3uGC7OQ8rV6EflUwrSPYa9eqTXq82uSkPI00shTktE2H-18CB0KG-0k5nTt_p-ptexSY8e_aJiLiAntLVZyWtfUASgUq9i5hr5LCuyd_zQjJYMr7ignx6oLAqYuqGrHvQMj7WFg7d75ODWjJOT71YoSRFmM76uERrZmOwYXZDC6zTC7OTaSJ5az0UN4TyYbsV9XCj3QBZljrDyFW1n4" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-headline text-sm font-semibold text-slate-900">Welcome back,</p>
            <p className="text-xs text-slate-500 font-medium font-body">Premium Member</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <Link 
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3 px-6 py-4 rounded-xl font-headline text-sm font-medium transition-all duration-200 ${
              item.active 
                ? 'bg-white text-secondary shadow-sm' 
                : 'text-slate-500 hover:text-slate-900 hover:translate-x-1'
            }`}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: item.active ? "'FILL' 1" : undefined }}>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto pt-6">
        <Link href="/services" className="w-full block text-center py-4 px-6 bg-primary text-white rounded-xl font-headline font-bold text-sm shadow-premium hover:opacity-90 active:scale-95 transition-all">
          Book New Service
        </Link>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
