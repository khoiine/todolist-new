import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITask } from '@/types/tasks';

interface TodoState {
  tasks: ITask[];
}

const initialState: TodoState = {
  tasks: [],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<ITask[]>) {
      state.tasks = action.payload;
    },
    addTask(state, action: PayloadAction<ITask>) {
      state.tasks.push(action.payload);
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    editTask(state, action: PayloadAction<ITask>) {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
  },
});

export const { setTasks, addTask, deleteTask, editTask } = todoSlice.actions;
export default todoSlice.reducer;