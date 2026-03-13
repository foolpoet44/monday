import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Calendar, AlertCircle, Plus } from 'lucide-react';
import { useAppContext } from '../../store/AppContext';
import { ACTIONS } from '../../store/actions';
import { ProjectItem } from '../project/ProjectItem';
import { ProjectForm } from '../project/ProjectForm';
import { isToday, parseISO } from 'date-fns';

export function Sidebar({ className = '' }: { className?: string }) {
    const { state, dispatch } = useAppContext();
    const [isAddingProject, setIsAddingProject] = useState(false);

    const activeTasks = state.tasks.filter(t => t.status !== 'done');
    const todayDueCount = activeTasks.filter(t => t.dueDate && isToday(parseISO(t.dueDate))).length;
    const urgentCount = activeTasks.filter(t => t.priority === 'P1').length;

    return (
        <div className={`bg-bg-surface flex flex-col ${className}`}>
            <div className="p-4 font-bold text-lg border-b border-border text-text-primary">PM Tasks</div>
            <nav className="flex-1 overflow-y-auto p-4 space-y-6">
                <div className="space-y-1">
                    <NavLink
                        to="/"
                        onClick={() => dispatch({ type: ACTIONS.SET_FILTER, payload: { type: 'all' } })}
                        className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive && state.activeFilter.type === 'all' ? 'bg-accent/10 text-accent' : 'hover:bg-bg-elevated text-text-secondary w-full'}`}
                    >
                        <LayoutDashboard size={18} />
                        <span className="flex-1 text-left text-sm font-medium">전체 보기</span>
                        <span className="text-xs bg-bg-elevated px-2 py-0.5 rounded-full text-text-secondary">{activeTasks.length}</span>
                    </NavLink>
                    <NavLink
                        to="/today"
                        onClick={() => dispatch({ type: ACTIONS.SET_FILTER, payload: { type: 'today' } })}
                        className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive && state.activeFilter.type === 'today' ? 'bg-accent/10 text-accent' : 'hover:bg-bg-elevated text-text-secondary w-full'}`}
                    >
                        <Calendar size={18} />
                        <span className="flex-1 text-left text-sm font-medium">오늘 마감</span>
                        <span className="text-xs bg-bg-elevated px-2 py-0.5 rounded-full text-text-secondary">{todayDueCount}</span>
                    </NavLink>
                    <NavLink
                        to="/urgent"
                        onClick={() => dispatch({ type: ACTIONS.SET_FILTER, payload: { type: 'urgent' } })}
                        className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive && state.activeFilter.type === 'urgent' ? 'bg-accent/10 text-accent' : 'hover:bg-bg-elevated text-text-secondary w-full'}`}
                    >
                        <AlertCircle size={18} />
                        <span className="flex-1 text-left text-sm font-medium">P1 긴급</span>
                        <span className="text-xs bg-bg-elevated px-2 py-0.5 rounded-full text-text-secondary">{urgentCount}</span>
                    </NavLink>
                </div>

                <div>
                    <div className="text-xs font-semibold text-text-muted mb-2 px-3 uppercase tracking-wider">Projects</div>
                    <div className="space-y-1">
                        {state.projects.map(p => <ProjectItem key={p.id} project={p} />)}

                        {!isAddingProject ? (
                            <button
                                onClick={() => setIsAddingProject(true)}
                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-elevated rounded-md transition-colors mt-2"
                            >
                                <Plus size={16} /> 프로젝트 추가
                            </button>
                        ) : (
                            <ProjectForm onClose={() => setIsAddingProject(false)} />
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
}
