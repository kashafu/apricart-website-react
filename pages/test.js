import SingleProduct from "../components/Layout/components/Products/SingleProduct"

export default function Test(){
    let json= {
        "id": 10216,
        "sku": "APRA-BG39-02",
        "title": "Glaxose D - 100gm",
        "description": "Glaxose D - 100gm",
        "brand": "Glaxose-D",
        "barcode": "",
        "inStock": true,
        "qty": 8,
        "minQty": 1,
        "maxQty": 1000,
        "categoryIds": " 1172 | 1171 | 0",
        "categoryleafName": " Health Care Items | All Item Groups",
        "currentPrice": 60,
        "specialPrice": 0,
        "warehouseInfo": "2",
        "productImageUrl": "",
        "productImageUrlThumbnail": "",
        "updateDateTimeInventory": "2022-07-20T15:35:34.716538",
        "updateTime": null,
        "instant": false,
        "favourite": false
    }

    return(
        <div className="grid grid-cols-4 gap-8">
            <SingleProduct
                product={json}
            />
            <SingleProduct
                product={json}
            />
            <SingleProduct
                product={json}
            />
            <SingleProduct
                product={json}
            />
        </div>
    )
}