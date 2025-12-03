"use client";

import { FormEventHandler, useState } from "react"
import Modal from "./Modal"
import { v4 as uuidv4 } from 'uuid';
import { ITask } from "@/types/tasks"

interface AddTaskProps {
  onAdd: (task: ITask) => Promise<void>;
}

export default function AddTask({ onAdd }: AddTaskProps) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const text = newTaskValue.trim();
    if (!text) return;
    try {
      setSubmitting(true);
      await onAdd({ id: uuidv4(), text });
      setNewTaskValue("");
      setModalOpen(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <button onClick={() => setModalOpen(true)} className="btn btn-primary w-full">Thêm task</button>

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmitNewTodo}>
          <h3 className="font-bold text-lg">Thêm task mới</h3>
          <div className="modal-action">
            <input
              value={newTaskValue}
              onChange={e => setNewTaskValue(e.target.value)}
              type="text"
              placeholder="Nhập task"
              className="input w-full"
            />
            <button type="submit" className="btn" disabled={submitting || !newTaskValue.trim()}>
              {submitting ? "Đang thêm..." : "Thêm"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}