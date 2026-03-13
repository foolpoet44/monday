export type ColumnType = 'text' | 'status' | 'date' | 'number' | 'person';

export interface ColumnDef {
    id: string;
    board_id: string;
    title: string;
    type: ColumnType;
    settings: Record<string, any>;
    order: number;
}

export interface Board {
    id: string;
    workspace_id: string;
    name: string;
    description: string | null;
    created_at: string;
}

export interface Group {
    id: string;
    board_id: string;
    title: string;
    color: string;
    order: number;
}

export interface Item {
    id: string;
    group_id: string;
    name: string;
    column_values: Record<string, any>;
    order: number;
    created_at: string;
}

export interface Workspace {
    id: string;
    name: string;
    created_at: string;
}
