import Slider from "react-slick";
import SingleProduct from "./SingleProduct";

export default function ScrollingProducts({ products }) {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        autoplay: true,
        slidesToShow: 3,
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
        <section className="">
            <Slider {...settings} className=''>
                {products.map((product)=>{
                    let {id} = product
                    return(
                        <section key={id} className='lg:px-4 py-12'>
                            <SingleProduct
                                product={product}
                            />
                        </section>
                    )
                })}
            </Slider>               
        </section>
    )
}
