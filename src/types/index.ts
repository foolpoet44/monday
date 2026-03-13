export type Priority = 'P1' | 'P2' | 'P3';

export type TaskStatus = 'todo' | 'in_progress' | 'blocked' | 'done';

export interface Project {
    id: string;
    name: string;
    color: string;      // hex color e.g. '#4F6EF7'
    createdAt: string;  // ISO string
}

export interface Task {
    id: string;
    projectId: string | null;   // null = Inbox (미분류)
    title: string;
    status: TaskStatus;
    priority: Priority;
    dueDate: string | null;     // 'YYYY-MM-DD' format
    tags: string[];
    memo: string;               // 자유 메모 (옵션)
    createdAt: string;          // ISO string
    updatedAt: string;          // ISO string
}

// 뷰 필터 타입
export type ViewFilter =
    | { type: 'all' }
    | { type: 'project'; projectId: string }
    | { type: 'today' }
    | { type: 'urgent' };       // P1 필터

// 앱 전역 상태
export interface AppState {
    projects: Project[];
    tasks: Task[];
    activeFilter: ViewFilter;
    showDoneTasks: boolean;
}
