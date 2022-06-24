import MainProducts from "../components/Layout/components/Products/MainProducts";
import SingleItem from "../components/Layout/components/Products/SingleProduct";
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
            {/* old */}
			<div className="row">
				<div className="col-12 col-sm-2  col-md-2  col-lg-3  col-xl-2  col-xxl-2">
					<Categories 
						categories={homeData.categories}
					/>
				</div>
				<div className="col-12 col-sm-12  col-md-10  col-lg-9  col-xl-10  col-xxl-10 parot">
					{/* <Slider /> */}
					<section className="min-h-[150px] sm:min-h-[170px] md:min-h-[300px] lg:min-h-[360px]">
						{/* <Slider2 /> */}
						<BannerSlider
							banners={homeData.banners}
						/>
					</section>
					<MainProducts
						products={homeData.products[0].data}
					/>
					<ScrollingProducts
						products={homeData.products[1].data}
					/>
					{/* <PopularItem />
					<RecommendedProducts />
					<MostSold /> */}
				</div>
			</div>
        </div>
    )
}