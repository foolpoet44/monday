import React from 'react';
import { format } from 'date-fns';

export function Header({ onNewTask }: { onNewTask: () => void }) {
    const today = format(new Date(), 'yyyy년 MM월 dd일');

    return (
        <header className="h-[60px] shrink-0 border-b border-border flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
                <h1 className="text-lg font-semibold">PM Tasks</h1>
                <span className="text-text-secondary text-sm">{today}</span>
            </div>
            <button
                onClick={onNewTask}
                className="bg-accent text-white px-4 py-2 rounded-md hover:opacity-90 text-sm font-medium transition-opacity"
            >
                + 새 Task
            </button>
        </header>
    );
}
