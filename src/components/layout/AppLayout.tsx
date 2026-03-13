import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { TaskForm } from '../task/TaskForm';

export function AppLayout() {
    const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Cmd/Ctrl + N
            if ((e.metaKey || e.ctrlKey) && e.key === 'n') {
                e.preventDefault();
                setIsTaskFormOpen(true);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className="flex h-screen bg-bg-base text-text-primary overflow-hidden font-sans">
            <Sidebar className="w-[220px] shrink-0 border-r border-border" />
            <main className="flex-1 flex flex-col overflow-hidden">
                <Header onNewTask={() => setIsTaskFormOpen(true)} />
                <div className="flex-1 overflow-y-auto p-6">
                    <Outlet />
                </div>
            </main>
            <TaskForm isOpen={isTaskFormOpen} onClose={() => setIsTaskFormOpen(false)} />
        </div>
    );
}
