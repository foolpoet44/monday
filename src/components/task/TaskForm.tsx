import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { useAppContext } from '../../store/AppContext';
import { ACTIONS } from '../../store/actions';
import { Priority, TaskStatus } from '../../types';

interface TaskFormProps {
    isOpen: boolean;
    onClose: () => void;
}

export function TaskForm({ isOpen, onClose }: TaskFormProps) {
    const { state, dispatch } = useAppContext();
    const [title, setTitle] = useState('');
    const [projectId, setProjectId] = useState<string>('');
    const [priority, setPriority] = useState<Priority>('P3');
    const [dueDate, setDueDate] = useState('');
    const [memo, setMemo] = useState('');
    const [tagsInput, setTagsInput] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [status, setStatus] = useState<TaskStatus>('todo');

    useEffect(() => {
        if (isOpen) {
            setTitle(''); setProjectId(''); setPriority('P3'); setDueDate(''); setMemo(''); setTagsInput(''); setTags([]); setStatus('todo');
            // If active filter is project, preselect it
            if (state.activeFilter.type === 'project') {
                setProjectId(state.activeFilter.projectId);
            }
        }
    }, [isOpen, state.activeFilter]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        dispatch({
            type: ACTIONS.ADD_TASK,
            payload: {
                title,
                priority,
                dueDate: dueDate || null,
                memo,
                tags,
                status,
                projectId: projectId || null
            }
        });
        onClose();
    };

    const handleTagKeydown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (tagsInput.trim() && !tags.includes(tagsInput.trim())) {
                setTags([...tags, tagsInput.trim()]);
                setTagsInput('');
            }
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="새 Task">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label className="block text-sm mb-1 text-text-secondary">제목 <span className="text-priority-p1">*</span></label>
                    <input autoFocus required type="text" className="w-full bg-bg-base border border-border p-2 rounded-md outline-none focus:border-accent text-text-primary" value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div>
                    <label className="block text-sm mb-1 text-text-secondary">프로젝트</label>
                    <select className="w-full bg-bg-base border border-border p-2 rounded-md outline-none focus:border-accent text-text-primary" value={projectId} onChange={e => setProjectId(e.target.value)}>
                        <option value="">Inbox (분류 없음)</option>
                        {state.projects.map(p => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                    </select>
                </div>
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-sm mb-1 text-text-secondary">우선순위</label>
                        <select className="w-full bg-bg-base border border-border p-2 rounded-md outline-none focus:border-accent text-text-primary" value={priority} onChange={e => setPriority(e.target.value as Priority)}>
                            <option value="P1">P1 (긴급)</option>
                            <option value="P2">P2 (보통)</option>
                            <option value="P3">P3 (낮음)</option>
                        </select>
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm mb-1 text-text-secondary">상태</label>
                        <select className="w-full bg-bg-base border border-border p-2 rounded-md outline-none focus:border-accent text-text-primary" value={status} onChange={e => setStatus(e.target.value as TaskStatus)}>
                            <option value="todo">To Do</option>
                            <option value="in_progress">In Progress</option>
                            <option value="blocked">Blocked</option>
                            <option value="done">Done</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label className="block text-sm mb-1 text-text-secondary">마감일</label>
                    <input type="date" className="w-full bg-bg-base border border-border p-2 rounded-md outline-none focus:border-accent text-text-primary [color-scheme:dark]" value={dueDate} onChange={e => setDueDate(e.target.value)} />
                </div>
                <div>
                    <label className="block text-sm mb-1 text-text-secondary">태그 (Enter로 추가)</label>
                    <input type="text" className="w-full bg-bg-base border border-border p-2 rounded-md outline-none focus:border-accent text-text-primary mb-2" value={tagsInput} onChange={e => setTagsInput(e.target.value)} onKeyDown={handleTagKeydown} />
                    <div className="flex flex-wrap gap-2">
                        {tags.map(t => (
                            <span key={t} className="bg-bg-elevated px-2 py-1 rounded-md text-xs border border-border flex items-center gap-1">
                                {t} <span className="cursor-pointer text-text-secondary hover:text-text-primary" onClick={() => setTags(tags.filter(x => x !== t))}>&times;</span>
                            </span>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="block text-sm mb-1 text-text-secondary">메모</label>
                    <textarea className="w-full bg-bg-base border border-border p-2 rounded-md outline-none focus:border-accent h-24 text-text-primary" value={memo} onChange={e => setMemo(e.target.value)} />
                </div>
                <div className="flex justify-end gap-2 mt-4">
                    <button type="button" onClick={onClose} className="px-4 py-2 border border-border rounded-md hover:bg-bg-elevated">취소</button>
                    <button type="submit" className="px-4 py-2 bg-accent text-white rounded-md hover:opacity-90">저장</button>
                </div>
            </form>
        </Modal>
    );
}
