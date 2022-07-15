import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Banner({banners}){
    if(!banners){
        return(
            <div>
                <p>
                    Loading Banners
                </p>
            </div>
        )
    }

    return(
        <div className="scale-y-75 md:scale-100">
            <Carousel autoPlay={true} infiniteLoop={true} swipeable={true} showArrows={true} interval={5000}>
                {banners.map((banner)=>{
                    return(
                        <button key={banner.id} className="carousel-inner" onClick={()=>{
                        }}>
                            <img
                                src={banner.bannerUrlWeb}    
                                // className="h-[100px] w-full"
                                alt=""
                            />
                        </button>
                    )
                })}
            </Carousel>
        </div>
    )
}