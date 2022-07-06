import axios from "axios"
import { useState } from "react"
import { getGeneralApiParams } from "../../../../helpers/ApiHelpers"
import { base_url_api } from '../../../../information.json'
import SingleProduct from '../Products/SingleProduct'

export default function SearchBar(){
    const [searchText, setSearchText] = useState('')
	const [searchResults, setSearchResults] = useState([])
    const [showSearchResults, setShowSearchResults] = useState(false)

    const searchHandler = async (searchTerm) => {
        if(searchTerm.length <= 3){
            setSearchResults([])
            setShowSearchResults(false)
            return
        }
        let {city, userId, headers} = getGeneralApiParams()
        let url = base_url_api + '/catalog/products/search?page=1&size=20&term=' + searchTerm + '&category=&city=' + city + '&lang=en&userid=' + userId + '&client_type=apricart'
		let searchResponse = await axios.get(
            url,
            {
                'headers': headers
            }
		)
        setShowSearchResults(true)
        setSearchResults(searchResponse.data.data)
	}

    return(
        <div className="w-full">
            <input
                type={'search'}
                className="w-full p-2 bg-slate-200 rounded-xl font-bold"
                value={searchText}
                onChange={(e)=>{
                    setSearchText(e.target.value)
                    searchHandler(e.target.value)
                }}
                placeholder='Search'
                onBlur={()=>{
                    setShowSearchResults(false)
                }}
            />
            {showSearchResults && (
                <div className="absolute bg-white w-full z-20 flex flex-col space-y-2 max-h-[300px] overflow-auto">
                    {searchResults.length > 0 ? (
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6'>
                            {searchResults.map((product)=>{
                                let {id} = product
                                return(
                                    <div key={id}>
                                        <SingleProduct
                                            product={product}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    )
                    :
                    (
                        <p>
                            Sorry, item does not exist
                        </p>
                    )}
                </div>
            )}
        </div>
    )
}