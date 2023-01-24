import Slider from "react-slick"
import Image from "next/image"
import Link from "next/link"

const Carousel = ({ banners }) => {
    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 1500,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 5000,
        className: "w-full h-full",
    }

    return (
        <div className="h-full w-full overflow-hidden">
            <Slider {...settings}>
                {banners.map((banner) => {
                    let { bannerUrlApp, bannerUrlWeb, offerId } = banner
                    return (
                        <>
                            {offerId !== 0 ? (
                                <>
                                    {/* MOBILE */}
                                    <div className="w-full h-full lg:hidden">
                                        <Link href={"/offers/" + offerId} passHref>
                                            <a className="w-full h-full">
                                                <Image
                                                    src={bannerUrlApp[0]}
                                                    layout={"responsive"}
                                                    width={100}
                                                    height={45}
                                                    alt="banner"
                                                />
                                            </a>
                                        </Link>
                                    </div>
                                    {/* DESKTOP */}
                                    <div className="w-full h-full hidden lg:block">
                                        <Link href={"/offers/" + offerId} passHref>
                                            <a className="w-full h-full">
                                                <Image
                                                    src={bannerUrlWeb[0]}
                                                    layout={"responsive"}
                                                    width={100}
                                                    height={20}
                                                    alt="banner"
                                                />
                                            </a>
                                        </Link>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {/* MOBILE */}
                                    <div className="w-full h-full lg:hidden">
                                        <Image
                                            src={bannerUrlApp[0]}
                                            layout={"responsive"}
                                            width={100}
                                            height={45}
                                            alt="banner"
                                        />
                                    </div>
                                    {/* DESKTOP */}
                                    <div className="w-full h-full hidden lg:block">
                                        <Image
                                            src={bannerUrlWeb[0]}
                                            layout={"responsive"}
                                            width={100}
                                            height={20}
                                            alt="banner"
                                        />
                                    </div>
                                </>
                            )}
                        </>
                    )
                })}
            </Slider>
        </div>
    )
}

export default Carousel
