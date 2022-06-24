import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../../redux/cart.slice";
import { addToWish } from "../../../../redux/wish.slice";
let base_url_api = "https://staging.apricart.pk/v1";
import { AiOutlineHeart } from "react-icons/ai";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";
import SingleItem from "../Products/SingleProduct";

///catalog/mostviewed?page=1&size=10&city=karachi&lang=en
const useEffectAPI = () => {
    const cart = useSelector((state) => state.cart);
    const wish = useSelector((state) => state.wish);
    const cookies = new Cookies();
    var token = cookies.get("cookies-token");

    const dispatch = useDispatch();
    const router = useRouter();

    if (router.isFallback) {
        return (
            <div>
                <h2>Loading Page Data...</h2>
            </div>
        );
    }
    // const cartnotify = () => {
    //   if(cart.length == 0){
    //     toast.info("No Item in the Cart !");
    //   }
    // }

    const [users, setUsers] = useState([]);

    /*base_url_api not included*/
    const getPopularitems = async () => {
        const response = await axios.get(
            base_url_api +
                `/home/all?client_lat=24.8438858&client_long=67.1343959&city=karachi&lang=en&userid=abc123&web=false&hide=false&maker=ios&model=iphone6s&prod_type=cus&order_type=delivery&client_type=apricart`,
            {
                headers: {
                    Accept: " */*",
                },
            }
        );
        setUsers(response.data.data.products);
        console.log(response.data.data.products);
    };
    useEffect(() => {
        getPopularitems();
    }, []);
    const wishapi = (list) => {
        console.log(list.sku);
        const wishdata = { sku: [list.sku] };
        if (token) {
            console.log(token)
            const response = axios.post(
                "https://staging.apricart.pk/v1/watchlist/save?",
                wishdata,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + cookies.get("cookies-token"),
                    },
                }
            );
        }
    };

    const Cartapi = (list) => {
        const data = {
            cart: [
                {
                    sku: list.sku,
                    qty: "1",
                },
            ],
        };
        console.log(data.cart);

        if (token) {
            console.log(list.sku);
            const response = axios.post(
                "https://staging.apricart.pk/v1/order/cart/save?city=karachi&lang=en&client_type=apricart",
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + cookies.get("cookies-token"),
                    },
                }
            );
        }
    };

    if(!users){
        return(
            <div>
                Loading
            </div>
        )
    }

    return (
        <>
            <div className="">
                <div className="popular_head">
                    <h3>Popular Items</h3>
                </div>
                <div>
                    <div className="row row-cols-2 row-cols-md-4 row-cols-lg-5 g-2 g-lg-3">
                        {users.map((curElem) => {
                            return (
                                <>
                                    {curElem.data.map((list) => {
                                        const {
                                            id,
                                            productImageUrl,
                                            title,
                                            currentPrice,
                                            sku,
                                        } = list;
                                        //stop
                                        return (
                                            // <SingleItem
                                            //     item={list}
                                            // />
                                            <div className="col" key={id}>
                                                <div className="p-3 border bg-light btnchan">
                                                    <div
                                                        className="heart"
                                                        onClick={() => {
                                                            wishapi(list);
                                                            dispatch(
                                                                addToWish(list)
                                                            );
                                                        }}
                                                    >
                                                        <a className="heart1">
                                                            <AiOutlineHeart />
                                                        </a>
                                                    </div>
                                                    <div className="pro_img">
                                                        <Link
                                                            href="/details/[id]"
                                                            as={
                                                                "/details/" +
                                                                list.sku
                                                            }
                                                            className="Link-CSS"
                                                            passHref
                                                        >
                                                            <img
                                                                src={
                                                                    productImageUrl
                                                                }
                                                                className="img-fluid"
                                                                alt=""
                                                            />
                                                        </Link>

                                                        <h5>{title}</h5>
                                                        <h4>
                                                            Rs.{" "}
                                                            <strong>
                                                                {currentPrice}
                                                            </strong>
                                                        </h4>
                                                        {/* <div className="pro_btn1">
                                                            <select
                                                                name="product"
                                                                id="product"
                                                            >
                                                                <option value="1">
                                                                    1 KG
                                                                </option>
                                                                <option value="2">
                                                                    2 KG
                                                                </option>
                                                                <option value="3">
                                                                    3 KG
                                                                </option>
                                                            </select>
                                                        </div> */}
                                                        {list.inStock ==
                                                        true ? (
                                                            <div
                                                                className="pro_btn2"
                                                                onClick={() => {
                                                                    Cartapi(
                                                                        list
                                                                    );
                                                                    dispatch(
                                                                        addToCart(
                                                                            list
                                                                        )
                                                                    );
                                                                }}
                                                            >
                                                                <a className="btn btn-primary chane">
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
                                                                        Out of
                                                                        stock
                                                                    </a>
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default useEffectAPI;
