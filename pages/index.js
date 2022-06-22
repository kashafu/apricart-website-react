import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Categories from "../components/Layout/components/Categories/Categories";
import Slider from "../components/Layout/components/Slider/Slider";
import PopularItem from "../components/Layout/components/PopularItem/PopularItem";
import RecommendedProducts from "../components/Layout/components/RecommendedProducts/RecommendedProducts";
import MostSold from "../components/Layout/components/MostSold/MostSold";
import Slider2 from "../components/Layout/components/Slider/Slider";
import Cookies from 'universal-cookie';
//import Slider from "../components/Layout/components/Slider/Slider";



export default function Home() {
	const cookies = new Cookies();
	var token = cookies.get('cookies-token')
	if (!token) {
		const d = new Date();
		cookies.set('guestUserId', 'desktopuser_' + d.getTime(), 30);
	}
	return (
		<>
			<Head>Apricart</Head>
			<div className="row">
				<div className="col-12 col-sm-2  col-md-2  col-lg-3  col-xl-2  col-xxl-2">
					<Categories />
				</div>
				<div className="col-12 col-sm-12  col-md-10  col-lg-9  col-xl-10  col-xxl-10 parot">
					{/* <Slider /> */}
					<section className="min-h-[150px] sm:min-h-[170px] md:min-h-[300px] lg:min-h-[360px]">
						<Slider2 />
					</section>
					<PopularItem />
					<RecommendedProducts />
					<MostSold />
				</div>
			</div>
		</>
	);
}
