import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Catagory1 from "../../components/Layout/components/Categories/Categories";
import Pagination from "../../components/Layout/components/Pagination/pagination";
let base_url_api = "https://stag.apricart.pk/v1";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cart.slice";
import Cookies from 'universal-cookie';




export default function Post({ postData }) {
  const dispatch = useDispatch();
  const cookies = new Cookies();

  var token = cookies.get("cookies-token");

  const router = useRouter();

  // const notify = () => toast.success("Wow so easy!");

  // const [count, setCount] = useState(1);

  // // Function to increment count by 1
  // const incrementCount = () => {
  //   // Update state with incremented value
  //   setCount(count + 1);
  // };
  // console.log("Count  :",count)

  if (router.isFallback) {
    return (
      <div>
        <h2>Loading Page Data...</h2>
      </div>
    );
  }
  let total = postData.length;
  const Cartapi =(list)=>{
    const data =
    {cart : 
     [
         {
          sku: list.sku,
          qty: "1"
         }
     ]}
     console.log(data.cart)
    
    if (token){
      console.log("AVG ")
      console.log(list.sku);
      const response =  axios.post( 'https://stag.apricart.pk/v1/order/cart/save?city=karachi&lang=en' ,data,{
        headers:{
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookies.get("cookies-token"),
        },
      } 
      
      );
    }

  }
  return (
    <div>
      <section className="popular_sec">
        <div className="container-fluid">
          <div className="row">
          <div className="col-12 col-sm-2  col-md-2  col-lg-3  col-xl-2  col-xxl-2">
              <Catagory1 />
            </div>
            <div className="col-12 col-sm-12  col-md-10  col-lg-9  col-xl-10  col-xxl-10 parot">
              <div className="container-fluid">
                <section className="categorybanner_sec">
                  <div>
                    <div className="row">
                      <div className="col-12 col-sm-12  col-md-12  col-lg-12  col-xl-12  col-xxl-12">
                        <div className="recommend_banner">
                          <img
                            src="/assets/images/bachatbox.png"
                            className="img-fluid"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <div>
                  {total == 0 ? (
                    <><p>
                    {toast.error("No Item Found")}
                    </p>
                     <h4 className="itemFound">{total} Items Found</h4>
                    </>
                  ) : (
                    <>
                      <h4 className="itemFound">{total} Items Found</h4>
                    </>
                  )}
                  <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
                    {postData.map((cat) => {
                      const { productImageUrl } = cat;
                      return (
                        <>
                          <div className="col">
                            <div className="p-3 border bg-light btnchan">
                              <div className="pro_img">
                                <Link
                                  href="/details/[id]"
                                  as={"/details/" + cat.sku}
                                  className="Link-CSS"
                                  passHref
                                >
                                  <img
                                    src={ productImageUrl}
                                    className="img-fluid"
                                    alt=""
                                  />
                                </Link>
                                <h5>{cat.title}</h5>

                                <h4>
                                  RS. <strong>{cat.currentPrice}</strong>
                                </h4>
                                <div className="pro_btn1">
                                  <select name="product" id="product">
                                    <option value="1">1 KG</option>
                                    <option value="2">2 KG</option>
                                    <option value="3">3 KG</option>
                                  </select>
                                </div>
                                {cat.inStock == true ? (
                                  <div
                                  className="pro_btn2"
                                  onClick={() =>{
                                    Cartapi(cat);
                                    dispatch(addToCart(cat))}
                                  }
                                >
                                  <a
                                    href="#"
                                    className="btn btn-primary chane"
                                  >
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
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
              {total <= 15 ? <></> : <Pagination />}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export async function getStaticPaths() {
  const paths = ["/search/[id]", "/search/2"];
  return { paths, fallback: true };
}


export async function getStaticProps({ query, params }) {
  const { id } = query || params;

  // `https://stag.apricart.pk/v1/catalog/categories/products?category=${id}&page=1&size=10&sortType=&sortDirection=desc&instant=3`
  const res = await fetch(
    `https://stag.apricart.pk/v1/catalog/products/search?page=1&size=60&term=${id}&category=&city=${cookies.get('cities')}&lang=en`
  );
  const alldata = await res.json();
  const postData = alldata.data;

  return {
    props: {
      postData,
    },
  };
}
