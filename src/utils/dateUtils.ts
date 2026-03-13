import { isToday, isTomorrow, isPast, parseISO } from 'date-fns';

export type DueDateStatus = 'overdue' | 'today' | 'tomorrow' | 'upcoming' | 'none';

export function getDueDateStatus(dueDate: string | null, isDone: boolean): DueDateStatus {
    if (!dueDate || isDone) return 'none';
    const date = parseISO(dueDate);
    if (isPast(date) && !isToday(date)) return 'overdue';
    if (isToday(date)) return 'today';
    if (isTomorrow(date)) return 'tomorrow';
    return 'upcoming';
}
