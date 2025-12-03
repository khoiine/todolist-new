import { call, put, takeEvery } from 'redux-saga/effects';
import type { SagaIterator } from 'redux-saga';
import { setTasks, addTask, deleteTask, editTask } from '../slices/todoSlice';
import { getAllTodos, addTodo, deleteTodo, editTodo } from '@/api';

function* fetchTasks(): SagaIterator {
  const tasks = yield call(getAllTodos);
  yield put(setTasks(tasks));
}

function* handleAddTask(action: ReturnType<typeof addTask>): SagaIterator {
  yield call(addTodo, action.payload);
  yield call(fetchTasks);
}

function* handleDeleteTask(action: ReturnType<typeof deleteTask>): SagaIterator {
  yield call(deleteTodo, action.payload);
  yield call(fetchTasks);
}

function* handleEditTask(action: ReturnType<typeof editTask>): SagaIterator {
  yield call(editTodo, action.payload);
  yield call(fetchTasks);
}

export default function* todoSaga(): SagaIterator {
  yield takeEvery('todos/fetchTasks', fetchTasks);
  yield takeEvery(addTask.type, handleAddTask);
  yield takeEvery(deleteTask.type, handleDeleteTask);
  yield takeEvery(editTask.type, handleEditTask);
}