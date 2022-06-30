import { useState } from "react"

export default function SelectAddress({}){
    const [savedAddresses, setSavedAddresses] = useState([])

    const getSavedAddressesApi = async () => {
		try {
			let { headers } = getGeneralApiParams()
			let url = base_url_api + '/home/address/delivery?lang=en&client_type=apricart'
			
			const response = await axios.get(
				url,
				{
					headers: headers
				}
			);
			setSavedAddresses(response.data.data);
		} catch (error) {
			console.log(error.response.data.message)
		}
	}

    return(
        <div>
            <select>
                {savedAddresses.map((address)=>{
                    <div>
                        
                    </div>
                })}
            </select>
        </div>
    )
}