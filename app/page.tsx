'use client'
import { getAllTodos, addTodo, deleteTodo, editTodo } from "@/api"
import AddTask from "./components/AddTask"
import TodoList from "./components/TodoList"
import { useEffect, useState } from "react"
import { ITask } from "../types/tasks"

export default function Home() {
  const [tasks, setTasks] = useState<ITask[]>([])

  const fetchTasks = async () => {
    const res = await getAllTodos()
    setTasks(res)
    console.log('fetch tasks')
  }

  useEffect(() => {
    fetchTasks();
  }, [])

  const handleAdd = async (task: ITask) => {
    await addTodo(task)
    await fetchTasks()
  }

  const handleDelete = async (id: string) => {
    await deleteTodo(id)
    await fetchTasks()
  }

  const handleEdit = async (updatedTask: ITask) => {
    await editTodo(updatedTask)
    await fetchTasks()
  }

  return (
    <div className="min-h-screen bg-base-200">
      <main className="max-w-4xl mx-auto mt-4 bg-base-100 rounded-xl shadow p-6">
        <div className="text-center my-5 flex flex-col gap-4">
          <h1 className="text-2xl font-bold">Todo List App</h1>
          <AddTask onAdd={handleAdd} />
        </div>
        <TodoList tasks={tasks} onDelete={handleDelete} onEdit={handleEdit} />
      </main>
    </div>
  )
}