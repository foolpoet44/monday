import React, { createContext, useReducer, useEffect, ReactNode, useContext } from 'react';
import { appReducer, AppAction } from './reducer';
import { AppState } from '../types';
import { ACTIONS } from './actions';
import { initialState, SAMPLE_PROJECTS, SAMPLE_TASKS } from './initialState';

const STORAGE_KEY = 'pm_task_manager_v1';

export const AppContext = createContext<{
    state: AppState;
    dispatch: React.Dispatch<AppAction>;
}>({ state: initialState, dispatch: () => null });

export function AppProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(appReducer, initialState);

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                dispatch({ type: ACTIONS.LOAD_FROM_STORAGE, payload: parsed });
            } catch (e) {
                console.error('Storage parse error:', e);
            }
        } else {
            // Load sample data if empty
            dispatch({ type: ACTIONS.LOAD_FROM_STORAGE, payload: { projects: SAMPLE_PROJECTS, tasks: SAMPLE_TASKS } });
        }
    }, []);

    useEffect(() => {
        if (state.projects.length > 0 || state.tasks.length > 0) {
            const toSave = {
                projects: state.projects,
                tasks: state.tasks,
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
        }
    }, [state.projects, state.tasks]);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}
