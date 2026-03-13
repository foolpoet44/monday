import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './store/AppContext';
import { AppLayout } from './components/layout/AppLayout';
import { TaskList } from './components/task/TaskList';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<TaskList />} />
            <Route path="today" element={<TaskList />} />
            <Route path="urgent" element={<TaskList />} />
            <Route path="project/:projectId" element={<TaskList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
