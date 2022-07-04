import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

var token = cookies.get(token) ;
const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  
  reducers: {
    addToCart: (state, action) => {
      const itemExists = state.find((item) => item.id === action.payload.id);
      //const data =
      // {cart : 
      //  [
      //      {
      //       sku: action.payload.sku,
      //       qty: action.payload.qty
      //      }
      //  ]}
      //  console.log(data.cart)
      
      // if (token){
      //   console.log("AVG ")
      //   console.log(list.sku);
      //   const response =  axios.post( 'https://staging.apricart.pk/v1/order/cart/save?city=karachi&lang=en' ,data,{
      //     headers:{
      //       "Content-Type": "application/json",
      //       Authorization: "Bearer " + cookies.get("cookies-token"),
      //     },
      //   } 
        
        // );
      // } 
      if (itemExists) {
        itemExists.quantity++;
      } else {
        state.push({...action.payload, quantity: 1 });
      }
      cookies.set('cart-item',JSON.stringify(...state))
    },
    updatedcart:(state,action)=>{
      let userId=cookies.get('cookies-userId');
      // let cartAll={}
      // cartAll = async() =>{
      //   const response = await axios.get(
      //     `https://staging.apricart.pk/v1/order/cart/all?userid=10638`,
      //    { headers: {
      //       'Content-Type' : 'application/json',
      //       'Authorization' : 'Bearer ' + cookies.get('cookies-token'),
      //     }}
      //   ).then(()=>{
      //     console.log(response.data);
      //     cart= response.data.data;
      //     state.push({...action.payload})
      //   }
      
         // );
         let carti=[];
        carti=[
        
       
        {
          
                "id": 10728,
                "sku": "APR-T07-00",
                "title": "Tapal Danedar - 190gm",
                "description": "Tapal Danedar - 190gm",
                "brand": "Tapal",
                "barcode": "",
                "inStock": true,
                "qty": 41,
                "minQty": 1,
                "maxQty": 1000,
                "categoryIds": " 1216 | 1140 | 0",
                "categoryleafName": " Tea & Coffee",
                "currentPrice": 240,
                "specialPrice": 0,
                "productImageUrl": "http://15.184.248.248:8080/options/stream/APR-T07-00.png",
                "productImageUrlThumbnail": "http://15.184.248.248:8080/options/stream/APR-T07-00_thumbnail.png",
                "updateDateTimeInventory": "2022-06-15T14:46:05.566648",
                "updateTime": null,
                "instant": false,
                "favourite": true
            ,
            "cityInfo": null
        }]
      let  qty = action.payload.qty;
 
//        
      state.push({...action.payload,quantity:qty});
  
      }

    ,
    incrementQuantity: (state, action) => {
      const item = state.find((item) => item.id === action.payload);
      if (item.quantity < item.maxQty) {
        item.quantity++;
      } else {
        item.quantity;
        toast.info("Limit Exceeded !");
        
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.find((item) => item.id === action.payload);
      if (item.quantity === 1) {
        const index = state.findIndex((item) => item.id === action.payload);
        state.splice(index, 1);
      } else {
        item.quantity--;
      }
    },
    Initilaize(state,action){
      state.push({undefined,action})
    }
    ,
    removeFromCart: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload);
      state.splice(index, 1);
      toast.info("Item Removed !");
    },
  },
});


export const cartReducer = cartSlice.reducer;

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  updatedcart,
  Initilaize
} = cartSlice.actions;
