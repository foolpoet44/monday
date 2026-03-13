import React from 'react';
import { Task, TaskStatus } from '../../types';
import { useAppContext } from '../../store/AppContext';
import { ACTIONS } from '../../store/actions';
import { getDueDateStatus } from '../../utils/dateUtils';
import { Trash2 } from 'lucide-react';

interface TaskCardProps {
    task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
    const { state, dispatch } = useAppContext();
    const project = state.projects.find(p => p.id === task.projectId);
    const dueStatus = getDueDateStatus(task.dueDate, task.status === 'done');

    let dueColor = 'text-text-secondary';
    if (dueStatus === 'overdue') dueColor = 'text-due-overdue';
    else if (dueStatus === 'today') dueColor = 'text-due-today';
    else if (dueStatus === 'tomorrow') dueColor = 'text-due-tomorrow';

    const priorityColor = {
        P1: 'bg-priority-p1/20 text-priority-p1',
        P2: 'bg-priority-p2/20 text-priority-p2',
        P3: 'bg-priority-p3/20 text-priority-p3',
    }[task.priority];

    return (
        <div className={`p-4 bg-bg-surface border border-border rounded-xl flex flex-col gap-3 transition hover:border-border-focus group ${task.status === 'done' ? 'opacity-50' : ''}`}>
            <div className="flex justify-between">
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                    {project ? (
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: project.color }} />
                            {project.name}
                        </span>
                    ) : <span>Inbox</span>}
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${priorityColor}`}>{task.priority}</span>
            </div>

            <div className="flex items-start gap-3">
                <input
                    type="checkbox"
                    className="mt-1 w-4 h-4 accent-accent"
                    checked={task.status === 'done'}
                    onChange={() => dispatch({ type: ACTIONS.TOGGLE_TASK_DONE, payload: { id: task.id } })}
                />
                <div className="flex-1">
                    <h3 className={`text-base font-medium ${task.status === 'done' ? 'line-through text-text-secondary' : 'text-text-primary'}`}>
                        {task.title}
                    </h3>
                    {task.dueDate && (
                        <div className={`text-xs mt-1 font-medium ${dueColor}`}>
                            마감: {task.dueDate}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex justify-between items-end mt-1">
                <div className="flex flex-wrap gap-1">
                    {task.tags.map(tag => (
                        <span key={tag} className="text-xs bg-bg-elevated px-2 py-1 rounded-md text-text-secondary">#{tag}</span>
                    ))}
                </div>
                <div className="flex items-center gap-3">
                    <select
                        className="bg-bg-elevated border border-transparent hover:border-border text-xs p-1 rounded outline-none"
                        value={task.status}
                        onChange={(e) => dispatch({ type: ACTIONS.UPDATE_TASK, payload: { id: task.id, status: e.target.value as TaskStatus } })}
                    >
                        <option value="todo">To Do</option>
                        <option value="in_progress">In Progress</option>
                        <option value="blocked">Blocked</option>
                        <option value="done">Done</option>
                    </select>
                    <button
                        className="text-text-muted hover:text-priority-p1 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => dispatch({ type: ACTIONS.DELETE_TASK, payload: { id: task.id } })}
                        title="삭제"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}
