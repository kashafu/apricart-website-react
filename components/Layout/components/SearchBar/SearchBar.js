import axios from "axios"
import { useState } from "react"
import { getGeneralApiParams } from "../../../../helpers/ApiHelpers"
import { base_url_api } from '../../../../information.json'

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
                className="w-full"
                value={searchText}
                onChange={(e)=>{
                    setSearchText(e.target.value)
                    searchHandler(e.target.value)
                }}
                placeholder='Search Products'
            />
            {}
            {showSearchResults && (
                <div className="absolute bg-white w-full z-20 flex flex-col space-y-2">
                    {searchResults.length > 0 ? (
                        <div>
                            {searchResults.map((product)=>{
                                let {title, id} = product
                                return(
                                    <div key={id}>
                                        <p>
                                            {title}
                                        </p>
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