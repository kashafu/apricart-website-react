import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from 'universal-cookie';
import { getGeneralApiParams } from "../helpers/ApiHelpers";
const cookies = new Cookies();
let {  selectedAddress}= getGeneralApiParams();
console.log( selectedAddress);

var token = cookies.get(token) ;
const generalSlice = createSlice({
  name: "cart",
  initialState: {Address :selectedAddress},
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
  