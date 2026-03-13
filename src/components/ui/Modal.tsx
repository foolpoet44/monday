import React, { ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
            <div className="bg-bg-surface w-full max-w-lg rounded-xl shadow-xl border border-border flex flex-col my-auto top-0">
                <div className="flex items-center justify-between p-4 border-b border-border text-lg font-semibold">
                    <h2>{title}</h2>
                    <button onClick={onClose} className="text-text-secondary hover:text-text-primary"><X size={20} /></button>
                </div>
                <div className="p-4">
                    {children}
                </div>
            </div>
        </div>
    );
}
