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