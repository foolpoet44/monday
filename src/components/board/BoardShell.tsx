import React, { useEffect } from 'react';
import { useBoardStore } from '../../store/useBoardStore';
import { TableView } from './TableView';
import { KanbanView } from './KanbanView';
import { Plus, Filter, Search, MoreHorizontal } from 'lucide-react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';

export function BoardShell() {
    const { board, loadMockData } = useBoardStore();
    const location = useLocation();
    const isKanban = location.pathname.includes('kanban');

    useEffect(() => {
        // Phase 1: load mock data immediately
        loadMockData();
    }, [loadMockData]);

    if (!board) return <div className="p-8">Loading board...</div>;

    return (
        <div className="flex flex-col h-full">
            {/* Board Header Top */}
            <div className="px-6 py-4 flex flex-col gap-4 border-b border-slate-200 shrink-0">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">{board.name}</h1>
                    <div className="flex gap-2">
                        <button className="text-slate-500 p-1.5 hover:bg-slate-100 rounded"><MoreHorizontal size={20} /></button>
                    </div>
                </div>
                <div className="text-sm text-slate-500">{board.description}</div>

                {/* Navigation Tabs */}
                <div className="flex gap-6 text-sm font-medium border-b border-transparent -mb-4">
                    <Link
                        to=""
                        className={`pb-2 border-b-2 ${!isKanban ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-600 hover:text-slate-800'}`}
                    >
                        Main Table
                    </Link>
                    <Link
                        to="kanban"
                        className={`pb-2 border-b-2 ${isKanban ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-600 hover:text-slate-800'}`}
                    >
                        Kanban
                    </Link>
                </div>
            </div>

            {/* Board Toolbar */}
            <div className="px-6 py-3 flex items-center gap-2 border-b border-slate-200 shrink-0">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded text-sm font-medium flex items-center gap-2">
                    New Item
                </button>
                <div className="h-4 w-px bg-slate-300 mx-2"></div>
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100 rounded">
                    <Search size={16} /> Search
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100 rounded">
                    <Filter size={16} /> Filter
                </button>
            </div>

            {/* Board Content Area */}
            <div className="flex-1 overflow-hidden relative">
                <Routes>
                    <Route index element={<TableView />} />
                    <Route path="kanban" element={<KanbanView />} />
                </Routes>
            </div>
        </div>
    );
}
