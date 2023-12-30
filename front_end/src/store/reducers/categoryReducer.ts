import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Category } from "../types";

const categoryState = {
  updateState: false,
  loading: false,
  categoryList: [],
  id:1,
  error: "",
  response: "",
};

export const fetchCategory= createAsyncThunk(
  "category/fetchCategory",
  async () => {
    const response = await axios.get("http://localhost:9000/category");
    return response.data;
    
  }
);

export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (data:Category) => {
    const response = await axios.post("http://localhost:9000/category", data);
    return response.data.response;
  }
);

export const setCategorySelected=createAsyncThunk(
  "categorySelected",
  (categoryId:any)=>{
    categoryState.id=categoryId;
}
)
export const modifiedCategory = createAsyncThunk(
  "category/modifiedCategory",
  async (data:any) => {
    const response = await axios.patch(
      `http://localhost:9000/category/${data.id}`,
      {
        CateogryName: data.CategoryName,
      }
    );
    return response.data;
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
    
    builder
      .addCase(modifiedCategory.fulfilled,(state:any,action:any)=>{
        const updateCategory=action.payload
        const index= state.categoryList.findIndex(
          (item:Category)=>item.id===updateCategory.id
          )
          state.categoryList[index]=updateCategory
      })
      .addCase(modifiedCategory.rejected, (state:any, action:any) => {
        state.error = action.error.message;
      });
    builder
      .addCase(setCategorySelected.fulfilled,
            ( state:any, action:PayloadAction)=>{
              state.id=action.payload;
            })

  },
});

export default taskSlice.reducer;
export const { changeStateTrue, changeStateFalse, clearResponse } =
taskSlice.actions;
