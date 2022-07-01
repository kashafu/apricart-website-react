import { useEffect, useState } from "react"
import Dropdown from "../Input/Dropdown"
import { getGeneralApiParams } from "../../../../helpers/ApiHelpers"
import { base_url_api } from '../../../../information.json'
import axios from "axios"
import Cookies from "universal-cookie"
import SubmitButton from "../Buttons/SubmitButton"
import AddressCard from "./AddressCard"
const cookies = new Cookies();

export default function SelectAddress({}){
    const [savedAddresses, setSavedAddresses] = useState([])
    const [selectedAddress, setSelectedAddress] = useState({})
    const [showAddressCard, setShowAddressCard] = useState(false)

    useEffect(() => {
        getSavedAddressesApi()
    }, [])

    const getSavedAddressesApi = async () => {
        let { headers } = getGeneralApiParams()
        let url = base_url_api + '/home/address/delivery?lang=en&client_type=apricart'

        try {
			const response = await axios.get(
				url,
				{
					headers: headers
				}
			)
			setSavedAddresses(response.data.data)
		} catch (error) {
			// console.log(error.response.data.message)
            console.log(error)
		}
	}

    const handleSavedAddressChange = (e) => {
        setSelectedAddress(e.target.value)
        cookies.set('selected-address', e.target.value)
    }

    return(
        <div className="w-full space-y-2">
            {/* <Dropdown
                label={'Select Address'}
                // options={savedAddresses}
                options={arr}
                optionText={'address'}
                customOnChange= {true}
                onChange={handleSavedAddressChange}
                value={selectedAddress}
                placeholder={'Select Address'}
            /> */}
            <div className="grid grid-cols-3">
                <p className="col-span-1">
                    Select Address
                </p>
                <select
                    className="col-span-2"
                    disabled={false}
                    onChange={handleSavedAddressChange}
                    value={selectedAddress}
                >
                    <option
                        value={''}
                        disabled
                        selected
                    >
                        Select Address
                    </option>
                    {savedAddresses.map((option)=>{
                        return(
                            <option
                                key={option.id}
                                value={JSON.stringify(option)}
                            >
                                {option.address}
                            </option>
                        )
                    })}
                </select>
            </div>

            <SubmitButton
                text={"Add Address"}
                onClick={()=>{
                    setShowAddressCard(!showAddressCard)
                }}
            />
            {showAddressCard && (
                <AddressCard
                    type={'add'}
                    updateSavedAddresses={getSavedAddressesApi}
                />
            )}
        </div>
    )
}