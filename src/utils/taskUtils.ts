import { isToday, isPast, parseISO } from 'date-fns';
import { Task, ViewFilter } from '../types';

const PRIORITY_WEIGHT = { P1: 0, P2: 1, P3: 2 };

export function sortTasks(tasks: Task[]): Task[] {
    return [...tasks].sort((a, b) => {
        const pw = PRIORITY_WEIGHT[a.priority] - PRIORITY_WEIGHT[b.priority];
        if (pw !== 0) return pw;

        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return a.dueDate.localeCompare(b.dueDate);
    });
}

export function filterTasks(tasks: Task[], filter: ViewFilter): Task[] {
    switch (filter.type) {
        case 'all':
            return tasks;
        case 'project':
            return tasks.filter(t => t.projectId === filter.projectId);
        case 'today':
            return tasks.filter(t => t.dueDate && isToday(parseISO(t.dueDate)));
        case 'urgent':
            return tasks.filter(t => t.priority === 'P1');
        default:
            return tasks;
    }
}

export function getTodayStats(tasks: Task[]) {
    const activeTasks = tasks.filter(t => t.status !== 'done');
    return {
        todayDue: activeTasks.filter(t => t.dueDate && isToday(parseISO(t.dueDate))).length,
        urgent: activeTasks.filter(t => t.priority === 'P1').length,
        overdue: activeTasks.filter(t => t.dueDate && isPast(parseISO(t.dueDate)) && !isToday(parseISO(t.dueDate))).length,
    };
}
