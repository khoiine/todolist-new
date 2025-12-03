"use client";
import { ITask } from "@/types/tasks"
import React, { useMemo, useState } from "react"
import Task from "./Task"

interface TodoListProps {
  tasks: ITask[]
  onDelete: (id: string) => void
  onEdit: (updatedTask: ITask) => void
}

export default function TodoList({ tasks, onDelete, onEdit }: TodoListProps) {
  const [query, setQuery] = useState<string>('');
  const [lengthFilter, setLengthFilter] = useState<'all' | 'short' | 'long'>('all');

  const filteredTasks = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tasks.filter(t => {
      const matchesQuery = q === "" ? true : t.text.toLowerCase().includes(q);
      if (!matchesQuery) return false;
      if (lengthFilter === 'short') return t.text.length < 20;
      if (lengthFilter === 'long') return t.text.length >= 20;
      return true;
    });
  }, [tasks, query, lengthFilter]);

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Tìm kiếm..."
          className="input input-bordered flex-1"
        />
        <select
          value={lengthFilter}
          onChange={e => setLengthFilter(e.target.value as 'all' | 'short' | 'long')}
          className="select select-bordered"
        >
          <option value="all">Tất cả</option>
          <option value="short">Ngắn (dưới 20 ký tự)</option>
          <option value="long">Dài (trên 20 ký tự)</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Tasks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <Task
                key={task.id}
                task={task}
                onDelete={onDelete}
                onEdit={onEdit}
              />))}
          </tbody>
        </table>
      </div>
    </div>
  )
}