import {createAsyncThunk,createSlice}from '@reduxjs/toolkit';
import { Api } from '../serviceApi';



    const aouthState={
        response:'',
        error:'',
        updateState:false,
        loading:'',
        user:{},
        id:0
    };


  export const loginUser = createAsyncThunk(
        'auoth/login',
        async (data : any) => {
        const  response = await Api.post('/user/signIn' ,data);
        return response.data.data
    });


    const AuothSlice = createSlice({
        name                  : 'Auoth',
        initialState          : aouthState,
        reducers: {
            changeStateTrue   : (state:any) => {
            state.updateState = true;
            },
            changeStateFalse  : (state:any) => {
            state.updateState = false;
            },
            clearResponse     : (state:any) => {
            state.response    = "";
            },
        },

        extraReducers : (builder : any) => {
            builder

                .addCase(loginUser.rejected,
                    (state: any,action: any)=>{
                        state.loading  = true;
                        state.error    = action.payload.error.message
                    })

                .addCase(loginUser.fulfilled,
                    (state: any, action: any)=>{
                        state.loading  = true;
                        state.user     = action.payload;
                        state.id       = action.payload.id;
                        state.response = "login"
                })
        }
    })

export default AuothSlice.reducer;
export const { changeStateTrue, changeStateFalse, clearResponse } =
AuothSlice.actions;
