'use client'
import { getAllTodos, addTodo, deleteTodo, editTodo } from "@/api"
import AddTask from "./components/AddTask"
import TodoList from "./components/TodoList"
import { useEffect, useState } from "react"
import { ITask } from "../types/tasks"
import ThemeToggle from "./components/ThemeToggle";

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
    <div className="min-h-screen ">
      <main className="max-w-4xl mx-auto mt-4 bg-white rounded-xl shadow p-6">
        <div className="text-center my-5 flex items-center justify-between gap-4">
          <h1 className="text-2xl text-black font-bold">TODO LIST APP</h1>
          <ThemeToggle />
        </div>
        <div className="text-center my-5 flex flex-col gap-4">
          <AddTask onAdd={handleAdd} />
        </div>
        <TodoList tasks={tasks} onDelete={handleDelete} onEdit={handleEdit} />
      </main>
    </div>
  )
}