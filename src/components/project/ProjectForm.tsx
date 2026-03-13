import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import { ACTIONS } from '../../store/actions';

const PRESET_COLORS = ['#4F6EF7', '#4FD6A6', '#F7A74F', '#F75F5F', '#9D4FF7', '#F74F9E'];

interface ProjectFormProps {
    onClose: () => void;
}

export function ProjectForm({ onClose }: ProjectFormProps) {
    const { dispatch } = useAppContext();
    const [name, setName] = useState('');
    const [color, setColor] = useState(PRESET_COLORS[0]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;
        dispatch({ type: ACTIONS.ADD_PROJECT, payload: { name, color } });
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="p-3 bg-bg-elevated rounded-md flex flex-col gap-2 mt-2">
            <input
                autoFocus
                type="text"
                placeholder="프로젝트 이름"
                value={name}
                onChange={e => setName(e.target.value)}
                className="bg-bg-base border border-border p-1.5 rounded text-sm outline-none focus:border-accent text-text-primary"
            />
            <div className="flex justify-between px-1">
                {PRESET_COLORS.map(c => (
                    <button
                        key={c} type="button"
                        className={`w-4 h-4 rounded-full ${color === c ? 'ring-2 ring-white ring-offset-2 ring-offset-bg-elevated' : ''}`}
                        style={{ backgroundColor: c }}
                        onClick={() => setColor(c)}
                    />
                ))}
            </div>
            <div className="flex justify-end gap-2 mt-1">
                <button type="button" onClick={onClose} className="text-xs text-text-secondary hover:text-text-primary">취소</button>
                <button type="submit" className="text-xs text-accent font-medium">추가</button>
            </div>
        </form>
    );
}
