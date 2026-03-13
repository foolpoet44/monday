import React from 'react';
import { Home, User, Plus, Search, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Sidebar() {
    return (
        <div className="w-[240px] h-full bg-slate-50 border-r border-slate-200 flex flex-col text-slate-800">
            {/* Workspace Header */}
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                <div className="font-bold flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-600 rounded text-white flex items-center justify-center font-bold text-xs">M</div>
                    Main Workspace
                </div>
            </div>

            {/* Tools */}
            <div className="p-3 border-b border-slate-200 space-y-1">
                <button className="w-full flex items-center gap-3 px-2 py-1.5 hover:bg-slate-200 rounded text-sm text-slate-600">
                    <Home size={16} /> Home
                </button>
                <button className="w-full flex items-center gap-3 px-2 py-1.5 hover:bg-slate-200 rounded text-sm text-slate-600">
                    <User size={16} /> My Work
                </button>
            </div>

            {/* Boards Section */}
            <div className="flex-1 overflow-y-auto p-3">
                <div className="flex items-center justify-between px-2 mb-2 group">
                    <span className="text-xs font-semibold text-slate-500 uppercase">Boards</span>
                    <button className="text-slate-400 hover:text-slate-700 opacity-0 group-hover:opacity-100"><Plus size={14} /></button>
                </div>

                <div className="space-y-1">
                    {/* Mock Board Link */}
                    <Link to="/board/b1" className="flex items-center gap-2 px-2 py-1.5 bg-blue-100 text-blue-700 rounded text-sm font-medium">
                        <span className="w-4 h-4 text-xs">📊</span>개발 스프린트 백로그
                    </Link>
                    <button className="w-full flex items-center gap-2 px-2 py-1.5 hover:bg-slate-200 text-slate-600 rounded text-sm">
                        <span className="w-4 h-4 text-xs">📋</span>마케팅 캠페인
                    </button>
                </div>
            </div>
        </div>
    );
}
