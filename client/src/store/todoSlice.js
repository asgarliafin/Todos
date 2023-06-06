import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  todos: [],
  isLoading: false,
  error: undefined,
  activeTab: "all",
};

export const fetchTodos = createAsyncThunk("todos/fetch", async () => {
  const response = await axios.get("http://localhost:8000/todos/api");
  return response.data;
});

export const addTodo = createAsyncThunk("todos/add", async (todo) => {
  const response = await axios.post("http://localhost:8000/todos/api", todo);
  return response.data;
});

export const deleteTodo = createAsyncThunk("todos/delete", async (id) => {
  await axios.delete("http://localhost:8000/todos/api/" + id);
  return id;
});

export const updateTodo = createAsyncThunk("todos/update", async (payload) => {
  const { id, updatedTodo } = payload;
  const response = await axios.put(
    `http://localhost:8000/todos/api/${id}`,
    updatedTodo
  );
  return response.data;
});

export const deleteCompletedTodos = createAsyncThunk(
  "todos/deleteCompleted",
  async (completedTodos, { dispatch }) => {
    await axios.put(
      "http://localhost:8000/todos/api/delete/completed",
      completedTodos
    );
    dispatch(fetchTodos());
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTab: (state, { payload }) => {
      const tab = payload.toLowerCase();
      if (tab === "all" || tab === "active" || tab === "completed") {
        state.activeTab = tab;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, { payload }) => {
        state.todos = payload;
        state.isLoading = false;
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTodo.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(addTodo.fulfilled, (state, { payload }) => {
        state.todos.push(payload);
        state.isLoading = false;
      })
      .addCase(updateTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTodo.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateTodo.fulfilled, (state, { payload }) => {
        state.todos = state.todos.map((todo) => {
          if (todo._id === payload._id) {
            return payload;
          }
          return todo;
        });
        state.isLoading = false;
      })
      .addCase(deleteTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTodo.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteTodo.fulfilled, (state, { payload }) => {
        state.todos = state.todos.filter((todo) => todo._id !== payload);
        state.isLoading = false;
      });
  },
});

export default todoSlice.reducer;
export const { setTab } = todoSlice.actions;
