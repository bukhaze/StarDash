import React from 'react';
import DashboardSidebar from '@/components/layout/DashboardSidebar';

export default function WorkerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-slate-50 min-h-screen">
      <DashboardSidebar />
      <div className="flex-1 md:ml-80 flex flex-col">
        {children}
      </div>
    </div>
  );
}
