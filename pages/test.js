import AddressCard from "../components/Layout/components/Address/AddressCard";
import SelectAddress from "../components/Layout/components/Address/SelectAddress";
import MainProducts from "../components/Layout/components/Products/MainProducts";
import SingleItem from "../components/Layout/components/Products/SingleProduct";
import SingleProductCart from "../components/Layout/components/Products/SingleProductCart";
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

let data = [
    {
        "id": 12110,
        "sku": "APR-LM03-03",
        "title": "Olper's Full Cream Milk - 1 Litre",
        "description": "Olper's Full Cream Milk - 1 Litre",
        "brand": "Olper's",
        "barcode": "",
        "inStock": true,
        "qty": 1,
        "minQty": 1,
        "maxQty": 1000,
        "categoryIds": " 1182 | 1183 | 1154 | 0",
        "categoryleafName": " Milk",
        "currentPrice": 175.0,
        "specialPrice": 0.0,
        "productImageUrl": "http://15.184.248.248:8080/options/stream/APR-LM03-03.png",
        "productImageUrlThumbnail": "",
        "updateDateTimeInventory": "2022-07-01T16:32:46.556955",
        "updateTime": null,
        "instant": false,
        "favourite": true
    },
    {
        "id": 11229,
        "sku": "APR-VGF01-01",
        "title": "Potato (Aloo) 1kg",
        "description": "Potato (Aloo) 1kg",
        "brand": "",
        "barcode": "",
        "inStock": true,
        "qty": 1,
        "minQty": 1,
        "maxQty": 1000,
        "categoryIds": " 1220 | 1166 | 0 | 1232",
        "categoryleafName": " Vegetables | Weekend Offers",
        "currentPrice": 55.0,
        "specialPrice": 49.0,
        "productImageUrl": "http://15.184.248.248:8080/options/stream/APR-VGF01-01.png",
        "productImageUrlThumbnail": "http://15.184.248.248:8080/options/stream/APR-VGF01-01_thumbnail.png",
        "updateDateTimeInventory": "2022-06-30T17:12:16.681475",
        "updateTime": null,
        "instant": false,
        "favourite": true
    }
]

export default function Test() {
    return (
        <div className="flex flex-col space-y-4">
            {/* <SelectAddress 
                type={'manage'}
            /> */}
            {/* <AddressCard
                type={'add'}
            /> */}
            {data.map((item)=>{
                return(
                    <SingleProductCart
                        product={item}
                    />
                )
            })}
        </div>
    )
}