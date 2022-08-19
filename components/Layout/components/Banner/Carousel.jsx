import Slider from 'react-slick'
import Image from 'next/image'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import karachiMainBanner from '../../../../public/assets/images/banners/mainBanner.png'
import peshawarMainBanner from '../../../../public/assets/images/banners/peshawarMainBanner.jpeg'
import karachiScrollingBanner1 from '../../../../public/assets/images/banners/JehanOfferswebbanner.jpeg'
import karachiScrollingBanner2 from '../../../../public/assets/images/banners/everythingIn75.png'

const Carousel = () => {
    const citySelector = useSelector(state => state.general.city)
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

    return (
        <div>
            {citySelector === 'karachi' && (
                <Slider {...settings}>
                    <div className='w-full h-full'>
                        <Link href={'/offers/42'} passHref>
                            <a className="w-full">
                                <Image
                                    src={karachiScrollingBanner1}
                                    layout={"responsive"}
                                    alt="banner"
                                />
                            </a>
                        </Link>
                    </div>
                    <div className='w-full h-full'>
                        <Link href={'/category/just-rs.75/1242'} passHref>
                            <a className="w-full">
                                <Image
                                    src={karachiScrollingBanner2}
                                    layout={"responsive"}
                                    alt="banner"
                                />
                            </a>
                        </Link>
                    </div>
                    <div className="w-full h-full">
                        <Image
                            src={karachiMainBanner}
                            layout={"responsive"}
                            alt="banner"
                        />
                    </div>
                </Slider>
            )}
            {citySelector === 'peshawar' && (
                <Slider {...settings}>
                    <div className="w-full h-full">
                        <Image
                            src={peshawarMainBanner}
                            layout={"responsive"}
                            alt="banner"
                        />
                    </div>
                </Slider>
            )}
        </div>
    )
}

export default Carousel