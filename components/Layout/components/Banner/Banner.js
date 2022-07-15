import Link from "next/link";
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Banner({ banners }) {
    if (!banners) {
        return (
            <div>
                <p>
                    Loading Banners
                </p>
            </div>
        )
    }

    return (
        <div className="scale-y-75 md:scale-100">
            <Carousel autoPlay={true} infiniteLoop={true} swipeable={true} showArrows={true} interval={5000}>
                {banners.map((banner) => {
                    let { id, bannerUrlWeb } = banner
                    return (
                        <Link href="/offers/[id]"
                            as={
                                "/offers/" + id
                            }
                            passHref
                            key={id}
                        >
                            <button className="carousel-inner">
                                <img
                                    src={bannerUrlWeb}
                                    alt=""
                                />
                            </button>
                        </Link>
                    )
                })}
            </Carousel>
        </div>
    )
}