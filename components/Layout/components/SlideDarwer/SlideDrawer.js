import React, { useEffect, useState ,useContext} from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { AppContext } from "../../Layout";
import { useRouter } from "next/router";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  updatedcart
} from "../../../../redux/cart.slice";
import axios from "axios";
let base_url_api = "https://staging.apricart.pk/v1";
import Cookies from 'universal-cookie';


const SlideDrawer = (props) => {

  const [discount, setDiscount] = React.useState("none");
  const cookies = new Cookies();
  const { appState, handleAppState } = useContext(AppContext)

  let [mydata,setData] = useState([]);
  const [total , setTotal] =  useState([]);
  
  const [option , setOption] =  useState([]);
  const router = useRouter();
   
  //let cartAll={};
  useEffect(() => {
    cartAll();
    //getdiscount
  },[])
  var token = cookies.get("cookies-token");
  let drawerClasses = "side-drawer";
  if (props.show) {
    drawerClasses = "side-drawer open";
  } 
  const hideSideDrawer = () => {
    handleAppState({
      "drawerOpen": !appState.drawerOpen
  })
  }
  // const [mydata,setData] = useState([]);

  // const getDiscount = async() =>{
  //   const response = await axios.get(
  //     'https://staging.apricart.pk/api/v1/order/cart/all?city=karachi&lang=en&orderType=delivery'
  //   );
  //   setData(response);
  //   console.log(response)
  // }
  // useEffect(() => {
  //   getDiscount();
  // },[])


  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  var token = cookies.get("cookies-token");
  const config = {
   
    headers: {
    
      'Accept' : 'application/json',
      'Content-Type' : 'application/json',
      'Authorization' : 'Bearer ' + cookies.get('cookies-token'),
    }
  }
 let cartAll={}

  // 
  if (token) {
    var data = {
      "coupon": "",
      "address": 4582,
      "clientType": "apricart",
      "orderType": "delivery",
      "prodType": "cus",
      "day": "",
      "startTime": "",
      "endTime": "",
      "notes": "test order",
      "showProducts": true,
      "verify": true,
      "paymentMethod": "cash"
    };
        let userId=cookies.get('cookies-userId')
       cartAll = async() =>{
        //${cookies.get("cookies-userId")}& &userid=${userI {cookies.get("cookies-userId")}
      const response = await axios.post('https://staging.apricart.pk/v1/order/cart/checkout?userid=10638&city=karachi&lang=en&client_lat=24.909230104621333&client_long=67.12185373161728',data,{headers: { 'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' 
                         + token}}
      )
      
      //  console.log(mydata);
        

      
      let Data1 = response.data.data;
      setData(Data1.products);
      mydata = Data1.products;
      console.log(mydata);
      mydata.map((item)=>{dispatch(updatedcart(item));});
   
      setTotal(response.data.total)
      console.log(response.data.data);
      console.log(Data1)
      let total1 = response.data.total;
      total = total1;
      setDiscount(response.data.message);
      //dispatch(updatedcart(response.data.data));
    }
    
  }
  else{
    cartAll = async() =>{
    
      const response = await axios.get(
        `https://staging.apricart.pk/v1/guest/cart/all?userid=${cookies.get('guestUserId')}&lang=en`,
        config
      );
      setData(response.data.data);
      let Data1 = response.data.data;
      mydata = Data1.products;
      setTotal(response.data.total)
      let total1 = response.data.total;
      total = total1;
      setDiscount(response.data.message);
    } 
    
  }

  const OptionAll = async() =>{
    
    const response = await axios.get(
      `https://staging.apricart.pk/v1/options/all`,
      config
    );
    setOption(response.data.data);

   console.log("Option API",option)
  
  }
  useEffect(()=>{
    OptionAll();
    // cartall();
  },[])
  
 let shippment_charged = option.find(e => e.key === 'shippment_charged_at')
 let shippment_waved_limit = option.find(e => e.key === 'shippment_waved_limit')
 let shippment_fix_amount = option.find(e => e.key === 'shippment_fix_amount')
 

  const getTotalPrice = () => {
  
    return cart.reduce(
      (accumulator, item) => accumulator + item.quantity * item.currentPrice,0
    );
   
  };
 
 

  const handleDiscount = (event) => {
    setDiscount(event.target.value);
    
  };

  console.log(discount)
  let disValue = 3;
  const Discount = getTotalPrice();
  const Avail = Discount - (Discount * disValue) / 100;
  
  const delitem=(item)=>{
    if (token){
  //   console.log(item.sku);
  //   console.log(cookies.get('cookies-token'));
  //   let dat ={
  //     "cart": [
  //                 {
  //                     sku:item.sku
  //                 }
  //             ]
  // };
  // //city=karachi&lang=en&client_type=apricart
  // let parmas={"city":"karachi",
  //   "lang":"en",
  //   "client_type":"apricart"}
  //  const response = axios.delete('https://staging.apricart.pk/v1/order/cart/delete?',dat,{headers:{'Accept':'*/*','Content-Type' : 'application/json','Authorization' : 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI5MjMxMTE4MTMzODkiLCJyb2xlIjoiVVNFUiIsImlzcyI6Ind3dy5ib2lsZXJwbGF0ZS5kZXNpZ24iLCJpYXQiOjE2NTU5Njk3NzEsImV4cCI6MTY1ODU2MTc3MX0.Vbe_9XTQOqDwkkNzc0po96aJWqCnA8lqDahOjTWQgfU'}});

  //   
  var data = JSON.stringify({
    "cart": [
      {
        "sku": item.sku
      }
    ]
  });
  
  var conf = {
    method: 'delete',
    url: 'https://staging.apricart.pk/v1/order/cart/delete?city=karachi&lang=en&client_type=apricart',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer '+ cookies.get("cookies-token")
    },
    data : data
  };
  
  axios(conf)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
  

}

  }
  const UpdateQty=(item,val)=>{
    console.log(item.qty);
    var qt =item.qty ;
    if (val==0){
      qt--;
    }
    else{
      qt++
    }
    var udat={
      "cart": [
                  {
                      "sku":item.sku,
                      "qty": qt
                  }
              ]
  }
   if (token){
    axios.post('https://staging.apricart.pk/v1/order/cart/updateqty?city=karachi&lang=en&client_type=apricart',udat,   {headers: { 
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer '+ cookies.get("cookies-token")}
    },).then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
    
   }
  }
  console.log(cart);
  return (
    <>
      <div className="sidebarD">
        
        <div className={drawerClasses}>
        <div className="cart-header1">
        <img src="/assets/images/bag.png" className="img-fluid cartinner" alt=""/>
        <span>My Cart({cart.length})</span>
        </div>
          {cart.length === 0 ? (
            <>
              <h4 className="emptyCart">No items in your cart</h4>
              <div className="cartShoping">
              {/* <span className="startshoping">Start Shopping</span> */}
              <h5 className="emptyCart">Fast & Free Delivery</h5>
              </div>
            </>
          ) : (
            <>
             <div className="cart_body">
              {cart.map((item) => {
                 //let i=item.product;
                const { id, productImageUrl, title, currentPrice, sku } = item;
                return (
                  <>
                  
                    <div className="item cartitem">
                      <div className="image1">
                        {" "}
                        <img
                          src={productImageUrl}
                          alt=""
                          className="img-fluid"
                        />{" "}
                      </div>
                      <div className="description">
                        {" "}
                        <span>{item.title}</span>
                        <ul className="cart_page">
                          <li>
                            <div className="cart-quan">
                              <button
                                className="minus-btn"
                                type="button"
                                name="button"
                                onClick={() =>{
                                  UpdateQty(item,0)
                                  dispatch(decrementQuantity(item.id))}
                                }
                                
                              >
                                <i className="fa fa-minus" aria-hidden="true"></i>
                              </button>
                              <p>{item.quantity}</p>
                              <button
                                className="plus-btn"
                                type="button"
                                name="button"
                                onClick={() =>{
                                  UpdateQty(item,1)
                                  dispatch(incrementQuantity(item.id))}
                                }
                              >
                                <i className="fa fa-plus" aria-hidden="true"></i>
                              </button>
                            </div>
                          </li>
                          {<li className="cart-total">
                            <div className="total-price1">
                              {" "}
                              RS :{item.currentPrice}
                            </div>
                          </li> }
                          <li>
                          <span
                          className="delete-btn"
                          onClick={() => {
                            delitem(item);
                            dispatch(removeFromCart(item.id))}
                          }
                        >
                          <i className="fa fa-trash" aria-hidden="true"></i>
                        </span>
                          </li>
                        </ul>
                      </div>
                      <div className="buttons float-end">
                        {" "}
                        
                        {/* <h3>
                          RS. <strong> {getProductPrice}</strong>
                        </h3>{" "} */}
                      </div>
                    </div>
                    {/* <hr /> */}
                  </>
                );
              })}
              </div>
              <div className="cart_footer">
              <div className="freehome_d">
                <div className="freehome_title">
                  <input
                    type="radio"
                    name="discount"
                    value="none"
                    checked={discount === "none"}
                    onChange={handleDiscount}
                  />
                  Free Home Delivery{" "}
                </div>
                <div className="freehome_title">
                  <input
                    type="radio"
                    name="discount"
                    value="availble"
                    checked={discount === "availble"}
                    onChange={handleDiscount}
                  />
                  Pick from Apricart Click & Collect Store (With 3% Discount){" "}
                </div>
              </div>
              <div className="sub_tot">
                {discount == "none" ? (
                  <h5 className="h5tot">Sub Total :{getTotalPrice()}</h5>
                ) : (
                  <h5 className="h5tot">Sub Total :{Math.floor(Avail)}</h5>
                )}
              </div>

              <div className="check_o_btn">
                <Link href="/checkout" passHref>
                  <button onClick={props.close}>Check Out</button>
                </Link>
              </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SlideDrawer;



// later updates
//CART DONE
//login with cbe 
//cart increment ;
//remaining 


//guest user order increment 
//order by guest 














