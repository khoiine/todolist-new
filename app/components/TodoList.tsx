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
  // keep only name-based sorting
  const [sortOrder, setSortOrder] = useState<'none' | 'name-asc' | 'name-desc'>('none');

  const filteredTasks = useMemo(() => {
    const q = query.trim().toLowerCase();

    let list = tasks.filter(t => {
      const matchesQuery = q === "" ? true : t.text.toLowerCase().includes(q);
      return matchesQuery;
    });

    if (sortOrder === 'name-asc') {
      list = [...list].sort((a, b) =>
        a.text.localeCompare(b.text, undefined, { sensitivity: 'base' })
      );
    } else if (sortOrder === 'name-desc') {
      list = [...list].sort((a, b) =>
        b.text.localeCompare(a.text, undefined, { sensitivity: 'base' })
      );
    }

    return list;
  }, [tasks, query, sortOrder]);

  return (
    <div className="text-black">
      <div className="flex gap-2 mb-4  ">
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Tìm kiếm..."
          className="input input-bordered flex-1 bg-white border-[#92b7ff]"
        />

        <select
          value={sortOrder}
          onChange={e => setSortOrder(e.target.value as 'none' | 'name-asc' | 'name-desc')}
          className="select bg-white border-[#92b7ff] rounded pl-3"
        >
          <option value="none">Sắp xếp</option>
          <option value="name-asc">Tên: A → Z</option>
          <option value="name-desc">Tên: Z → A</option>
        </select>
      </div>

      <div className="overflow-x-auto ">
        <table className="table">
          <thead>
            <tr>
              <th className="text-black">Task</th>
              <th className="text-black">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <React.Fragment key={task.id}>
                <Task
                  task={task}
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
                <tr>
                  <td colSpan={2} className="p-0">
                    <hr className="border-t border-gray-200 my-0" />
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}