import { useState } from "react"
import Cookies from "universal-cookie"
import AddressCard from "./AddressCard"
import { getGeneralApiParams } from "../../../../helpers/ApiHelpers"
import { base_url_api } from '../../../../information.json'
import axios from "axios"
import { useDispatch } from "react-redux";
import { updateSelectedAddress } from "../../../../redux/general.slice"

export default function SingleAddressListing({listing, isSelected, setAddress, updateSavedAddresses}){
    const cookies = new Cookies()
    const dispatch = useDispatch()

    let {address, area, city, name, phoneNumber, email} = listing
    let style = isSelected ? "bg-lime-300 rounded-xl" : ""

    const [showEdit, setShowEdit] = useState(false)

    const deleteAddressApi = async() => {
        let { headers } = getGeneralApiParams()
        let url = base_url_api + '/home/address/delivery/delete?client_type=apricart'
        let body = {
            "id": listing.id
        }

        try {
            let response = await axios.delete(url, 
                {
                    headers: headers,
                    data: body
                }
            )

            updateSavedAddresses()
        } catch (error) {
            console.log(error.response)
        }
    }

    const onClickHandle = () => {
        cookies.set('selected-address', listing)
        dispatch(updateSelectedAddress(listing))
        setAddress(listing)
    }

    return(
        <div className="flex flex-col border-2 rounded-2xl mx-4">
            <button
                onClick= {onClickHandle}
                className= {style}
            >
                <p>
                    {name}, {phoneNumber}
                </p>
                <p>
                    {email}
                </p>
                <p>
                    {address}, {area}, {city}
                </p>
            </button>
            <button
                onClick={()=>{
                    setShowEdit(!showEdit)
                }}
            >
                EDIT
            </button>
            <button
                onClick={deleteAddressApi}
            >
                DELETE
            </button>
            {showEdit && (
                <AddressCard
                    type={"edit"}
                    previousAddress={listing}
                    updateSavedAddresses={updateSavedAddresses}
                    setShow={setShowEdit}
                />
            )}
        </div>
    )
}