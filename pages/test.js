import AddressCard from "../components/Layout/components/Address/AddressCard";
import SelectAddress from "../components/Layout/components/Address/SelectAddress";
import MainProducts from "../components/Layout/components/Products/MainProducts";
import SingleItem from "../components/Layout/components/Products/SingleProduct";
import {getGeneralApiParams} from '../helpers/ApiHelpers'
let json = {
    "id": 12216,
    "sku": "APRA-BD02-01",
    "title": "Canbebe Primary Care Classic - 56 Pack",
    "description": "Canbebe Primary Care Classic - 56 Pack",
    "brand": "Canbebe",
    "barcode": "",
    "inStock": true,
    "qty": 10,
    "minQty": 1,
    "maxQty": 1000,
    "categoryIds": " 1156 | 1131 | 0",
    "categoryleafName": " Diapers & Wipes",
    "currentPrice": 310.0,
    "specialPrice": 0.0,
    "productImageUrl": "http://15.184.248.248:8080/options/stream/APRA-BD02-01.png",
    "productImageUrlThumbnail": "",
    "updateDateTimeInventory": "2022-06-22T19:15:13.897027",
    "updateTime": null,
    "instant": false,
    "favourite": false
}

export default function Test(){
    return(
        <div>
            <SelectAddress 
                type={'dropdown'}
            />
            {/* <AddressCard
                type={'add'}
            /> */}
        </div>
    )
}