import { useRouter } from "next/router"
import HeadTag from "../../../components/Layout/components/Head/HeadTag"
import Categories from "../../../components/Layout/components/Categories/Categories"
import SingleProduct from "../../../components/Layout/components/Products/SingleProduct"
import PageHeading from '../../../components/Layout/components/Typography/PageHeading'
import { useSearchResultsApi } from "../../../helpers/Api"

const SearchResults = () => {
    const router = useRouter()
    const { term } = router.query
    const { isLoading, searchResults, errorMessage, response } = useSearchResultsApi()

    if (isLoading) {
        return (
            <div>
                <HeadTag title={"Loading Search Results"} />
                <p>Loading</p>
            </div>
        )
    }

    if (!searchResults) {
        return (
            <div>
                <HeadTag title={"Search"} />
                <p>{errorMessage}</p>
            </div>
        )
    }

    console.log(response)

    return (
        <div>
            <HeadTag title={term} />
            <div className="grid grid-cols-5 gap-8">
                {/* CATEGORIES SECTION */}
                <section className="hidden lg:col-span-1 lg:block">
                    <Categories />
                </section>
                {/* PRODUCTS SECTION */}
                <section className="col-span-5 lg:col-span-4 space-y-12">
                    <PageHeading
                        text={'SEARCH RESULTS FOR: ' + term}
                    />
                    {searchResults.length == 0 ? (
                        <div>NO ITEMS EXIST</div>
                    ) : (
                        <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {searchResults.map((result) => {
                                let { sku } = result
                                return (
                                    <div key={sku}>
                                        <SingleProduct product={result} />
                                    </div>
                                )
                            })}
                        </section>
                    )}
                </section>
            </div>
        </div>
    )
}

export default SearchResults