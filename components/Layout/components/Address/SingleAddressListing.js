export default function SingleAddressListing({listing, isSelected}){
    let {address, area, city, name, phoneNumber, email} = listing
    let style = isSelected ? "bg-red-400" : ""

    const onClickHandle = () => {
        cookies.set('selected-address', e.target.value)
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
        </div>
    )
}