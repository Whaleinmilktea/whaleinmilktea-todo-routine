import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  routines: [
    {
      id: uuidv4(),
      title: "프로그래머스 코딩테스트 2제",
      time: "07:00",
      check: false,
    },
  ],
  todos: [
    {
      id: uuidv4(),
      title: "프로그래머스 코딩테스트 2제",
      date: "2023-04-08",
      time: "07:00",
      check: false,
    },
  ],
};

const addSlice = createSlice({
  name: "add",
  initialState,
  reducers: {
    addRoutine: (state, action) => {
      const { title, time } = action.payload;
      // 새로운 action을 생성하는 action 생성자
      const newRoutine = {
        id: uuidv4(),
        title,
        time,
        check: false,
      };
      // 추출된 배열을 date/time 순으로 정렬
      state.routines.push(newRoutine);
    },
    addTodo: (state, action) => {
      const { title, date, time } = action.payload;
      const newTodo = {
        id: uuidv4(),
        title,
        date,
        time,
        check: false,
      };
      state.todos.push(newTodo);
    },
    deleteRoutine: (state, action) => {
      const { id } = action.payload;
      state.routines = state.routines.filter((routine) => routine.id !== id);
    },
    deleteTodo: (state, action) => {
      const { id } = action.payload;
      state.todos = state.todos.filter((todo) => todo.id !== id);
    },
    updateRoutine: (state, action) => {
      const { id, title, time } = action.payload;
      const routineToUpdate = state.routines.find(
        (routine) => routine.id === id
      );
      if (routineToUpdate) {
        routineToUpdate.title = title;
        routineToUpdate.time = time;
      }
    },
    updateTodo: (state, action) => {
      const { id, title, date, time } = action.payload;
      const todoToUpdate = state.todos.find((todo) => todo.id === id);
      if (todoToUpdate) {
        todoToUpdate.title = title;
        todoToUpdate.date = date;
        todoToUpdate.time = time;
      }
    },
  },
});

export const {
  addRoutine,
  addTodo,
  deleteRoutine,
  deleteTodo,
  updateRoutine,
  updateTodo,
} = addSlice.actions;

export default addSlice.reducer;
