import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import axios from "axios";

import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../redux/cart.slice";
let base_url_api = "https://staging.apricart.pk/v1";
import Cookies from 'universal-cookie';

const Checkout = () => {
  const cookies = new Cookies();
  var token = cookies.get('cookies-token')
  //----------------Login Condition for private pages---------------///
   if (!token ){
    return(
       <h5 className='login-token'> Please Login First</h5>
    )
    }
     //----------------Login Condition for private pages End---------------///
    
  // const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const getTotalPrice = () => {
    return cart.reduce(
      (accumulator, item) => accumulator + item.quantity * item.currentPrice,
      0
    );
  };
///--------------Delivery Area --------------///

const [proAddress, setAddress] = useState([]);
  const getAddress = async () => {
    const config = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.get("cookies-token"),
      },
    };
    const resp = await axios.get(
      `https://cbe.apricart.pk/v1/home/address/delivery?city=${cookies.get(
        "cities"
      )}&lang=en`,
      config
    );
    setAddress(resp.data.data);
    let myaddress = resp.data.data;
    proAddress = myaddress;

    console.log("My Address", proAddress);
  };
  useEffect(() => {
    getAddress();
  }, []);

  //----------------show and hide add address-----------////
  const[show,setShow]=useState(false);


  //---------Checkout API-------------------//////
  const [check,setCheck] =  useState({
    "coupon": "", 
    "address": 5828,
    "orderType":"delivery",
    "notes": "delivery bhejo",
    "showProducts": true,   
    "verify": true,
    "paymentMethod": "cash"
});
  const handleCheckOut = async (e) => {
    e.preventDefault();
    //${cookies.get('cookies-userId')}
    
    try {
      
      console.log(cookies.get("userId"));
      const response = await axios.post(
        `https://staging.apricart.pk/v1//order/cart/checkout?city=karachi&lang=en&userid=${cookies.get('cookies-userId')}&client_lat=24.909230104621333&client_long=67.12185373161728`,check,{
          headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
            'Authorization' : 'Bearer ' + cookies.get('cookies-token'),  
          }
      }
      );
      console.log("Checkout Data",response.data.data)
      alert(response.data.message)
    } catch (err) {
      const Error = err.response.data.message;
    }
  };
  ////----------Checkout Api End------------///


  ///----------Save New Address Api Start-----------
  const [postArea,setPostArea] = useState({
    name:"",
    phoneNumber:'',
    email:"",
    mapLat:"24.881308",
    mapLong:"67.06022",
    address:"",
    googleAddress: "karachi",
    areaId: '158',
  })
  const handleArea = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://staging.apricart.pk/v1/home/address/delivery/save`,postArea,{
          headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
            'Authorization' : 'Bearer ' + cookies.get('cookies-token'),  
          }
      }
      );
      console.log("Checkout Data",response.data)
      alert(response.data.message)
    } catch (err) {
     console.log(err.data)
    }
    console.log("My area",postArea)
  
  };
  ////------------Save New Address API END------------///


  ////---------Get City Area API Start---------------////
  const [citiesArea,setitiesArea] = useState([]);

const getCityArea = async() =>{
   const config = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.get("cookies-token"),
      },
    };
    const responseCity = await axios.get(
       `https://staging.apricart.pk/v1/home/address/cities?lang=en`,config
    );
    setitiesArea(responseCity.data.data)
    let cityArea = responseCity.data.data;
    citiesArea = cityArea ;
    console.log("Get Cities",citiesArea)
}
useEffect(() =>{
   getCityArea();
},[]);
 ////---------Get City Area API End---------------////




  ////---------Get Delivery City Area API Start---------------////
const [deliveryArea,setdeliveryArea] = useState([]);

const getDeliveryArea = async() =>{
   const config = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.get("cookies-token"),
      },
    };
    const responseDelivery = await axios.get(
       `https://staging.apricart.pk/v1/home/address/areas?cityid=4&lang=en`,config
    );
    setdeliveryArea(responseDelivery.data.data)
    let DeliveryArea1 = responseDelivery.data.data;
    deliveryArea = DeliveryArea1 ;
}
useEffect(() =>{
   getDeliveryArea();
},[]);
  ////---------Get Delivery City Area API End---------------////


  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostArea({ ...postArea, [name]: value });
  };
  return (
    <>
   
      <section className="popular_sec">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
              <section className="ContentSec">
                <div className="container-fluid">
                  <div className="row">
                    <div className="prothreeHead">
                      <ol className="breadcrumb">
                        <Link href="/" passHref>
                          <li>
                            {" "}
                            <a passHref="#">Home</a>{" "}
                          </li>
                        </Link>
                        <li>
                          <a passHref="/cart">Cart</a>
                        </li>
                        <li className="is-current">Check Out</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
      <section className="delivery_sec">
        <div className="container-fluid">
          <div className="row">
          <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                  <div class="delivery_body_sec">

                     <div class="d_address">
                        <ul>
                           <li><h4>Delivery Address</h4></li>
                           <li><button onClick={()=>setShow(!show)}>Add Address</button></li>
                        </ul>
                     </div>
                     <div class="save_dropadd">
                      
                        <select>
                        {proAddress.map((addr)=> {
                          return(
                            <option value={addr.googleAddress}>{addr.googleAddress}</option>
                          )
                        })}
                        </select>
                     </div>
                     {
                        show? <>
                         <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <div className="personal-f address-card1 ">
                        <div className="form-group">
                          <label htmlFor="exampleFormControlInput1">
                            Name *
                          </label>
                          <input
                          type='text'
                            className="form-control"
                            id="exampleFormControlInput1"
                            placeholder=""
                            name="name"
                            onChange={(e) => handleChange(e)}
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="exampleFormControlInput1">
                            Address *
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleFormControlInput1"
                            placeholder=""
                            name="address"
                            onChange={(e) => handleChange(e)}
                            required
                          />
                        </div>

                        <label htmlFor="exampleFormControlInput1">
                          Phone No *
                        </label>
                        <div className="input-group mb-3">
                          <input
                            type="text"
                            className="form-control"
                            id="exampleFormControlInput1"
                            name="phoneNumber"
                            placeholder="123-45-678"
                            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                            onChange={(e) => handleChange(e)}
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="exampleFormControlInput1">
                            Email Address *
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleFormControlInput1"
                            placeholder=""
                            name="email"
                            onChange={(e) => handleChange(e)}
                            required
                          />
                        </div>
                        <div className="selectedBox">
                          <select name="areaId" >
                           {
                              citiesArea.map((area)=> {
                                 return(
                                    <option value={area.id}>{area.city}</option>

                                 )
                              })
                           }
                          </select>
                        </div>
                        <div className="selectedBox">
                          
                          <select id="area">
                        {deliveryArea.map((area) => {
                              return(
                                 <>
                                    <option value={area.areaId}>{area.town}</option>
                                 </>
                              )
                           })}
                          </select>
                        </div>
                        <div className="form-group">
                        <button onClick={handleArea}>Submit</button>
                        </div>
                      </div>
                      </div>
                        </>:null
                     }
                     <div class="payment_m">
                        <h4>Payment Method</h4>
                        <div className="freehome_d">
                <div className="freehome_title">
                  <input
                    type="radio"
                    name="discount"
                    value="none"
                   
                  />
                  Cash On Delivery{" "}
                </div>
                <div className="freehome_title">
                  <input
                    type="radio"
                    name="discount"
                    value="availble"
                    
                  />
                  Credit/Debit Card{" "}
                  
                </div>
                <div className="freehome_title">
                  <input
                    type="radio"
                    name="discount"
                    value="availble"
                    
                  />
                 Pick from Apricart Click & Collect Store (With Extra Discount){" "}
                  
                </div>
              </div>
                        <textarea placeholder="Special Instructions"></textarea>
                       
                     </div>
                  </div>
               </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
              <div className="cont_shop">
                <h3>
                  <a passHref="#">Continue Shopping</a>
                </h3>
              </div>
              <div className="cont_shop_sec">
                <div className="billng_det">
                  <h3>Billing Details</h3>
                </div>
                <div className="check_coupan">
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Coupon Code"
                      aria-label="Recipient's username"
                      aria-describedby="button-addon2"
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      id="button-addon2"
                    >
                      Apply
                    </button>
                  </div>
                </div>
                <div className="billingsub_tot">
                  <table style={{ width: "100%" }}>
                    <tr>
                      <td>
                        Sub Total <sub>()</sub>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        Rs. {getTotalPrice()}
                      </td>
                    </tr>
                    <tr>
                      <td>Shipping</td>
                      <td style={{ textAlign: "right" }}>Free</td>
                    </tr>
                    <tr>
                      <td>Coupon</td>
                      <td style={{ textAlign: "right" }}>---</td>
                    </tr>
                    <tr>
                      <td>Total</td>
                      <td style={{ textAlign: "right", color: "#08185A" }}>
                        Rs. {getTotalPrice()}
                      </td>
                    </tr>
                  </table>
                  <button onClick={handleCheckOut}>Check out</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Checkout;
