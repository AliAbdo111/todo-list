import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const taskState = {
  updateState: false,
  loading: false,
  taskList: [],
  error: "",
  response: "",
};

export const fetchTaskes= createAsyncThunk(
  "task/fetchTask",
  async (data:any) => {
    const response = await axios.get(`http://localhost:9000/todo/`);
    console.log(response)
    return response.data;
  }
);
export interface Task{
  id?:number,
  title:string,
  description:string,
  category:number,
  user:number
}
export const addTask = createAsyncThunk(
  "task/addTask",
  async (data:Task) => {
    const response = await axios.post("http://localhost:9000/todo", data);
    return response.data.response;
  }
);

export const removeTask = createAsyncThunk(
  "task/removeTask",
  async (data:number) => {
    const response = await axios.delete(
      `http://localhost:9000/todo/${data}`
    );
    return response.data.response;
  }
);

export const modifiedTask= createAsyncThunk(
  "employee/modifiedEmployee",
  async (data:any) => {
    console.log(data.id)
    const response = await axios.patch(
      `http://localhost:9000/todo/${data.id}`,
     data
    );
    return response.data.response;
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState: taskState,
  reducers: {
    changeStateTrue: (state:any) => {
      state.updateState = true;
    },
    changeStateFalse: (state:any) => {
      state.updateState = false;
    },
    clearResponse: (state:any) => {
      state.response = "";
    },
  },
  extraReducers: (builder:any) => {
    builder
      .addCase(addTask.pending, (state:any) => {
        state.loading = true;
      })
      .addCase(addTask.fulfilled, (state:any, action:any) => {
        state.loading = false;
        console.log(action.payload)
        state.taskList.push(action.payload);
        state.response = "add";
      })
      .addCase(addTask.rejected, (state:any, action:PayloadAction) => {
        state.loading = false;
        state.error = action;
      });

    builder
      .addCase(fetchTaskes.fulfilled, (state:any, action:PayloadAction) => {
        state.taskList = action.payload;
      })
      .addCase(fetchTaskes.rejected, (state:any, action:PayloadAction) => {
        state.error = action;
      });

    builder.addCase(removeTask.fulfilled, (state :any, action :PayloadAction) => {
      console.log(action.payload)
      state.taskList = state.taskList.filter(
        (item:Task) => item.id != action.payload
      );
      state.response = "delete";
    });

    builder.addCase(modifiedTask.fulfilled, (state:any, action:any) => {
      const updateItem = action.payload;
      const index = state.taskList.findIndex(
        (item:Task) => item.id === updateItem.id
      );
      if (index!==-1) {
        state.taskList[index] = updateItem;
      }
      state.response = "update";
    });
  },
});

export default taskSlice.reducer;
export const { changeStateTrue, changeStateFalse, clearResponse } =
taskSlice.actions;
