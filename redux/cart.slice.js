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
      const data =
      {cart : 
       [
           {
            sku: action.payload.sku,
            qty: action.payload.qty
           }
       ]}
       console.log(data.cart)
      
      if (token){
        console.log("AVG ")
        console.log(list.sku);
        const response =  axios.post( 'https://staging.apricart.pk/v1/order/cart/save?city=karachi&lang=en' ,data,{
          headers:{
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookies.get("cookies-token"),
          },
        } 
        
        );
      } if (itemExists) {
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
             
                  "id": 12158,
                  "sku": "APR-MP02-02",
                  "title": "Nestle Every Day - 850gm",
                  "description": "Nestle Every Day - 850gm",
                  "brand": "Nestle",
                  "barcode": "",
                  "inStock": true,
                  "qty": 50,
                  "minQty": 1,
                  "maxQty": 1000,
                  "categoryIds": " 1217 | 1183 | 1154 | 0",
                  "categoryleafName": " Tea Whiteners",
                  "currentPrice": 1125,
                  "specialPrice": 0,
                  "productImageUrl": "http://15.184.248.248:8080/options/stream/APR-MP02-02.png",
                  "productImageUrlThumbnail": "http://15.184.248.248:8080/options/stream/APR-MP02-02_thumbnail.png",
                  "updateDateTimeInventory": "2022-06-15T16:38:31.426391",
                  "updateTime": null,
                  "instant": false,
                  "favourite": true
              ,
              "cityInfo": null
          },
          {
                  "id": 10413,
                  "sku": "APR-SK01-02",
                  "title": "Hilal Fresh Up Spearmint Bubble Gum - 36pcs",
                  "description": "Hilal Fresh Up Spearmint Bubble Gum - 36pcs",
                  "brand": "Hilal",
                  "barcode": "",
                  "inStock": true,
                  "qty": 8,
                  "minQty": 1,
                  "maxQty": 1000,
                  "categoryIds": " 1144 | 1211 | 0",
                  "categoryleafName": " Candies & Jellies",
                  "currentPrice": 100,
                  "specialPrice": 0,
                  "productImageUrl": "http://15.184.248.248:8080/options/stream/APR-SK01-02.png",
                  "productImageUrlThumbnail": "",
                  "updateDateTimeInventory": "2022-06-20T15:51:12.927687",
                  "updateTime": null,
                  "instant": false,
                  "favourite": true,
                   "cityInfo": null
          },
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
          },
          {
             
                  "id": 10140,
                  "sku": "APR-VGF01-17",
                  "title": "Lemon (Leemun) Local 250g",
                  "description": "Lemon (Leemun) Local 250g",
                  "brand": "",
                  "barcode": "",
                  "inStock": true,
                  "qty": 39,
                  "minQty": 1,
                  "maxQty": 1000,
                  "categoryIds": " 1220 | 1166 | 0",
                  "categoryleafName": " Vegetables",
                  "currentPrice": 115,
                  "specialPrice": 75,
                  "productImageUrl": "http://15.184.248.248:8080/options/stream/APR-VGF01-17.png",
                  "productImageUrlThumbnail": "",
                  "updateDateTimeInventory": "2022-06-13T18:28:20.753676",
                  "updateTime": null,
                  "instant": false,
                  "favourite": true
              ,
              "cityInfo": null
          },
          {
             
                  "id": 9792,
                  "sku": "APRA-OB08-01",
                  "title": "Eggs 1 Dozen",
                  "description": "Eggs 1 Dozen",
                  "brand": "Eggs",
                  "barcode": "",
                  "inStock": true,
                  "qty": 10,
                  "minQty": 1,
                  "maxQty": 1000,
                  "categoryIds": " 1158 | 1154 | 0",
                  "categoryleafName": " Eggs",
                  "currentPrice": 180,
                  "specialPrice": 0,
                  "productImageUrl": "http://15.184.248.248:8080/options/stream/APRA-OB08-01.png",
                  "productImageUrlThumbnail": "",
                  "updateDateTimeInventory": "2022-06-14T11:53:47.166879",
                  "updateTime": null,
                  "instant": false,
                  "favourite": true
              ,
              "cityInfo": null
          },
          {
                  "id": 9634,
                  "sku": "APRA-OB10-11",
                  "title": "Jehan Mash Daal - 500gm",
                  "description": "Jehan Mash Daal - 500gm",
                  "brand": "Jehan",
                  "barcode": "",
                  "inStock": true,
                  "qty": 125,
                  "minQty": 1,
                  "maxQty": 1000,
                  "categoryIds": " 1200 | 1202 | 0",
                  "categoryleafName": " Pulses(Daals)",
                  "currentPrice": 145,
                  "specialPrice": 0,
                  "productImageUrl": "http://15.184.248.248:8080/options/stream/APRA-OB10-11.png",
                  "productImageUrlThumbnail": "http://15.184.248.248:8080/options/stream/APRA-OB10-11_thumbnail.png",
                  "updateDateTimeInventory": "2022-06-14T11:53:51.959118",
                  "updateTime": null,
                  "instant": false,
                  "favourite": true
              ,
              "cityInfo": null
          },
          {
            
                  "id": 9570,
                  "sku": "APRA-OB43-03",
                  "title": "Jehan Kalonji - 100gm",
                  "description": "Jehan Kalonji - 100gm",
                  "brand": "Jehan",
                  "barcode": "",
                  "inStock": true,
                  "qty": 26,
                  "minQty": 1,
                  "maxQty": 1000,
                  "categoryIds": " 1157 | 1152 | 0",
                  "categoryleafName": " Dry Herbs & Spices",
                  "currentPrice": 85,
                  "specialPrice": 0,
                  "productImageUrl": "http://15.184.248.248:8080/options/stream/APRA-OB43-03.png",
                  "productImageUrlThumbnail": "",
                  "updateDateTimeInventory": "2022-06-15T14:49:49.191283",
                  "updateTime": null,
                  "instant": false,
                  "favourite": true
              ,
              "cityInfo": null
          },
          {
             
                  "id": 11641,
                  "sku": "APRA-T15-01",
                  "title": "Qarshi Johar Joshanda - 1 Sachet",
                  "description": "Qarshi Johar Joshanda - 1 Sachet",
                  "brand": "Qarshi",
                  "barcode": "",
                  "inStock": true,
                  "qty": 121,
                  "minQty": 1,
                  "maxQty": 1000,
                  "categoryIds": " 1172 | 1171 | 0",
                  "categoryleafName": " Health Care Items",
                  "currentPrice": 10,
                  "specialPrice": 0,
                  "productImageUrl": "http://15.184.248.248:8080/options/stream/APRA-T15-01.png",
                  "productImageUrlThumbnail": "",
                  "updateDateTimeInventory": "2022-06-21T12:16:01.052519",
                  "updateTime": null,
                  "instant": false,
                  "favourite": true
           ,
              "cityInfo": null
          }
      ][
        {
            "sku": "APR-MP02-02",
            "qty": 3,
            "fullName": "Nestle Every Day - 850gm",
            "currentPrice": 1125,
            "product": {
                "id": 12158,
                "sku": "APR-MP02-02",
                "title": "Nestle Every Day - 850gm",
                "description": "Nestle Every Day - 850gm",
                "brand": "Nestle",
                "barcode": "",
                "inStock": true,
                "qty": 50,
                "minQty": 1,
                "maxQty": 1000,
                "categoryIds": " 1217 | 1183 | 1154 | 0",
                "categoryleafName": " Tea Whiteners",
                "currentPrice": 1125,
                "specialPrice": 0,
                "productImageUrl": "http://15.184.248.248:8080/options/stream/APR-MP02-02.png",
                "productImageUrlThumbnail": "http://15.184.248.248:8080/options/stream/APR-MP02-02_thumbnail.png",
                "updateDateTimeInventory": "2022-06-15T16:38:31.426391",
                "updateTime": null,
                "instant": false,
                "favourite": true
            },
            "cityInfo": null
        },
        {
            "sku": "APR-SK01-02",
            "qty": 1,
            "fullName": "Hilal Fresh Up Spearmint Bubble Gum - 36pcs",
            "currentPrice": 100,
            "product": {
                "id": 10413,
                "sku": "APR-SK01-02",
                "title": "Hilal Fresh Up Spearmint Bubble Gum - 36pcs",
                "description": "Hilal Fresh Up Spearmint Bubble Gum - 36pcs",
                "brand": "Hilal",
                "barcode": "",
                "inStock": true,
                "qty": 8,
                "minQty": 1,
                "maxQty": 1000,
                "categoryIds": " 1144 | 1211 | 0",
                "categoryleafName": " Candies & Jellies",
                "currentPrice": 100,
                "specialPrice": 0,
                "productImageUrl": "http://15.184.248.248:8080/options/stream/APR-SK01-02.png",
                "productImageUrlThumbnail": "",
                "updateDateTimeInventory": "2022-06-20T15:51:12.927687",
                "updateTime": null,
                "instant": false,
                "favourite": true
            },
            "cityInfo": null
        },
        {
            "sku": "APR-T07-00",
            "qty": 1,
            "fullName": "Tapal Danedar - 190gm",
            "currentPrice": 240,
            "product": {
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
            },
            "cityInfo": null
        },
        {
            "sku": "APR-VGF01-17",
            "qty": 1,
            "fullName": "Lemon (Leemun) Local 250g",
            "currentPrice": 75,
            "product": {
                "id": 10140,
                "sku": "APR-VGF01-17",
                "title": "Lemon (Leemun) Local 250g",
                "description": "Lemon (Leemun) Local 250g",
                "brand": "",
                "barcode": "",
                "inStock": true,
                "qty": 39,
                "minQty": 1,
                "maxQty": 1000,
                "categoryIds": " 1220 | 1166 | 0",
                "categoryleafName": " Vegetables",
                "currentPrice": 115,
                "specialPrice": 75,
                "productImageUrl": "http://15.184.248.248:8080/options/stream/APR-VGF01-17.png",
                "productImageUrlThumbnail": "",
                "updateDateTimeInventory": "2022-06-13T18:28:20.753676",
                "updateTime": null,
                "instant": false,
                "favourite": true
            },
            "cityInfo": null
        },
        {
            "sku": "APRA-OB08-01",
            "qty": 1,
            "fullName": "Eggs 1 Dozen",
            "currentPrice": 180,
            "product": {
                "id": 9792,
                "sku": "APRA-OB08-01",
                "title": "Eggs 1 Dozen",
                "description": "Eggs 1 Dozen",
                "brand": "Eggs",
                "barcode": "",
                "inStock": true,
                "qty": 10,
                "minQty": 1,
                "maxQty": 1000,
                "categoryIds": " 1158 | 1154 | 0",
                "categoryleafName": " Eggs",
                "currentPrice": 180,
                "specialPrice": 0,
                "productImageUrl": "http://15.184.248.248:8080/options/stream/APRA-OB08-01.png",
                "productImageUrlThumbnail": "",
                "updateDateTimeInventory": "2022-06-14T11:53:47.166879",
                "updateTime": null,
                "instant": false,
                "favourite": true
            },
            "cityInfo": null
        },
        {
            "sku": "APRA-OB10-11",
            "qty": 125,
            "fullName": "Jehan Mash Daal - 500gm",
            "currentPrice": 145,
            "product": {
                "id": 9634,
                "sku": "APRA-OB10-11",
                "title": "Jehan Mash Daal - 500gm",
                "description": "Jehan Mash Daal - 500gm",
                "brand": "Jehan",
                "barcode": "",
                "inStock": true,
                "qty": 125,
                "minQty": 1,
                "maxQty": 1000,
                "categoryIds": " 1200 | 1202 | 0",
                "categoryleafName": " Pulses(Daals)",
                "currentPrice": 145,
                "specialPrice": 0,
                "productImageUrl": "http://15.184.248.248:8080/options/stream/APRA-OB10-11.png",
                "productImageUrlThumbnail": "http://15.184.248.248:8080/options/stream/APRA-OB10-11_thumbnail.png",
                "updateDateTimeInventory": "2022-06-14T11:53:51.959118",
                "updateTime": null,
                "instant": false,
                "favourite": true
            },
            "cityInfo": null
        },
        {
            "sku": "APRA-OB43-03",
            "qty": 1,
            "fullName": "Jehan Kalonji - 100gm",
            "currentPrice": 85,
            "product": {
                "id": 9570,
                "sku": "APRA-OB43-03",
                "title": "Jehan Kalonji - 100gm",
                "description": "Jehan Kalonji - 100gm",
                "brand": "Jehan",
                "barcode": "",
                "inStock": true,
                "qty": 26,
                "minQty": 1,
                "maxQty": 1000,
                "categoryIds": " 1157 | 1152 | 0",
                "categoryleafName": " Dry Herbs & Spices",
                "currentPrice": 85,
                "specialPrice": 0,
                "productImageUrl": "http://15.184.248.248:8080/options/stream/APRA-OB43-03.png",
                "productImageUrlThumbnail": "",
                "updateDateTimeInventory": "2022-06-15T14:49:49.191283",
                "updateTime": null,
                "instant": false,
                "favourite": true
            },
            "cityInfo": null
        },
        {
            "sku": "APRA-T15-01",
            "qty": 1,
            "fullName": "Qarshi Johar Joshanda - 1 Sachet",
            "currentPrice": 10,
            "product": {
                "id": 11641,
                "sku": "APRA-T15-01",
                "title": "Qarshi Johar Joshanda - 1 Sachet",
                "description": "Qarshi Johar Joshanda - 1 Sachet",
                "brand": "Qarshi",
                "barcode": "",
                "inStock": true,
                "qty": 121,
                "minQty": 1,
                "maxQty": 1000,
                "categoryIds": " 1172 | 1171 | 0",
                "categoryleafName": " Health Care Items",
                "currentPrice": 10,
                "specialPrice": 0,
                "productImageUrl": "http://15.184.248.248:8080/options/stream/APRA-T15-01.png",
                "productImageUrlThumbnail": "",
                "updateDateTimeInventory": "2022-06-21T12:16:01.052519",
                "updateTime": null,
                "instant": false,
                "favourite": true
            },
            "cityInfo": null
        }
    ]
    // const t =carti.map((item)=>{
   //   state.push(carti);
    //})    
      
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
  updatedcart
} = cartSlice.actions;
