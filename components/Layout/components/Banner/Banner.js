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
        <div>
            <Carousel autoPlay={true} infiniteLoop={true} swipeable={true} showArrows={true} interval={5000}>
                {banners.map((banner)=>{
                    return(
                        <button key={banner.id} className="carousel-inner" onClick={()=>{
                            console.log(banner.id)
                        }}>
                            <img
                                src={banner.bannerUrlWeb}    
                                className="img-fluid"
                                alt=""
                                // height={"500px"}
                                // width={"100%"}
                            />
                            
                        </button>
                    )
                })}
            </Carousel>
        </div>
    )
}