import React from "react";
import Link from "next/link";
import axios from "axios";
import Catagory1 from '../../components/Layout/components/Categories/Categories'


let base_url_api = "https://stag.apricart.pk/v1";

export default function Posts({ posts }) {
  return (
    <>
      <section className="popular_sec">
        <div className="container-fluid">
          <div className="row">
            <Catagory1/>
            <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
              {posts.map((curElem) => {
                const { id, productImageUrl, title, currentPrice, sku } =
                  curElem;
                return (
                  <div className="col" key={id}>
                    <div className="p-3 border bg-light btnchan">
                      <div className="pro_img">
                        <Link
                          href="/details/[id]"
                          as={"/details/" + curElem.sku}
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
                          
                          Rs. <strong>{currentPrice}</strong>
                        </h4>
                        <div className="pro_btn1">
                          <select name="product" id="product">
                            <option value="1">1 KG</option>
                            <option value="2">2 KG</option>
                            <option value="3">3 KG</option>
                          </select>
                        </div>
                        <div className="pro_btn2">
                          <a href="#" className="btn btn-primary chane chane1">
                            Add to Cart
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
    
  );
}

export async function getServerSideProps() {
  const res = await fetch(
    base_url_api +
      "/catalog/products?page=1&size=20&sortType=&sortDirection=desc&city=karachi&lang=en"
  );

  const getdata = await res.json();
  const posts = getdata.data;
  // const  posts = await postData.data.childrenData;

  return {
    props: {
      posts,
    },
  };
}
