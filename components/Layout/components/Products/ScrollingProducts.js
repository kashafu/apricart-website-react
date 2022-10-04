import Slider from "react-slick";
import SingleProduct from "./SingleProduct";

export default function ScrollingProducts({ products }) {
    const settings = {
        dots: false,
        infinite: true,
        arrows: false,
        speed: 500,
        autoplay: true,
        slidesToShow: 4,
        centerMargin: "20px",
        slidesToScroll: 1,
        autoplaySpeed: 2000,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
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

    if (!products) {
        return (
            <div>
                Loading
            </div>
        )
    }

    return (
        <section className="h-full w-full">
            <Slider {...settings} className='h-full w-full'>
                {products.map((product) => {
                    let { id } = product
                    return (
                        <section key={id} className='lg:px-4 h-full w-full'>
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
