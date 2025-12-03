"use client";
import { ITask } from "@/types/tasks";
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";

interface TaskProps {
    task: ITask;
    onDelete: (id: string) => void;
    onEdit: (updatedTask: ITask) => void;
}

const Task = ({ task, onDelete, onEdit }: TaskProps) => {
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
    const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
    const [taskToEdit, setTaskToEdit] = useState<string>(task.text);
    const [localCompleted, setLocalCompleted] = useState<boolean>(!!(task as any).completed);

    const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        onEdit({
            id: task.id,
            text: taskToEdit,
            // preserve completed flag
            ...(task as any).completed !== undefined ? { completed: (task as any).completed } : {},
        } as ITask);
        setOpenModalEdit(false);
    };

    const handleDeletedTask = (id: string) => {
        onDelete(id);
        setOpenModalDeleted(false);
    };

    const toggleCompleted = async () => {
        const newCompleted = !localCompleted;
        // optimistic UI update
        setLocalCompleted(newCompleted);
        onEdit({
            id: task.id,
            text: task.text,
            completed: newCompleted,
        } as ITask);
    };

    return (
        <>
            <tr>
                <td className="w-full">
                    <label className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            checked={localCompleted}
                            onChange={toggleCompleted}
                            className="checkbox bg-[#605dff]"
                            aria-label={localCompleted ? "Mark as incomplete" : "Mark as complete"}
                        />
                        <span className={localCompleted ? "line-through text-gray-400" : ""}>
                            {task.text}
                        </span>
                    </label>
                </td>

                <td className="flex gap-5">
                    <button
                        type="button"
                        onClick={() => setOpenModalEdit(true)}
                        className="icon-button p-0 focus:outline-none focus:ring-0"
                        aria-label="Sửa task"
                    >
                        <FiEdit cursor="pointer" className="text-blue-500" size={22} />
                    </button>

                    <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
                        <form onSubmit={handleSubmitEditTodo}>
                            <h3 className="font-bold text-lg">Sửa task</h3>
                            <div className="modal-action mt-4">
                                <input
                                    value={taskToEdit}
                                    onChange={(e) => setTaskToEdit(e.target.value)}
                                    type="text"
                                    placeholder="Nhập task"
                                    className="input w-full bg-white text-black border-[#92b7ff]"
                                />
                                <button
                                    type="submit"
                                    className="btn bg-red-500 border-none text-white rounded focus:outline-none focus:ring-0"
                                >
                                    Lưu
                                </button>
                            </div>
                        </form>
                    </Modal>

                    <button
                        type="button"
                        onClick={() => setOpenModalDeleted(true)}
                        className="icon-button p-0 focus:outline-none focus:ring-0"
                        aria-label="Xóa task"
                    >
                        <FiTrash2 cursor="pointer" className="text-red-500" size={22} />
                    </button>

                    <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
                        <h3 className="text-lg">Bạn có muốn xóa không?</h3>
                        <div className="modal-action">
                            <button onClick={() => handleDeletedTask(task.id)} className="btn border-none bg-red-500 text-white rounded">
                                Có
                            </button>
                        </div>
                    </Modal>
                </td>
            </tr>
        </>
    );
};

export default Task;