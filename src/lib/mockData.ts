import { Board, ColumnDef, Group, Item } from '../types';

export const mockBoard: Board = {
    id: 'b1',
    workspace_id: 'w1',
    name: '개발 스프린트 백로그',
    description: '프론트엔드 및 백엔드 개발 태스크 관리',
    created_at: new Date().toISOString()
};

export const mockColumns: ColumnDef[] = [
    {
        id: 'c_status', board_id: 'b1', title: '상태', type: 'status', order: 1, settings: {
            labels: {
                'done': { text: 'Done', color: '#00C875' },
                'working': { text: 'Working on it', color: '#FDAB3D' },
                'stuck': { text: 'Stuck', color: '#E2445C' },
                'todo': { text: '', color: '#C4C4C4' }
            }
        }
    },
    { id: 'c_date', board_id: 'b1', title: '완료일', type: 'date', order: 2, settings: {} },
    {
        id: 'c_priority', board_id: 'b1', title: '우선순위', type: 'status', order: 3, settings: {
            labels: {
                'high': { text: 'High', color: '#401694' },
                'medium': { text: 'Medium', color: '#5559DF' },
                'low': { text: 'Low', color: '#579BFC' },
                'none': { text: '', color: '#C4C4C4' }
            }
        }
    },
];

export const mockGroups: Group[] = [
    { id: 'g1', board_id: 'b1', title: 'This Week', color: '#579BFC', order: 1 },
    { id: 'g2', board_id: 'b1', title: 'Next Week', color: '#A25DDC', order: 2 },
];

export const mockItems: Item[] = [
    {
        id: 'i1', group_id: 'g1', name: 'Zustand Store 아키텍처 설계', order: 1, created_at: new Date().toISOString(), column_values: {
            'c_status': { value: 'working' },
            'c_priority': { value: 'high' }
        }
    },
    {
        id: 'i2', group_id: 'g1', name: 'Supabase 스키마 반영', order: 2, created_at: new Date().toISOString(), column_values: {
            'c_status': { value: 'done' },
            'c_date': { value: '2026-03-15' },
            'c_priority': { value: 'high' }
        }
    },
    {
        id: 'i3', group_id: 'g2', name: 'Drag & Drop 연동', order: 1, created_at: new Date().toISOString(), column_values: {
            'c_status': { value: 'todo' },
            'c_priority': { value: 'medium' }
        }
    },
];
