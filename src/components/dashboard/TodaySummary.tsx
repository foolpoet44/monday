import React from 'react';
import { useAppContext } from '../../store/AppContext';
import { getTodayStats } from '../../utils/taskUtils';
import { Calendar, AlertCircle, Clock } from 'lucide-react';

export function TodaySummary() {
    const { state } = useAppContext();
    const stats = getTodayStats(state.tasks);

    return (
        <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="flex-1 bg-bg-surface border border-border rounded-xl p-4 flex items-center gap-4">
                <div className="p-3 bg-due-today/20 text-due-today rounded-lg">
                    <Calendar size={24} />
                </div>
                <div>
                    <div className="text-sm text-text-secondary">오늘 마감</div>
                    <div className="text-2xl font-bold text-text-primary">{stats.todayDue}개</div>
                </div>
            </div>
            <div className="flex-1 bg-bg-surface border border-border rounded-xl p-4 flex items-center gap-4">
                <div className="p-3 bg-priority-p1/20 text-priority-p1 rounded-lg">
                    <AlertCircle size={24} />
                </div>
                <div>
                    <div className="text-sm text-text-secondary">P1 긴급</div>
                    <div className="text-2xl font-bold text-text-primary">{stats.urgent}개</div>
                </div>
            </div>
            <div className="flex-1 bg-bg-surface border border-border rounded-xl p-4 flex items-center gap-4">
                <div className="p-3 bg-due-overdue/20 text-due-overdue rounded-lg">
                    <Clock size={24} />
                </div>
                <div>
                    <div className="text-sm text-text-secondary">지연됨</div>
                    <div className="text-2xl font-bold text-text-primary">{stats.overdue}개</div>
                </div>
            </div>
        </div>
    );
}
