import { AppState, Task, Project } from '../types';
import { ACTIONS } from './actions';

export type AppAction =
    | { type: typeof ACTIONS.ADD_TASK; payload: Omit<Task, 'id' | 'createdAt' | 'updatedAt'> }
    | { type: typeof ACTIONS.UPDATE_TASK; payload: Partial<Task> & { id: string } }
    | { type: typeof ACTIONS.DELETE_TASK; payload: { id: string } }
    | { type: typeof ACTIONS.TOGGLE_TASK_DONE; payload: { id: string } }
    | { type: typeof ACTIONS.ADD_PROJECT; payload: Omit<Project, 'id' | 'createdAt'> }
    | { type: typeof ACTIONS.UPDATE_PROJECT; payload: Partial<Project> & { id: string } }
    | { type: typeof ACTIONS.DELETE_PROJECT; payload: { id: string } }
    | { type: typeof ACTIONS.SET_FILTER; payload: AppState['activeFilter'] }
    | { type: typeof ACTIONS.TOGGLE_SHOW_DONE }
    | { type: typeof ACTIONS.LOAD_FROM_STORAGE; payload: Partial<AppState> };

export function appReducer(state: AppState, action: AppAction): AppState {
    switch (action.type) {
        case ACTIONS.ADD_TASK: {
            const newTask: Task = {
                id: crypto.randomUUID(),
                ...action.payload,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
            return { ...state, tasks: [newTask, ...state.tasks] };
        }
        case ACTIONS.UPDATE_TASK: {
            return {
                ...state,
                tasks: state.tasks.map(t =>
                    t.id === action.payload.id
                        ? { ...t, ...action.payload, updatedAt: new Date().toISOString() }
                        : t
                ),
            };
        }
        case ACTIONS.DELETE_TASK:
            return { ...state, tasks: state.tasks.filter(t => t.id !== action.payload.id) };
        case ACTIONS.TOGGLE_TASK_DONE: {
            return {
                ...state,
                tasks: state.tasks.map(t =>
                    t.id === action.payload.id
                        ? { ...t, status: t.status === 'done' ? 'todo' : 'done', updatedAt: new Date().toISOString() }
                        : t
                ),
            };
        }
        case ACTIONS.ADD_PROJECT: {
            const newProject: Project = {
                id: crypto.randomUUID(),
                ...action.payload,
                createdAt: new Date().toISOString(),
            };
            return { ...state, projects: [...state.projects, newProject] };
        }
        case ACTIONS.UPDATE_PROJECT: {
            return {
                ...state,
                projects: state.projects.map(p =>
                    p.id === action.payload.id ? { ...p, ...action.payload } : p
                ),
            };
        }
        case ACTIONS.DELETE_PROJECT: {
            return {
                ...state,
                projects: state.projects.filter(p => p.id !== action.payload.id),
                tasks: state.tasks.map(t => t.projectId === action.payload.id ? { ...t, projectId: null } : t),
            };
        }
        case ACTIONS.SET_FILTER:
            return { ...state, activeFilter: action.payload };
        case ACTIONS.TOGGLE_SHOW_DONE:
            return { ...state, showDoneTasks: !state.showDoneTasks };
        case ACTIONS.LOAD_FROM_STORAGE:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}
