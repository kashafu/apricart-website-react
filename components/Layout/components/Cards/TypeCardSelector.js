import HomeDeliveryCard from "./HomeDeliveryCard"
import ClickAndCollectCard from "./ClickAndCollectCard"
import BulkBuyCard from "./BulkBuyCard"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateSelectedType } from "../../../../redux/general.slice"

const TypeCardSelector = () => {
    const [isSelected, setIsSelected] = useState()

    return(
        <div className="grid grid-cols-3 lg:gap-12 lg:px-28 gap-2">
            <HomeDeliveryCard />
            <ClickAndCollectCard />
            <BulkBuyCard />
        </div>
    )
}

export default TypeCardSelector