import { Project, Task, AppState } from '../types';

const today = new Date().toISOString().split('T')[0];
const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
const in3days = new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0];
const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

export const SAMPLE_PROJECTS: Project[] = [
    { id: 'p1', name: 'AX 교육 설계', color: '#4F6EF7', createdAt: new Date().toISOString() },
    { id: 'p2', name: 'Pulse Check', color: '#4FD6A6', createdAt: new Date().toISOString() },
    { id: 'p3', name: 'ESCON 온톨로지', color: '#F7A74F', createdAt: new Date().toISOString() },
];

export const SAMPLE_TASKS: Task[] = [
    {
        id: 't1', projectId: 'p1', title: 'AX 교육 커리큘럼 초안 작성',
        status: 'in_progress', priority: 'P1',
        dueDate: today, tags: ['팀장보고'], memo: '',
        createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    },
    {
        id: 't2', projectId: 'p2', title: '분기 Pulse Check 설문 문항 검토',
        status: 'todo', priority: 'P2',
        dueDate: tomorrow, tags: ['검토필요'], memo: '',
        createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    },
    {
        id: 't3', projectId: 'p3', title: 'Supabase temporal 컬럼 추가',
        status: 'blocked', priority: 'P2',
        dueDate: in3days, tags: [], memo: 'valid_from / valid_to 컬럼',
        createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    },
    {
        id: 't4', projectId: 'p1', title: 'MS Copilot 실습 Lab 가이드 완성',
        status: 'todo', priority: 'P1',
        dueDate: yesterday, tags: ['긴급'], memo: '',
        createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    },
];

export const initialState: AppState = {
    projects: [],
    tasks: [],
    activeFilter: { type: 'all' },
    showDoneTasks: false,
};
