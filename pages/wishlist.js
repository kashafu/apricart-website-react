import { useSelector, useDispatch } from "react-redux";
import {
  incrementwishQuantity,
  decrementwishQuantity,
  removeFromWish,
} from "../redux/wish.slice";
import { useRouter } from "next/router";
import React, { useEffect, useState, useContext , useCallback } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import Link from "next/link";
import { addToCart } from "../redux/cart.slice";
import { addToWish,updatedwish } from "../redux/wish.slice";
import axios from "axios";
import Cookies from 'universal-cookie';
import { getGeneralApiParams } from "../helpers/ApiHelpers";
let base_url_api = "https://staging.apricart.pk/v1";

const Wishpage = () => {
  const cookies = new Cookies();
 // var token = cookies.get("cookies-token");
  const wish = useSelector((state) => state.wish);
  const dispatch = useDispatch();
  const router = useRouter();
 const {token ,headers}= getGeneralApiParams() ;


	const [mydata, setData] = useState([]);
	const [total, setTotal] = useState([]);
	const [option, setOption] = useState([]);
  let isLoggedIn = cookies.get('cookies-token') != null 

    const addToCartApi = async (wish) => {
        dispatch(addToCart(wish))

        let { city, userId, headers } = getGeneralApiParams()

        if(isLoggedIn){
            let data = {
                cart: [{
                        'sku': wish.sku,
                        'qty': "1",
                }]
            }

            let url = base_url_api + "/order/cart/save?city=" + city + "&lang=en&client_type=apricart"
            let response = await axios.post(
                url,
                data,
                {
                    headers: headers,
                }
            )
        }
        else{
            let data = {
                userId: userId,
                cart: [{
                        'sku': sku,
                        'qty': "1",
                }]
            }

            let url = base_url_api + "/guest/cart/save?city=" + city + "&lang=en&client_type=apricart"
            let response = await axios.post(
                url,
                data,
                {
                    headers: headers
                }
            )
        }
    }
  const getTotalPrice = () => {
    return wish.reduce(
      (accumulator, wish) => accumulator + wish.quantity * wish.currentPrice,
      0
    );
  };
  useEffect(() => {
		Wishall();
	}, [])

  const  removewish=(wish)=>{
    var dat =JSON.stringify({sku:[wish.sku]})
    var conf = {
      method: 'delete',
      url: 'https://staging.apricart.pk/v1/order/cart/delete?city=karachi&lang=en&client_type=apricart',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + cookies.get("cookies-token")
      },
      data: dat
    };
   if (token){
    const response = axios(conf)
  }}
  let Wishall={};
  Wishall = async () => {
    if (token){
    //${cookies.get("cookies-userId")}& &userid=${userI {cookies.get("cookies-userId")}
    const response = await axios.get('https://staging.apricart.pk/v1/watchlist/all?guestuserid=abc123&city=karachi&lang=en',{headers:headers});

    let Data1 = response.data.data;
    setData(Data1);
    mydata = Data1;
    // console.log(mydata);
    //dispatch(Initilaize([]));
    mydata.map((item) => { dispatch(updatedwish(item)); });

    setTotal(response.data.total)
    // console.log(response.data.data);
    console.log(Data1)
    let total1 = response.data.total;
    total = total1;
    // setDiscount(response.data.message);
    //dispatch(updatedcart(response.data.data));
  }
  

else {
 
  }

}
// for push
  return (
    <div>
      {wish.length === 0 ? (
        <h5>Your Wish is Empty!</h5>
      ) : (
        <>
          <div className="container-fluid">
            <div className="popular_head">
              <h4>Wish List</h4>
            </div>
            <div>
              <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
                {wish.map((wish) => {
                  const { id, sku, productImageUrl, title, currentPrice } =
                    wish;
                  return (
                    <div className="col" key={id}>
                      <div className="p-3 border bg-light btnchan">
                        <div
                          className="heart"
                          onClick={() => dispatch(addToWish(wish))}
                        ></div>
                        <div className="pro_img">
                          <Link
                            href="/details/[id]"
                            as={"/details/" + wish.sku}
                            className="Link-CSS"
                            passHref
                          >
                            <img
                              src={productImageUrl}
                              className="img-fluid"
                              alt=""
                            />
                          </Link>
                          <h5>{title}</h5>
                          <h4>
                            Rs. <strong>{currentPrice}</strong>
                          </h4>
                          {/* <div className="pro_btn1">
                            <select name="product" id="product">
                              <option value="1">1 KG</option>
                              <option value="2">2 KG</option>
                              <option value="3">3 KG</option>
                            </select>
                          </div> */}

                          {wish.inStock == true ? (
                            <div
                              className="pro_btn2"
                              onClick={() => addToCartApi(wish)}
                            >
                              <a href="#" className="btn btn-primary chane">
                                Add to Cart
                              </a>
                            </div>
                          ) : (
                            <>
                              <div className="pro_btn2">
                                <a
                                  href="#"
                                  className="btn btn-secondary chane"
                                  disable
                                >
                                  Out of stock
                                </a>
                              </div>
                            
                            </>
                            
                          )}
                            <div className="removeList">
                        <button onClick={() => {
                          removewish(wish);
                          dispatch(removeFromWish(wish.id))}}>
                                   Remove from list
                                 </button>{/* button for every item*/ }
                                </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* <div className="removeList">
                <button onClick={() => dispatch(removeFromWish(wish.id))}>
                  Remove from list
                </button>
              </div> */}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Wishpage;
