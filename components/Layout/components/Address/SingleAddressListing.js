import { useState } from "react"
import Cookies from "universal-cookie"
import AddressCard from "./AddressCard"

export default function SingleAddressListing({listing, isSelected, setAddress, updateSavedAddresses}){
    const cookies = new Cookies()
    let {address, area, city, name, phoneNumber, email} = listing
    let style = isSelected ? "bg-red-400" : ""

    const [showEdit, setShowEdit] = useState(false)

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
                Edit
            </button>
            {showEdit && (
                <AddressCard
                    type={"edit"}
                    previousAddress={listing}
                    updateSavedAddresses={updateSavedAddresses}
                />
            )}
        </div>
    )
}