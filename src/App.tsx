import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { BoardShell } from './components/board/BoardShell';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AppLayout />}>
                    {/* Default redirect to our mock board for prototype */}
                    <Route index element={<Navigate to="board/b1" replace />} />
                    <Route path="board/:boardId/*" element={<BoardShell />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
