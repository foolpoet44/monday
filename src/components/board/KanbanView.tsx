import React from 'react';
import { useBoardStore } from '../../store/useBoardStore';

export function KanbanView() {
    const { columns, groups, items } = useBoardStore();

    // Find priority or status column to group by
    const statusColumn = columns.find(c => c.type === 'status');

    if (!statusColumn) return <div className="p-8 text-center text-slate-500">Add a Status column to use Kanban View.</div>;

    const labelsKeys = Object.keys(statusColumn.settings.labels || {});

    return (
        <div className="h-full bg-slate-50 p-6 flex gap-4 overflow-x-auto">
            {labelsKeys.map(labelKey => {
                const labelConf = statusColumn.settings.labels[labelKey];
                const colItems = items.filter(item => {
                    const val = item.column_values[statusColumn.id]?.value || 'todo';
                    return val === labelKey;
                });

                return (
                    <div key={labelKey} className="w-[280px] shrink-0 flex flex-col bg-slate-100/50 rounded-lg max-h-full">
                        <div className="p-3 border-b-4" style={{ borderBottomColor: labelConf.color }}>
                            <div className="font-semibold text-slate-800">{labelConf.text || labelKey} <span className="text-slate-400 font-normal text-sm ml-1">{colItems.length}</span></div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-2">
                            {colItems.map(item => {
                                const group = groups.find(g => g.id === item.group_id);
                                return (
                                    <div key={item.id} className="bg-white p-3 rounded shadow-sm border border-slate-200 cursor-grab hover:shadow">
                                        <div className="text-sm font-medium mb-2">{item.name}</div>
                                        <div className="flex items-center gap-1">
                                            {group && <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">{group.title}</span>}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
