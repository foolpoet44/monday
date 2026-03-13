import React from 'react';
import { useAppContext } from '../../store/AppContext';
import { filterTasks, sortTasks } from '../../utils/taskUtils';
import { TaskCard } from './TaskCard';
import { EmptyState } from '../ui/EmptyState';
import { TodaySummary } from '../dashboard/TodaySummary';

export function TaskList() {
    const { state, dispatch } = useAppContext();
    const { tasks, activeFilter, showDoneTasks } = state;

    const filtered = filterTasks(tasks, activeFilter);
    const sorted = sortTasks(filtered);

    const activeTasks = sorted.filter(t => t.status !== 'done');
    const doneTasks = sorted.filter(t => t.status === 'done');

    return (
        <div className="flex flex-col gap-4 max-w-4xl mx-auto w-full">
            <h2 className="text-xl font-bold mb-4">
                {activeFilter.type === 'all' && '전체 보기'}
                {activeFilter.type === 'today' && '오늘 마감'}
                {activeFilter.type === 'urgent' && 'P1 긴급'}
                {activeFilter.type === 'project' && state.projects.find(p => p.id === activeFilter.projectId)?.name}
            </h2>

            {activeFilter.type === 'today' && <TodaySummary />}

            {activeTasks.length === 0 && doneTasks.length === 0 ? (
                <EmptyState />
            ) : (
                <div className="flex flex-col gap-3">
                    {activeTasks.map(task => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                </div>
            )}

            {doneTasks.length > 0 && (
                <div className="mt-8">
                    <button
                        className="text-sm text-text-secondary hover:text-text-primary mb-4 transition-colors"
                        onClick={() => dispatch({ type: 'TOGGLE_SHOW_DONE' })}
                    >
                        {showDoneTasks ? '완료된 Task 숨기기' : `완료된 Task ${doneTasks.length}개 보기`}
                    </button>

                    {showDoneTasks && (
                        <div className="flex flex-col gap-3">
                            {doneTasks.map(task => (
                                <TaskCard key={task.id} task={task} />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
