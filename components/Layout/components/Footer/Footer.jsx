import React from "react"
import Link from "next/link"
import Image from "next/image"
import Logo from "../Logo/Logo"
import phoneIcon from "../../../../public/assets/svgs/phoneIcon.svg"
import globeIcon from "../../../../public/assets/svgs/globeIcon.svg"
import addressIcon from "../../../../public/assets/svgs/addressIcon.svg"
import playstoreImg from "../../../../public/assets/images/playstore-img.png"
import appstoreImg from "../../../../public/assets/images/appstore-img.png"
import paymentMethodsIcon from '../../../../public/assets/svgs/paymentMethods.svg'
import { useEffect  } from "react"
import { useRouter } from 'next/router'
import ScrollToTop from "react-scroll-to-top";
export default function Layout() {
	const router =useRouter();
	useEffect(()=>{
	window.scrollTo(0, 0);});
	// 	const handleRouteChange = () => {
	// 		document.getElementById('top').scrollIntoView();
	//   }
	//   router.events.on('routeChangeComplete', handleRouteChange)
	//   }
	return (
		<div className="bg-gray-200 flex flex-col  text-indigo-900  p-8 w-full sm:flex-row sm:h-80">
			<div className="flex flex-col my-2.5 text-indigo-900 sm:justify-center sm:items-center sm:w-4/12">
				<div className="h-1/5 w-1/2 mb-11">
					<Logo />
				</div>
				<div className="inline-flex  h-1/4 my-2 px-2 sm:justify-between sm:items-center">
					<Image src={addressIcon} width={40} height={40} alt="" />
					<p className="pl-2">
						<span className="font-bold">Address:</span>
						<span>Office No 106,Emarah Suites, Main Shahrah-e-Faisal, Sindhi Muslim Co-operative Housing Society, Karachi{" "}</span>
					</p>
				</div>{" "}

				<div className="inline-flex h-1/4 my-2 px-2 sm:justify-center sm:items-center">
					<Image src={phoneIcon} width={30} height={30} alt="" />
					<p className="pl-2  sm:pt-0">
						<span className="font-bold">Phone:</span>
						<span className="highligh1">0304-1110195</span>
					</p>
				</div>
	
				<div className="inline-flex h-1/4 my-2 px-2 sm:justify-center sm:items-center">
					<Image src={globeIcon} width={40} height={40} alt="" />
					<p className="pl-2 sm:pt-0">
						<a href="mailto:support@apricart.pk">
							<span className="font-bold">Email:</span>
							support@apricart.pk
						</a>
					</p>
		
				</div>
			</div>
			{/* grid grid-cols-2 sm:flex sm:flex-col  */}
			<div className="flex flex-col my-4 sm:flex sm:flex-col border-y-2 border-indigo-200 sm:justify-between sm:items-center sm:border-x-2 sm:border-indigo-200 sm:border-y-0  sm:w-4/12">
			<Link href={"/"} passHref scroll={true}>
						<a className="font-bold p-1">About Us</a>
					</Link>
				{/* <a className=""></a> */}
				{/* grid grid-cols-2 gap-y-4 gap-x-6 */}
				{/*  sm:justify-between sm:items-center  sm:flex sm:flex-col */}
				<div className="flex flex-col py-4">
				<ScrollToTop smooth />
					<Link href={"/privacy-policy"} passHref onClick="">
						{/* window.location.reload() */}
						<a className="p-1">Privacy Policy</a>
					</Link>
					<Link href="/terms-of-use" passHref >
						<a className="p-1">Terms of Use</a>
					</Link>
					<Link href="/faqs" passHref >
						<a className="p-1">FAQs</a>
					</Link>
					<Link href="/page-contact" passHref >
						<a className="p-1">Contact Us</a>
					</Link>
				</div>
			</div>

			<div className="flex flex-col my-2.5 sm:justify-between sm:items-center sm:w-4/12">
				<div className="">
					<ul>
						<li className="flex sm:justify-center">
							<h3 className="font-bold">Install Our App</h3>
							<br />
						</li>
						<li className="inline-flex pr-4">
							<Link
								href={
									"https://play.google.com/store/apps/details?id=com.assorttech.airoso_app&hl=en&gl=US"
								}
								passHref
							>
								<a>
									<Image
										src={playstoreImg}
										width={120}
										height={40}
										alt=""
									/>
								</a>
							</Link>
						</li>
						<li className="inline-flex">
							<Link
								href={
									"https://apps.apple.com/us/app/apricart/id1562353936?platform=iphone"
								}
								passHref
							>
								<a>
									<Image
										src={appstoreImg}
										width={120}
										height={40}
										alt=""
									/>
								</a>
							</Link>
						</li>
					</ul>
				</div>
				<br />
				<p className="mb-2">Secured payment gateways</p>
				<Image
					src={paymentMethodsIcon}
					className="mb-3"
					alt=""
                    width={280}
                    height={80}
				/>

				<div className="inline-flex">
					<a
						className="mx-2"
						href="https://www.facebook.com/apricartonlinegrocery/"
					>
						<i className="fab fa-facebook"></i>
					</a>
					<a
						className="mx-2"
						href="https://twitter.com/apricartpk?lang=en"
					>
						<i className="fab fa-twitter"></i>
					</a>
					<a
						className="mx-2"
						href="https://pk.linkedin.com/company/apricartestores"
					>
						<i className="fab fa-linkedin"></i>
					</a>

					<a
						className="mx-2"
						href="https://www.instagram.com/apricart.pk/?hl=en"
					>
						<i className="fab fa-instagram"></i>
					</a>
				</div>
			</div>
		</div>
	)
}
