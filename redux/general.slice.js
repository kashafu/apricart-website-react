import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

var token = cookies.get(token) ;
const generalSlice = createSlice({
  name: "cart",
  initialState: {Address : ""},
  reducers: {
   Addressupdate : (state,action)=>{
   state.Address({...action.payload})
   }


  }
})


export const generalReducer = generalSlice.reducer;
export const {
    Addressupdate
  } = generalSlice.actions;
  