import axios from "axios"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { getGeneralApiParams } from "../../../../helpers/ApiHelpers"
import { base_url_api } from '../../../../information.json'
import SingleProduct from '../Products/SingleProduct'
import searchIcon from '../../../../public/assets/svgs/searchIcon.svg'

export default function SearchBar() {
    const [searchText, setSearchText] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [showSearchResults, setShowSearchResults] = useState(false)
    const [categories, setCategories] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState('')

    const searchIconElement = useRef()

    useEffect(() => {
        getCategoriesApi()
    }, [])
    
    useEffect(() => {
        console.log(selectedCategory)
    }, [selectedCategory])

    const searchHandler = async (searchTerm) => {
        if (searchTerm.length <= 3) {
            setSearchResults([])
            setShowSearchResults(false)
            return
        }
        let { city, userId, headers } = getGeneralApiParams()
        let url = base_url_api + '/catalog/products/search?page=1&size=20&term=' + searchTerm + '&category=' + selectedCategory + '&city=' + city + '&lang=en&userid=' + userId + '&client_type=apricart'
        let searchResponse = await axios.get(
            url,
            {
                'headers': headers
            }
        )
        setShowSearchResults(true)
        setSearchResults(searchResponse.data.data)
    }

    const getCategoriesApi = async () => {
        let { city, headers } = getGeneralApiParams()
        let url = base_url_api + '/catalog/categories?level=all&client_type=apricart&city=' + city

        try {
            let response = await axios.get(url,
                {
                    headers: headers
                }
            )
            setCategories(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="relative w-full">
            <div className="flex flex-row bg-main-grey-200 rounded-lg w-full">
                <select
                    disabled= {categories == null}
                    className="py-2 rounded-lg bg-main-grey w-1/2"
                    onChange={(e) => {
                        setSelectedCategory(e.target.value)
                    }}
                    value={selectedCategory}
                >
                    <option
                        value={''}
                        disabled
                        selected
                    >
                        Select Categories
                    </option>
                    {categories && categories.map((option) => {
                        return (
                            <option
                                key={option.id}
                                value={option.id}
                            >
                                {option.name}
                            </option>
                        )
                    })}
                </select>
                <input
                    ref={searchIconElement}
                    className="p-2 w-full bg-main-grey-200 rounded-lg font-bold"
                    type={'search'}
                    value={searchText}
                    onChange={(e) => {
                        setSearchText(e.target.value)
                        searchHandler(e.target.value)
                    }}
                    placeholder='Search'
                    onBlur={() => {
                        setShowSearchResults(false)
                    }}
                />
                {/* <div className="absolute right-2 top-0 bottom-0 m-auto h-[20px]"
                    onClick={()=>{
                        searchIconElement.current.focus()
                    }}
                >
                    <Image
                        src={searchIcon}
                        width={20}
                        height={20}
                    />
                </div> */}
            </div>
            {showSearchResults && (
                <div className="absolute z-20 w-full bg-white max-h-[350px] overflow-auto">
                    {searchResults.length > 0 ? (
                        <div className='grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6 p-6'>
                            {searchResults.map((product) => {
                                let { id } = product
                                return (
                                    <div key={id}>
                                        <SingleProduct
                                            product={product}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <p>
                            Sorry, item does not exist
                        </p>
                    )}
                </div>
            )}
        </div>
    )
}