import { ITask } from "./types/tasks";

export const baseUrl = 'https://data-server-slk0.onrender.com';

// GET tasks (optionally filter by userId)
export const getAllTodos = async (userId?: string): Promise<ITask[]> => {
    const url = userId ? `${baseUrl}/tasks?userId=${encodeURIComponent(String(userId))}` : `${baseUrl}/tasks`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
    return res.json();
};

// POST new task — attach userId if provided
export const addTodo = async (todo: ITask, userId?: string): Promise<ITask> => {
    const body = { ...todo, ...(userId ? { userId } : {}) };
    const res = await fetch(`${baseUrl}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`Add failed: ${res.status}`);
    return res.json();
};

// PUT and DELETE unchanged but keep same endpoints
export const editTodo = async (todo: ITask): Promise<ITask> => {
    const res = await fetch(`${baseUrl}/tasks/${todo.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todo),
    });
    if (!res.ok) throw new Error(`Edit failed: ${res.status}`);
    return res.json();
};

export const deleteTodo = async (id: string): Promise<void> => {
    const res = await fetch(`${baseUrl}/tasks/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(`Delete failed: ${res.status}`);
};

// --- auth helpers for json-server ---
export interface IUser {
    id?: string | number;
    username: string;
    password: string;
}

export const createUser = async (user: IUser): Promise<IUser> => {
    const res = await fetch(`${baseUrl}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    });
    if (!res.ok) throw new Error(`Create user failed: ${res.status}`);
    return res.json();
};

export const findUser = async (username: string, password: string): Promise<IUser | null> => {
    const q = `?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
    const res = await fetch(`${baseUrl}/users${q}`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Find user failed: ${res.status}`);
    const users: IUser[] = await res.json();
    return users.length ? users[0] : null;
};

export const getUserByUsername = async (username: string): Promise<IUser | null> => {
    const q = `?username=${encodeURIComponent(username)}`;
    const res = await fetch(`${baseUrl}/users${q}`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Get user failed: ${res.status}`);
    const users: IUser[] = await res.json();
    return users.length ? users[0] : null;
};