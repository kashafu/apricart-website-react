import axios from "axios"
import { getGeneralApiParams } from "../../../../helpers/ApiHelpers"

export default function SearchBar({onChange, value}){
    const searchHandler = async (searchTerm) => {
        let {city, userId, headers} = getGeneralApiParams()
        let url = baseURL + '/catalog/products/search?page=1&size=20&term=' + searchTerm + '&category=&city=' + city + '&lang=en&userid=' + userId + '&client_type=apricart'
		let searchResponse = await axios.get(
            url,
            {
                'headers': headers
            }
		)
        console.log(searchResponse)
	}

    return(
        <div>
            <input
                type={'search'}
                value={value}
                onChange={(e)=>{
                    onChange(e.target.value)
                    searchHandler(value)
                }}
            />
        </div>
    )
}