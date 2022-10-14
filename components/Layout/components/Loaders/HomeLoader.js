import BannerShimmer from "./Shimmers/BannerShimmer"
import MainCategoriesShimmer from "./Shimmers/MainCategoriesShimmer"
import MainProductsShimmer from "./Shimmers/MainProductsShimmer"

const HomeLoader = () => {
    return (
        <div className="flex flex-col space-y-2">
            <BannerShimmer />
            <MainCategoriesShimmer />
            <MainProductsShimmer />
            <MainProductsShimmer />
        </div>
    )
}

export default HomeLoader