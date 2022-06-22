import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../../redux/cart.slice";
import { addToWish } from "../../../../redux/wish.slice";
import { AiOutlineHeart } from "react-icons/ai";
let base_url_api = "https://staging.apricart.pk/v1";
import Cookies from "universal-cookie";
import Image from 'next/image';

export default function RecommendedProducts() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 5,
    centerMargin: "20px",
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          dots: false
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false
        },
      },
    ],
  };
  const cookies = new Cookies();
  var token = cookies.get("cookies-token");

  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [banner, setBanner] = useState([]);
  /*base_url_api +*/
  const getPopularitems = async () => {
    const response = await axios.get(
    
      base_url_api + `/catalog/recommended?page=1&size=20&city=${cookies.get(
          "cities"
        )}&lang=en`
    );
    setUsers(response.data.data)
  };
  useEffect(() => {
    getPopularitems();
  }, []);

  //Banner
  /*base_url_api */
  const getBanner = async () => {
    // const response = await axios.get(
      
    //   base_url_api + `/home/all?client_lat=34.02910146301811&client_long=71.63761019869207&city=${cookies.get(
    //       "cities"
    //     )}&lang=en&userid=abc123&web=true`
    // );

   // setBanner(response.data.data.webProducts);
  };
  useEffect(() => {
    getBanner();
  }, []);

  const cart = useSelector((state) => state.cart);
  const wish = useSelector((state) => state.wish);
  const wishapi=(list)=>{
    console.log(list.sku);
    const wishdata=
      {sku:[list.sku]}
    if (token){
    const response = axios.post('https://staging.apricart.pk/v1/watchlist/save?',wishdata,
    { headers:{
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies.get("cookies-token"),
    }});}
  }
  const Cartapi =(list)=>{
    const data =
    {cart : 
     [
         {
          sku: list.sku,
          qty:"1"
         }
     ]}
     console.log(data.cart)
    
    if (token){
      console.log("AVG ")
      console.log(list.sku);
      const response =  axios.post( 'https://staging.apricart.pk/v1/order/cart/save?city=karachi&lang=en&client_type=apricart' ,data,{
        headers:{
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookies.get("cookies-token"),
        },
      } 
      
      );
    }

    
  }

  
  return (
    <section className="recommend_sec">
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-12  col-md-12  col-lg-12  col-xl-12  col-xxl-12">
            <div className="recommend_banner">
              <h4>Recommended</h4>
              {banner.map((data) => {
                const { id, bannerImageWeb } =
                  data;
                return (
                  <>
                    <img
                      src={bannerImageWeb}
                      className="img-fluid"
                      alt=""
                      
                    />
                  </>
                );
              })}
            </div>
            <section>
              <Slider {...settings}>
                {users.map((curElem) => {
                  const {  id, productImageUrl, title, currentPrice, sku } = curElem;
                  return (
                    <div className="card_1"key={id}>
                      <div
                        className="p-3 border bg-light btnchan m-1 card1"
                        
                      >
                        <div
                          className="heart"
                    onClick={() => {dispatch(addToWish(curElem))
                      wishapi(curElem);}}
                        >
                          <a className="heart1">
                            <AiOutlineHeart />
                          </a>
                        </div>
                        <div className="pro_img">
                          <Link
                            href="/details/[id]"
                            as={"/details/" + curElem.sku}
                            className="Link-CSS"
                            passHref
                          >
                            <img
                              src={ productImageUrl}
                              className="img-fluid"
                              alt=""
                            />
                          </Link>

                          <h5>{title}</h5>
                          <h4>
                            RS. <strong>{curElem.currentPrice}</strong>
                          </h4>
                          <div className="pro_btn1">
                            <select name="product" id="product">
                              <option value="1">1 KG</option>
                              <option value="2">2 KG</option>
                              <option value="3">3 KG</option>
                            </select>
                          </div>
                          {curElem.inStock == true ? (
                            <div
                              className="pro_btn2"
                              onClick={() =>{
                                Cartapi(curElem);
                                dispatch(addToCart(curElem))}}
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
                                  className="btn btn chane secondary"
                                  disable
                                >
                                  Out of stock
                                </a>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Slider>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
