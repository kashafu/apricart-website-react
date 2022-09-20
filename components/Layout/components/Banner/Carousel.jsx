import Slider from 'react-slick'
import Image from 'next/image'
import Link from 'next/link'
import { useSelector } from 'react-redux'

import karachiMainBanner from '../../../../public/assets/images/banners/mainBanner.png'
import karachiBulkBanner from '../../../../public/assets/images/banners/peshawarMainBanner.jpeg'
import peshawarMainBanner from '../../../../public/assets/images/banners/peshawarMainBanner.jpeg'
import karachiScrollingBanner1 from '../../../../public/assets/images/banners/saylaniCarousel.jpg'
import karachiScrollingBanner2 from '../../../../public/assets/images/banners/nationalCarousel.jpg'

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
                    {selectedTypeSelector === 'bulk' ? (
                        <Slider {...settings}>
                            <div className="w-full h-full">
                                <Image
                                    src={karachiBulkBanner}
                                    layout={"responsive"}
                                    alt="banner"
                                />
                            </div>
                        </Slider>
                    ) : (
                        <Slider {...settings}>
                            <div className='w-full h-full'>
                                <Link href={'/offers/48'} passHref>
                                    <a className="w-full h-full">
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
                            {/* <div className="w-full h-full">
                                <Image
                                    src={karachiMainBanner}
                                    layout={"responsive"}
                                    alt="banner"
                                />
                            </div> */}
                        </Slider>
                    )}

                </div>
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