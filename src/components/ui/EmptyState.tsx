import React from 'react';
import { ClipboardList } from 'lucide-react';

export function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-text-secondary border border-dashed border-border rounded-xl">
            <ClipboardList size={48} className="mb-4 opacity-50" />
            <p className="mb-2 text-text-primary text-lg font-medium">등록된 Task가 없습니다.</p>
            <div className="flex flex-col gap-2 text-sm mt-4 text-center">
                <p>예시: "내일 오전까지 주간 보고서 작성 P1"</p>
                <p>예시: "다음 주 수요일 킥오프 미팅 준비"</p>
            </div>
        </div>
    );
}
