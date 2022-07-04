import { useState } from "react"
import Cookies from "universal-cookie"
import AddressCard from "./AddressCard"
import { getGeneralApiParams } from "../../../../helpers/ApiHelpers"
import { base_url_api } from '../../../../information.json'
import axios from "axios"

export default function SingleAddressListing({listing, isSelected, setAddress, updateSavedAddresses}){
    const cookies = new Cookies()
    let {address, area, city, name, phoneNumber, email} = listing
    let style = isSelected ? "bg-red-400" : ""

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
        setAddress(listing)
    }

    return(
        <div className="flex flex-col">
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