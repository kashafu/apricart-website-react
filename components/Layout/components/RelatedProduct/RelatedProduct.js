import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../redux/cart.slice";
let base_url_api = "https://stag.apricart.pk/v1";
import Cookies from 'universal-cookie';
import ScrollingProducts from '../Products/ScrollingProducts'

export default function RecommendedProducts() {
  const dispatch = useDispatch();
  const cookies = new Cookies();
  var token = cookies.get("cookies-token");

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 5,
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
          slidesToShow: 3,
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
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false
        },
        
      },
    ],
  };
  const [users, setUsers] = useState([]);
  const getPopularitems = async () => {
    const response = await axios.get(
      base_url_api + `/catalog/recommended?page=1&size=20&city=${cookies.get('cities')}&lang=en`
    );
    setUsers(response.data.data);
  };
  useEffect(() => {
    getPopularitems();
  }, []);
  return (
    <section className="recommend_sec">
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-12  col-md-12  col-lg-12  col-xl-12  col-xxl-12">
            <section>
              <ScrollingProducts
                products={users}
              />
              {/* <Slider {...settings}>
                {users.map((curElem) => {
                  const { id, productImageUrl, title } = curElem;
                  return (
                    <div className="card_1" key={id}>
                      <div
                        className="p-3 border bg-light btnchan m-1 card1"
                        
                      >
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
                            RS. <strong>120</strong>
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
                                  onClick={() =>
                                    dispatch(addToCart(curElem))
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
                  );
                })}
              </Slider> */}
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
