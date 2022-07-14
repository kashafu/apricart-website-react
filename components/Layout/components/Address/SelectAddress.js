import { useEffect, useState } from "react"
import { getGeneralApiParams } from "../../../../helpers/ApiHelpers"
import { base_url_api } from '../../../../information.json'
import axios from "axios"
import Cookies from "universal-cookie"
import SubmitButton from "../Buttons/SubmitButton"
import AddressCard from "./AddressCard"
import SingleAddressListing from "./SingleAddressListing"
import { useDispatch } from "react-redux";
import { updateSelectedAddress } from "../../../../redux/general.slice"
const cookies = new Cookies();

/*
    type can be 'checkout', 'manage' 
    if using it on checkout page, 'checkout' type will not modify the selected address cookie 
    'manage' allows u to edit address and select
*/

export default function SelectAddress({ type, setAddress, dropDownSelectedAddress }) {
    const [savedAddresses, setSavedAddresses] = useState([])
    const [selectedAddress, setSelectedAddress] = useState(getGeneralApiParams().selectedAddress)
    const [showAddressCard, setShowAddressCard] = useState(false)
    const dispatch = useDispatch()
    // const generalStore = useSelector((state)=>state.general)

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
            console.log(error)
        }
    }

    const handleSavedAddressChange = (e) => {
        setSelectedAddress(e.target.value)
        if (type === 'checkout') {
            setAddress(e.target.value)
        }
        else {
            cookies.set('selected-address', e.target.value)
            dispatch(updateSelectedAddress(e.target.value))
        }
    }

    return (
        <div className="w-full space-y-2">
            {type === 'checkout' && (
                <div className="grid grid-cols-5 items-center gap-4">
                    <p className="col-span-1 font-lato text-main-blue font-semibold">
                        Select Address
                    </p>
                    <select
                        className="col-span-3 h-full py-2 px-4 rounded-lg"
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
                            return (
                                <option
                                    selected={dropDownSelectedAddress ? JSON.parse(dropDownSelectedAddress).id == option.id : false}
                                    key={option.id}
                                    value={JSON.stringify(option)}
                                >
                                    {option.address}
                                </option>
                            )
                        })}
                    </select>
                    <div>
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

            {/* <SubmitButton
                text={"Add Address"}
                onClick={() => {
                    setShowAddressCard(!showAddressCard)
                }}
            /> */}
            {showAddressCard && (
                <AddressCard
                    type={'add'}
                    updateSavedAddresses={getSavedAddressesApi}
                />
            )}
        </div>
    )
}