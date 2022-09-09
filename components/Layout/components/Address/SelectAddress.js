import { useEffect, useState } from "react"
import { getGeneralApiParams } from "../../../../helpers/ApiHelpers"
import { base_url_api } from '../../../../information.json'
import axios from "axios"
import SubmitButton from "../Buttons/SubmitButton"
import AddressCard from "./AddressCard"
import SingleAddressListing from "./SingleAddressListing"
import { useDispatch } from "react-redux";
import { updateCity, updateSelectedAddress } from "../../../../redux/general.slice"

/*
    type can be 'checkout', 'manage' 
    if using it on checkout page, 'checkout' type is dropdown and manage is list view 
    'manage' allows u to edit address and select
*/

export default function SelectAddress({ type, setAddress, dropDownSelectedAddress }) {
    const [savedAddresses, setSavedAddresses] = useState([])
    const [selectedAddress, setSelectedAddress] = useState(getGeneralApiParams().selectedAddress)
    const [showAddressCard, setShowAddressCard] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        getSavedAddressesApi()
    }, [])

    const getSavedAddressesApi = async () => {
        let { headers, userId } = getGeneralApiParams()
        let url = base_url_api + '/home/address/delivery?lang=en&client_type=apricart&userid=' + userId

        try {
            const response = await axios.get(
                url,
                {
                    headers: headers
                }
            )
            setSavedAddresses(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSavedAddressChange = (e) => {
        setSelectedAddress(e.target.value)
        if (setAddress) {
            setAddress(e.target.value)
        }
        let parsedAddress = JSON.parse(e.target.value)
        dispatch(updateSelectedAddress(parsedAddress))
        dispatch(updateCity(parsedAddress?.city.toLowerCase()))
    }

    return (
        <div className="w-full space-y-2">
            {type === 'checkout' && (
                <div className="grid grid-cols-6 items-center gap-2 border-y py-1">
                    <p className="col-span-2 font-lato text-main-blue font-semibold">
                        Select Address
                    </p>
                    <select
                        className="col-span-2 h-full py-2 lg:px-4 text-xs lg:text-lg rounded-lg bg-slate-200"
                        disabled={false}
                        onChange={handleSavedAddressChange}
                        value={selectedAddress}
                    >
                        <option
                            value={''}
                            disabled={true}
                            selected={true}
                        >
                            Select Address
                        </option>
                        {savedAddresses.map((option) => {
                            let tempSelectedAddress = {}
                            if (dropDownSelectedAddress) {
                                tempSelectedAddress = typeof (dropDownSelectedAddress) === 'object' ? dropDownSelectedAddress : JSON.parse(dropDownSelectedAddress)
                            }
                            return (
                                <option
                                    selected={dropDownSelectedAddress && dropDownSelectedAddress !== '' ? tempSelectedAddress.id == option.id : false}
                                    key={option.id}
                                    value={JSON.stringify(option)}
                                >
                                    {option.address}
                                </option>
                            )
                        })}
                    </select>
                    <div className="col-span-2">
                        <SubmitButton
                            text={"Add Address"}
                            onClick={() => {
                                setShowAddressCard(!showAddressCard)
                            }}
                        />
                    </div>
                </div>
            )}

            {type === 'manage' && (
                <div className="flex flex-col space-y-4">
                    {savedAddresses.map((address) => {
                        let { id } = address
                        return (
                            <SingleAddressListing
                                key={id}
                                listing={address}
                                isSelected={selectedAddress ? selectedAddress.id == id : false}
                                setAddress={setSelectedAddress}
                                updateSavedAddresses={getSavedAddressesApi}
                            />
                        )
                    })}
                    <SubmitButton
                        text={"Add Address"}
                        onClick={() => {
                            setShowAddressCard(!showAddressCard)
                        }}
                    />
                </div>
            )}
            {showAddressCard && (
                <AddressCard
                    type={'add'}
                    updateSavedAddresses={getSavedAddressesApi}
                />
            )}
        </div>
    )
}