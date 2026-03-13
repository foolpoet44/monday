import React, { useState } from 'react';
import { Project } from '../../types';
import { useAppContext } from '../../store/AppContext';
import { ACTIONS } from '../../store/actions';
import { Pen, Trash2 } from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface ProjectItemProps {
    project: Project;
}

export function ProjectItem({ project }: ProjectItemProps) {
    const { state, dispatch } = useAppContext();
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(project.name);

    // count active tasks
    const activeTasksCount = state.tasks.filter(t => t.projectId === project.id && t.status !== 'done').length;

    const handleUpdate = () => {
        if (name.trim()) {
            dispatch({ type: ACTIONS.UPDATE_PROJECT, payload: { id: project.id, name } });
        }
        setIsEditing(false);
    };

    const activeFilter = state.activeFilter;
    const isActive = activeFilter.type === 'project' && activeFilter.projectId === project.id;

    if (isEditing) {
        return (
            <div className="flex items-center gap-2 px-3 py-2 text-sm">
                <input
                    autoFocus
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    onBlur={handleUpdate}
                    onKeyDown={e => e.key === 'Enter' && handleUpdate()}
                    className="bg-bg-base border border-border rounded px-2 w-full text-text-primary outline-none focus:border-accent"
                />
            </div>
        );
    }

    return (
        <div className={`group flex items-center justify-between px-3 py-2 rounded-md transition-colors ${isActive ? 'bg-accent/10 text-accent' : 'hover:bg-bg-elevated text-text-secondary'}`}>
            <NavLink
                to={`/project/${project.id}`}
                onClick={() => dispatch({ type: ACTIONS.SET_FILTER, payload: { type: 'project', projectId: project.id } })}
                className="flex items-center gap-2 flex-1 overflow-hidden"
            >
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: project.color }} />
                <span className="truncate text-sm">{project.name}</span>
            </NavLink>
            <div className="flex items-center justify-center min-w-[20px]">
                <span className="text-xs bg-bg-elevated px-2 py-0.5 rounded-full group-hover:hidden">{activeTasksCount}</span>
                <div className="hidden group-hover:flex items-center gap-1">
                    <button onClick={() => setIsEditing(true)} className="p-1 hover:text-text-primary"><Pen size={14} /></button>
                    <button onClick={() => dispatch({ type: ACTIONS.DELETE_PROJECT, payload: { id: project.id } })} className="p-1 hover:text-priority-p1"><Trash2 size={14} /></button>
                </div>
            </div>
        </div>
    );
}
