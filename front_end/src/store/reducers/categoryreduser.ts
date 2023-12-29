import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Category } from "../types";

const categoryState = {
  updateState: false,
  loading: false,
  categoryList: [],
  error: "",
  response: "",
};

export const fetchCategory= createAsyncThunk(
  "category/fetchCategory",
  async () => {
    const response = await axios.get("http://localhost:9000/category");
    console.log(response.data)
    return response.data;
  }
);

export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (data:Category) => {
    const response = await axios.post("http://localhost:9000/category", data);
    console.log(response.data)
    return response.data.response;
  }
);

export const removeTask = createAsyncThunk(
  "task/removeTask",
  async (data:Category) => {
    const response = await axios.delete(
      `http://localhost:8000/api/items/${data}`
    );
    return response.data.response;
  }
);

export const modifiedEmployee = createAsyncThunk(
  "employee/modifiedEmployee",
  async (data:any) => {
    const response = await axios.put(
      `http://localhost:8000/api/items/${data.id}`,
      {
        name: data.name,
        position: data.position,
      }
    );
    return response.data.response;
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState: categoryState,
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
      .addCase(addCategory.pending, (state:any) => {
        state.loading = true;
      })
      .addCase(addCategory.fulfilled, (state:any, action:any) => {
        state.loading = false;
        state.categoryList.push(action.payload);
        state.response = "add";
      })
      .addCase(addCategory.rejected, (state:any, action:any) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(fetchCategory.fulfilled, (state:any, action:any) => {
        state.categoryList = action.payload;
      })
      .addCase(fetchCategory.rejected, (state:any, action:any) => {
        state.error = action.error.message;
      });

    builder.addCase(removeTask.fulfilled, (state :any, action :any) => {
      state.categoryList = state.categoryList.filter(
        (item:Category) => item.id != action.payload
      );
      state.response = "delete";
    });

    builder.addCase(modifiedEmployee.fulfilled, (state:any, action:any) => {
      const updateItem = action.payload;
      console.log(updateItem);
      const index = state.categoryList.findIndex(
        (item:Category) => item.id === updateItem._id
      );
      if (index!==-1) {
        state.categoryList[index] = updateItem;
      }
      state.response = "update";
    });
  },
});

export default taskSlice.reducer;
export const { changeStateTrue, changeStateFalse, clearResponse } =
taskSlice.actions;
