import { useRouter } from "next/router"

import ListProductsShimmer from "../../../components/Layout/components/Loaders/Shimmers/ListProductsShimmer"
import HeadTag from "../../../components/Layout/components/Head/HeadTag"
import PageHeading from '../../../components/Layout/components/Typography/PageHeading'
import { useSearchResultsApi } from "../../../helpers/Api"
import ListProducts from "../../../components/Layout/components/Products/ListProducts"
import CategoryAndItemsLayout from "../../../components/Layout/components/Layouts/CategoryAndItemsLayout"

const SearchResults = () => {
    const router = useRouter()
    const { term } = router.query

    const Products = () => {
        const { isLoading, searchResults, errorMessage } = useSearchResultsApi()

        if (isLoading) {
            return (
                <ListProductsShimmer />
            )
        }

        if (!searchResults) {
            return (
                <p>{errorMessage}</p>
            )
        }

        if (searchResults.length === 0) {
            return (
                <p>No items match the search criteria</p>
            )
        }

        return (
            <ListProducts
                products={searchResults}
            />
        )
    }

    const PageItems = () => {
        return (
            <div className='space-y-4'>
                <PageHeading
                    text={'SEARCH RESULTS FOR: ' + term}
                />
                <Products />
            </div>
        )
    }

    return (
        <div>
            <HeadTag title={term} />
            <CategoryAndItemsLayout>
                <PageItems />
            </CategoryAndItemsLayout>
        </div>
    )
}

export default SearchResults