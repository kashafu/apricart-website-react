import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Cookies from "universal-cookie";

let base_url_api = "https://staging.apricart.pk/v1";

export default function Slider() {
    const cookies = new Cookies();

    const [banners, setBanner] = useState([]);
    const getBanner = async () => {
        const response = await axios.get(
            base_url_api +
                `/home/all?client_lat=24.8438858&client_long=67.1343959&city=karachi&lang=en&userid=abc123&web=false&hide=false&maker=ios&model=iphone6s&prod_type=cus&order_type=delivery&client_type=apricart`
        );
        setBanner(response.data.data.banners);
    };

    useEffect(() => {
        getBanner();
    }, []);

    return (
        <section className="min-w-full min-h-full">
            <Carousel
                autoPlay={true}
                infiniteLoop={true}
                swipeable={true}
                showArrows={true}
                interval={5000}
            >
                {banners.map((banner) => {
                    const { id, bannerUrlWeb } = banner;
                    //base_url_api +
                    return (
                        <div className="" key={id}>
                            <img
                                src={bannerUrlWeb}
                                className="img-fluid"
                                alt="Banner Images"
                            />
                            {/* TODO - use next image */}
                            {/* <Image
                                src={bannerUrlWeb[0]}
                                alt={"Banner image"}
                                layout={"fill"}
                            /> */}
                        </div>
                    );
                })}
            </Carousel>
        </section>
    );
}
