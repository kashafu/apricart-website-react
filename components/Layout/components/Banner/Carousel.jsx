import Slider from 'react-slick'
import Image from 'next/image'
import Link from 'next/link'
import { useSelector } from 'react-redux'

import karachiScrollingBanner1 from '../../../../public/assets/images/banners/homeDeliveryCarousel4.png'
import karachiScrollingBanner2 from '../../../../public/assets/images/banners/Main_scrollable_Banner_National.png'
import karachiScrollingBanner3 from '../../../../public/assets/images/banners/Main_scrollable_Banner.png'
import karachiScrollingBanner4 from '../../../../public/assets/images/banners/Sunridge_web_Main_scrollable_Banner.png'
import karachiScrollingBanner5 from '../../../../public/assets/images/banners/sunlightwebbanner.png'
import karachiScrollingBanner6 from '../../../../public/assets/images/banners/web_banner_clearance_sale.png'
import karachiScrollingBanner7 from '../../../../public/assets/images/banners/jehan_web_banner_1.jpg'
import peshawarScrollingBanner from '../../../../public/assets/images/banners/peshawarBulkBuyCarousel3.png'
import bulkBuyBanner from '../../../../public/assets/images/banners/bulkBuyCarousel.png'

const Carousel = () => {
    const citySelector = useSelector(state => state.general.city)
    const selectedTypeSelector = useSelector(state => state.general.selectedType)
    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 1500,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 5000,
        className: 'w-full h-full'
    }

    return (
        <div className='h-full w-full overflow-hidden'>
            {citySelector === 'karachi' && (
                <div>
                    {selectedTypeSelector === 'bulk' && (
                        <Slider {...settings}>
                            <div className="w-full h-full">
                                <Link href={'/offers/151'} passHref>
                                    <a className="w-full h-full">
                                        <Image
                                            src={karachiScrollingBanner6}
                                            layout={"responsive"}
                                            alt="banner"
                                        />
                                    </a>
                                </Link>
                            </div>
                            <div className="w-full h-full">
                                <Link href={'/offers/150'} passHref>
                                    <a className="w-full h-full">
                                        <Image
                                            src={karachiScrollingBanner7}
                                            layout={"responsive"}
                                            alt="banner"
                                        />
                                    </a>
                                </Link>
                            </div>
                            <div className="w-full h-full">
                                <Link href={'/offers/147'} passHref>
                                    <a className="w-full h-full">
                                        <Image
                                            src={karachiScrollingBanner2}
                                            layout={"responsive"}
                                            alt="banner"
                                        />
                                    </a>
                                </Link>
                            </div>
                            <div className="w-full h-full">
                                <Link href={'/offers/146'} passHref>
                                    <a className="w-full h-full">
                                        <Image
                                            src={karachiScrollingBanner3}
                                            layout={"responsive"}
                                            alt="banner"
                                        />
                                    </a>
                                </Link>
                            </div>
                            <div className="w-full h-full">
                                <Link href={'/offers/148'} passHref>
                                    <a className="w-full h-full">
                                        <Image
                                            src={karachiScrollingBanner4}
                                            layout={"responsive"}
                                            alt="banner"
                                        />
                                    </a>
                                </Link>
                            </div>
                            <div className="w-full h-full">
                                <Link href={'/offers/133'} passHref>
                                    <a className="w-full h-full">
                                        <Image
                                            src={karachiScrollingBanner5}
                                            layout={"responsive"}
                                            alt="banner"
                                        />
                                    </a>
                                </Link>
                            </div>
                            <div className="w-full h-full">
                                <Image
                                    src={bulkBuyBanner}
                                    layout={"responsive"}
                                    alt="banner"
                                />
                            </div>
                        </Slider>
                    )}
                    {selectedTypeSelector === 'cnc' && (
                        <Slider {...settings}>
                            <div className="w-full h-full">
                                <Link href={'/offers/111'} passHref>
                                    <a className="w-full h-full">
                                        <Image
                                            src={karachiScrollingBanner1}
                                            layout={"responsive"}
                                            alt="banner"
                                        />
                                    </a>
                                </Link>
                            </div>
                        </Slider>
                    )}

                </div>
            )}
            {citySelector === 'peshawar' && (
                <Slider {...settings}>
                    <div className='w-full h-full'>
                        <Link href={'/offers/75'} passHref>
                            <a className="w-full h-full">
                                <Image
                                    src={peshawarScrollingBanner}
                                    layout={"responsive"}
                                    alt="banner"
                                />
                            </a>
                        </Link>
                    </div>
                    <div className="w-full h-full">
                        <Image
                            src={bulkBuyBanner}
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