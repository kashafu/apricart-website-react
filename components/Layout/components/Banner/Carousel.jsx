import Slider from 'react-slick'
import Image from 'next/image'
import Link from 'next/link'
import mainBanner from '../../../../public/assets/images/banners/mainBanner.png'
import everythingIn75 from '../../../../public/assets/images/banners/everythingIn75.png'

const Carousel = () => {
    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 1500,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 5000,
        className: 'h-full'
        // cssEase: "linear",
        // responsive: [
        //     {
        //         breakpoint: 1024,
        //         settings: {
        //             slidesToShow: 3,
        //             slidesToScroll: 1,
        //             infinite: true,
        //             dots: false,
        //         },
        //     },
        //     {
        //         breakpoint: 600,
        //         settings: {
        //             slidesToShow: 2,
        //             slidesToScroll: 1,
        //             initialSlide: 2,
        //             dots: false,
        //         },
        //     },
        //     {
        //         breakpoint: 480,
        //         settings: {
        //             slidesToShow: 2,
        //             slidesToScroll: 1,
        //             dots: false,
        //         },
        //     },
        // ],
    }

    return(
        <Slider {...settings}>
            <div className='w-full h-full'>
                <Link href={'/category/just-rs.75/1242'} passHref>
                    <a className="w-full">
                        <Image
                            src={everythingIn75}
                            layout={"responsive"}
                            alt="banner"
                        />
                    </a>
                </Link>
            </div>
            <div className="w-full h-full">
                <Image
                    src={mainBanner}
                    layout={"responsive"}
                    alt="banner"
                />
            </div>
        </Slider>
    )
}

export default Carousel