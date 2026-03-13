import React from 'react';
import { useBoardStore } from '../../store/useBoardStore';
import { GripVertical } from 'lucide-react';

export function TableView() {
    const { columns, groups, items } = useBoardStore();

    return (
        <div className="h-full overflow-auto bg-white p-6 pt-2">
            {groups.map(group => {
                const groupItems = items.filter(item => item.group_id === group.id).sort((a, b) => a.order - b.order);

                return (
                    <div key={group.id} className="mb-8">
                        {/* Group Header */}
                        <div className="flex items-center gap-2 mb-2 group/header">
                            <button className="opacity-0 group-hover/header:opacity-100 text-slate-400 hover:text-slate-600"><GripVertical size={16} /></button>
                            <h2 className="text-lg font-medium select-none" style={{ color: group.color }}>{group.title}</h2>
                            <span className="text-sm text-slate-400 ml-2">{groupItems.length} items</span>
                        </div>

                        {/* Grid Container */}
                        <div className="w-full border border-slate-200 rounded overflow-hidden">
                            {/* Header Row */}
                            <div className="flex bg-slate-50 border-b border-slate-200 text-sm font-medium text-slate-600 divide-x divide-slate-200">
                                <div className="w-[30px] shrink-0 bg-white border-l-[6px] border-l-transparent"></div> {/* Checkbox area */}
                                <div className="w-[300px] shrink-0 p-2 truncate">Item</div>
                                {columns.sort((a, b) => a.order - b.order).map(col => (
                                    <div key={col.id} className="w-[140px] shrink-0 p-2 text-center truncate">
                                        {col.title}
                                    </div>
                                ))}
                                <div className="flex-1 p-2"></div> {/* Spacer */}
                            </div>

                            {/* Data Rows */}
                            <div className="flex flex-col divide-y divide-slate-200">
                                {groupItems.map(item => (
                                    <div key={item.id} className="flex hover:bg-slate-50 transition-colors divide-x divide-slate-200 group/row">
                                        <div className="w-[30px] shrink-0 flex items-center justify-center bg-white border-l-[6px]" style={{ borderLeftColor: group.color }}>
                                            <input type="checkbox" className="w-4 h-4 opacity-0 group-hover/row:opacity-100" />
                                        </div>
                                        {/* Item Name */}
                                        <div className="w-[300px] shrink-0 p-2 flex items-center bg-white">
                                            <div className="truncate text-sm font-medium text-slate-800 px-1 py-0.5 rounded hover:bg-slate-100 w-full cursor-text" contentEditable suppressContentEditableWarning>
                                                {item.name}
                                            </div>
                                        </div>
                                        {/* Dynamic Columns */}
                                        {columns.sort((a, b) => a.order - b.order).map(col => {
                                            const cellData = item.column_values[col.id];
                                            return (
                                                <div key={col.id} className="w-[140px] shrink-0 bg-white relative">
                                                    <CellRenderer column={col} value={cellData?.value} />
                                                </div>
                                            );
                                        })}
                                        <div className="flex-1 bg-white border-none"></div> {/* Spacer */}
                                    </div>
                                ))}

                                {/* Add Item Row */}
                                <div className="flex text-sm text-slate-500 hover:bg-slate-50 cursor-pointer divide-x divide-slate-200">
                                    <div className="w-[30px] shrink-0 border-l-[6px]" style={{ borderLeftColor: group.color }}></div>
                                    <div className="w-[300px] shrink-0 p-2 truncate opacity-70 hover:opacity-100">+ Add Item</div>
                                    <div className="flex-1 border-none"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

// Temporary internal Renderer
function CellRenderer({ column, value }: { column: any, value: any }) {
    if (column.type === 'status') {
        const label = column.settings.labels?.[value || 'todo'];
        const color = label?.color || '#c4c4c4';
        const text = label?.text || '';

        return (
            <div className="w-full h-full flex items-center justify-center p-1">
                <div
                    className="w-full h-full min-h-[30px] flex items-center justify-center text-xs font-semibold text-white cursor-pointer select-none transition-opacity hover:opacity-90 max-w-[calc(100%-8px)]"
                    style={{ backgroundColor: color }}
                >
                    {text}
                    <div className="opacity-0 hover:opacity-100 absolute right-2 w-0 h-0 border-[4px] border-transparent border-t-white/70 mt-3"></div>
                </div>
            </div>
        );
    }

    if (column.type === 'date') {
        return (
            <div className="w-full h-full flex items-center justify-center text-sm p-1">
                <div className="px-2 py-1 rounded hover:bg-slate-100 cursor-pointer text-slate-600 w-full text-center">
                    {value || '-'}
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full flex items-center px-3 py-1 text-sm text-slate-700">
            {value || ''}
        </div>
    );
}
