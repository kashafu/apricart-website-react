import Image from "next/image";
import Slider from "react-slick";
import SingleProduct from "./SingleProduct";

export default function ScrollingProducts({ products }) {
    console.log(products)

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
                    dots: false,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
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
    }

    if(!products){
        return(
            <div>
                Loading
            </div>
        )
    }

    return (
        // <section>
        //     {/* BANNER */}
        //     <div className="w-full">
        //         {/* <Image
        //             src={bannerImageWeb}
        //             layout={'fill'}
        //         /> */}
        //     </div>
        //     <p>
        //         {name}
        //     </p>
        //     {/* SECTION HEADER */}
        //     <section>
        //         <Slider {...settings}>
        //             {products.map((product)=>{
        //                 return(
        //                     <div key={product.id}>
        //                         <SingleProduct
        //                             product={product}
        //                         />
        //                     </div>
        //                 )
        //             })}
        //         </Slider>               
        //     </section>
        // </section>
        <section>
            {products.map((product)=>{
                let {bannerImageWeb, name, id} = product
                return(
                    <div key={id}>
                        <section>
                        {/* BANNER */}
                        <div className="w-full">
                            {/* <Image
                                src={bannerImageWeb}
                                layout={'fill'}
                            /> */}
                        </div>
                        <p>
                            {name}
                        </p>
                        {/* SECTION HEADER */}
                        <section>
                            <Slider {...settings}>
                                {products.map((product)=>{
                                    return(
                                        <div key={product.id}>
                                            <SingleProduct
                                                product={product}
                                            />
                                        </div>
                                    )
                                })}
                            </Slider>               
                        </section>
                    </section>

                    </div>
                )
            })}
        </section>
    )
}
