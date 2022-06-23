import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function BannerSlider({banners}) {
    return (
        <section className="min-w-full min-h-full">
            <Carousel
                autoPlay={true}
                infiniteLoop={true}
                swipeable={true}
                showArrows={true}
                interval={5000}
            >
                {banners.map((banner) => {
                    const { id, bannerUrlWeb } = banner;
                    //base_url_api +
                    return (
                        <div className="" key={id}>
                            <img
                                src={bannerUrlWeb}
                                className="img-fluid"
                                alt="Banner Images"
                            />
                            {/* TODO IMPLEMENT NEXT IMAGE */}
                            {/* <Image
                                src={bannerUrlWeb}
                                alt={"Banner image"}
                                layout={"fill"}
                            /> */}
                        </div>
                    );
                })}
            </Carousel>
        </section>
    );
}
