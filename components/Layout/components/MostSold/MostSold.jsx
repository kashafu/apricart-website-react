import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../../redux/cart.slice";
import { addToWish } from "../../../../redux/wish.slice";
import { AiOutlineHeart } from "react-icons/ai";
import { current } from "@reduxjs/toolkit";
import Image from "next/image";
import { getCookie } from "../../../../helpers/Cookies";

import { base_url_api } from "../../../../information.json";

export default function RecommendedProducts() {
    const token = getCookie("cookies-token");

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        // centerPadding: "60px",
        slidesToShow: 5,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    initialSlide: 2,
                    dots: false,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    dots: false,
                },
            },
        ],
    };
    const [users, setUsers] = useState([]);

    const getPopularitems = async () => {
        const response = await axios.get(
            base_url_api +
            `/catalog/mostviewed?page=1&size=20&city=${getCookie(
                "cities"
            )}&lang=en`
        );
        setUsers(response.data.data);
    };
    useEffect(() => {
        getPopularitems();
    }, []);

    const cart = useSelector((state) => state.cart);
    const wish = useSelector((state) => state.wish);
    const wishapi = (list) => {
        const wishdata = { sku: [list.sku] };
        if (token) {
            let url = base_url_api + '/watchlist/save?client_type=apricart'
            const response = axios.post(
                url,
                wishdata,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + getCookie("cookies-token"),
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

        if (token) {
            let url = base_url_api + '/order/cart/save?city=karachi&lang=en&client_type=apricart'
            const response = axios.post(
                url,
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + getCookie("cookies-token"),
                    },
                }
            );
        }
    };

    const dispatch = useDispatch();
    return (
        <section className="recommend_sec">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-12  col-md-12  col-lg-12  col-xl-12  col-xxl-12">
                        <div className="recommend_banner">
                            <h4>Most Solds</h4>
                            <Image
                                src="/assets/images/bachatbox.png"
                                width="100%"
                                height="20%"
                                layout="responsive"
                                objectFit="contain"
                                className="img-fluid"
                                alt=""
                            />
                        </div>
                        <section>
                            <Slider {...settings}>
                                {users.map((curElem) => {
                                    const {
                                        id,
                                        productImageUrl,
                                        title,
                                        currentPrice,
                                        inStock,
                                    } = curElem;
                                    return (
                                        <div className="card_1" key={id}>
                                            <div className="p-3 border bg-light btnchan m-1 card1">
                                                <div
                                                    className="heart"
                                                    onClick={() => {
                                                        wishapi(curElem);
                                                        dispatch(
                                                            addToWish(curElem)
                                                        );
                                                    }}
                                                >
                                                    <a className="heart1">
                                                        <AiOutlineHeart />
                                                    </a>
                                                </div>
                                                <div className="pro_img">
                                                    <Link
                                                        href={
                                                            "/details/" +
                                                            curElem.sku
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
                                                        RS.{" "}
                                                        <strong>
                                                            {currentPrice}
                                                        </strong>
                                                    </h4>
                                                    <div className="pro_btn1">
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
                                                    </div>
                                                    {inStock == true ? (
                                                        <div
                                                            className="pro_btn2"
                                                            onClick={() => {
                                                                Cartapi(
                                                                    curElem
                                                                );
                                                                dispatch(
                                                                    addToCart(
                                                                        curElem
                                                                    )
                                                                );
                                                            }}
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
