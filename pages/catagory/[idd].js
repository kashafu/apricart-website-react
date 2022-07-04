import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import { addToWish } from "../../redux/wish.slice";
import Cookies from 'universal-cookie';
import Catagory1 from "../../components/Layout/components/Categories/Categories";
let base_url_api = "https://staging.apricart.pk/v1";
import Link from "next/link";
import Pagination from "../../components/Layout/components/Pagination/pagination";
import PerPage from "../../components/Layout/components/PerPage/PerPage";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cart.slice";
import Image from 'next/image';
import { AiOutlineHeart } from "react-icons/ai";


export default function Post({ postData }) {
  const dispatch = useDispatch();
  const cookies = new Cookies();
  var token = cookies.get("cookies-token");

  const router = useRouter();

  const [size, setSize] = useState("15");
  if (router.isFallback) {
    return (
      <div>
        <h2>Loading Page Data...</h2>
      </div>
    );
  }
 

  function perPage() {}
  // if(postData){
  
  // }
  let total = postData.length;
 
  let cattype = postData.data
  console.log("Total item found",postData.length)

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
    if (token){
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
      const response =  axios.post( 'https://staging.apricart.pk/v1/order/cart/save?city=karachi&lang=en' ,data,{
        headers:{
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookies.get("cookies-token"),
        },
      } 
      
      );
    }
  }

  }
  if(!postData){
		return(
			<div>
				<p>
					Item does not exist
				</p>
			</div>
		)
	}
  return (
    <div>
      <section className="popular_sec">
        <div className="">
          <div className="row">
            <div className="col-12 col-sm-2  col-md-2  col-lg-3  col-xl-2  col-xxl-2">
              <Catagory1 />
            </div>
            <div className="col-12 col-sm-12  col-md-10  col-lg-9  col-xl-10  col-xxl-10 parot">
              <div className="">
                <section className="categorybanner_sec">
                  <div>
                    <div className="row">
                      <div className="col-12 col-sm-12  col-md-12  col-lg-12  col-xl-12  col-xxl-12">
                        <div className="recommend_banner">
                          <Image
                            src="/assets/images/bachatbox.png"
                            className="img-fluid"
                            alt=""
                            width="100%" height="20%" layout="responsive" objectFit="contain"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <div>
                
                  
                  {
                  /* <p>
                    {postData.map((data) =>{
                      return(
                        <>
                        {data.categoryleafName}
                        </>
                      )
                    })}
                  </p> */}
                  <h6 classNameName="itemFound">{total} Items Found</h6>               
                  <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
                    {postData.map((cat) => {
                      const { productImageUrl } = cat;
                      return (
                        <>
                          <div className="col">
                              <div className="p-3 border bg-light btnchan">
                                <div
                                      className="heart"
                                     onClick={() => {
                                      wishapi(cat);
                                      dispatch(addToWish(cat))}}>
                                     <a className="heart1">
                                    <AiOutlineHeart />
                                    </a>
                                </div>
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
                                  <select name="product" id="product" >
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
  const paths = ["/catagory/[idd]", "/catagory/[idd]"];
  return { paths, fallback: true };
}

export async function getStaticProps({ query, params }) {
  // const { idd } = query || params;
  // let { headers } = getGeneralApiParams()
	// let city = 'karachi'
  // let perPage = 1;
  try{
    const { idd } = query || params;
    let { headers } = getGeneralApiParams()
    let city = 'karachi'
    let perPage = 1;
  // `https://staging.apricart.pk/v1/catalog/categories/products?category=${id}&page=1&size=10&sortType=&sortDirection=desc&instant=3`
  const res = await axios.get(
    `https://staging.apricart.pk/v1/catalog/categories/products?category=1169&page=1&size=100&sortType=&sortDirection=desc&instant=3&city=karachi&lang=en&userid=abc123&client_type=apricart`
  );
  const alldata = res.data;
  console.log(res.data);
  const postData = alldata.data;
}
  catch(err){
    console.log(err);
  }

  return {
    props: {
      postData,
    },
    revalidate: 200
  };
}
