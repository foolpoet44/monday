import { create } from 'zustand';
import { Board, ColumnDef, Group, Item } from '../types';
import { mockBoard, mockColumns, mockGroups, mockItems } from '../lib/mockData';

interface BoardState {
    board: Board | null;
    columns: ColumnDef[];
    groups: Group[];
    items: Item[];

    // Actions
    loadMockData: () => void;
    updateItemCell: (itemId: string, columnId: string, value: any) => void;
    updateItemName: (itemId: string, name: string) => void;
    addItem: (groupId: string, name: string) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
    board: null,
    columns: [],
    groups: [],
    items: [],

    loadMockData: () => {
        set({
            board: mockBoard,
            columns: mockColumns,
            groups: mockGroups,
            items: mockItems
        });
    },

    updateItemCell: (itemId, columnId, value) => {
        set((state) => ({
            items: state.items.map(item => {
                if (item.id === itemId) {
                    return {
                        ...item,
                        column_values: {
                            ...item.column_values,
                            [columnId]: { value }
                        }
                    };
                }
                return item;
            })
        }));
    },

    updateItemName: (itemId, name) => {
        set((state) => ({
            items: state.items.map(item => item.id === itemId ? { ...item, name } : item)
        }));
    },

    addItem: (groupId, name) => {
        const newItem: Item = {
            id: crypto.randomUUID(),
            group_id: groupId,
            name,
            column_values: {},
            order: 999, // default to bottom
            created_at: new Date().toISOString()
        };

        set((state) => ({
            items: [...state.items, newItem]
        }));
    }
}));
