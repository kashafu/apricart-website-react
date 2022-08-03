import { useEffect } from "react"
import { useTestApi } from "../helpers/Api"
import Categories from "../components/Layout/components/Categories/Categories"

export default function Test() {
	const { isLoading, data, errorMessage, response, errorResponse } = useTestApi()

	return (
		<div>
            {!isLoading && (
                <Categories
                    categories={data}
                />
            )}
		</div>
	)
}
