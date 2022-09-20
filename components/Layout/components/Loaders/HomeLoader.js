import BannerShimmer from "./Shimmers/BannerShimmer"
import MainProductsShimmer from "./Shimmers/MainProductsShimmer"

const HomeLoader = () => {
    return (
        <div className="flex flex-col space-y-2">
            <BannerShimmer />
            <MainProductsShimmer />
            <MainProductsShimmer />
        </div>
    )
}

export default HomeLoader