import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

export function AppLayout() {
    return (
        <div className="flex h-screen w-full bg-white overflow-hidden text-slate-800 antialiased">
            {/* Global Navigation Bar (Very left thin bar in Monday) */}
            <div className="w-[50px] shrink-0 bg-slate-900 flex flex-col items-center py-4 gap-4 z-10">
                <div className="w-8 h-8 bg-blue-500 rounded blur-[1px]"></div> {/* Logo */}
                <div className="w-8 h-8 border border-slate-700 rounded-full mt-auto"></div> {/* Profile */}
            </div>

            <Sidebar />

            <main className="flex-1 flex flex-col min-w-0 bg-white">
                <Outlet />
            </main>
        </div>
    );
}
