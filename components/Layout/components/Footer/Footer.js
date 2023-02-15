import Image from "next/image"
import Link from "next/link"
import { useSelector } from "react-redux"

import phoneIcon from "../../../../public/assets/svgs/phoneIcon.svg"
import globeIcon from "../../../../public/assets/svgs/globeIcon.svg"
import playstoreIcon from "../../../../public/assets/svgs/googlePlayLogo.svg"
import appstoreIcon from "../../../../public/assets/svgs/appStoreLogo.svg"
import meezanIcon from "../../../../public/assets/images/meezan-icon.png"
import visaIcon from "../../../../public/assets/images/visa-icon.png"
import masterIcon from "../../../../public/assets/images/mastercard-icon.png"
import codIcon from "../../../../public/assets/images/cod-icon.png"
import zindigiLogo from "../../../../public/assets/images/zindigiLogo.png"
import instagramLogo from "../../../../public/assets/svgs/instagramIcon.svg"
import facebookLogo from "../../../../public/assets/svgs/facebookIcon.svg"
import linkedinLogo from "../../../../public/assets/svgs/linkedinIcon.svg"
import twitterLogo from "../../../../public/assets/svgs/twitterIcon.svg"

const Footer = () => {
	const redirectSourceSelector = useSelector(
		(state) => state.general.redirectSource
	)

	return (
		<>
			{/* Large display sizes */}
			<footer className="hidden sm:flex flex-col bg-main-grey-1000 pt-5 pb-12">
				<section className="flex justify-between w-full ">
					<section className="w-1/3 flex flex-col">
						<div className="pl-4 pb-4">
							<p className=" text-white font-bold">
								Contact Details
							</p>
						</div>
						<div className="px-2 inline-flex mb-2">
							<p className=" px-2 text-main-grey-500 font-lato text-sm">
								<strong>Address: </strong>Office No 106, Emarah
								Suites, Main Shahrah-e-Faisal, Sindhi Muslim
								Co-operative Housing Society, Karachi
							</p>
						</div>
					</section>
					{/* Divider Cart */}
					<section className="w-1/3 grid grid-cols-4 text-left">
						<div className="col-span-1" />
						<div className="col-span-3">
							<div className="mb-2 ">
								<p className="text-main-grey-500 font-lato text-sm">
									<strong className="text-white">
										Phone:{" "}
									</strong>
									0304-1110195
								</p>
							</div>
							<div className=" mb-4">
								<p className="text-main-grey-500 font-lato text-sm">
									<strong className="text-white">
										Email:{" "}
									</strong>
									support@apricart.pk
								</p>
							</div>
						</div>
						<div className="col-span-1" />
					</section>
					{/* About*/}
					<section className="w-1/3 flex flex-col justify-center items-center text-left">
						<div>
							<p className="text-white font-bold">Quick Links</p>
						</div>
						<div className="flex flex-col text-main-grey-500 mt-4">
							<Link passHref href={"/about-us"}>
								<p className="cursor-pointer hover:brightness-[5] font-lato text-sm duration-300">
									About Us
								</p>
							</Link>
							<Link passHref href={"/privacy-policy"}>
								<p className="cursor-pointer hover:brightness-[5] font-lato text-sm duration-300">
									Privacy Policy
								</p>
							</Link>
							<Link passHref href={"/terms-of-use"}>
								<p className="cursor-pointer hover:brightness-[5] font-lato text-sm duration-300">
									Terms of Use
								</p>
							</Link>
							<Link passHref href={"/faqs"}>
								<p className="cursor-pointer hover:brightness-[5] font-lato text-sm duration-300">
									FAQs
								</p>
							</Link>
							<Link passHref href={"/page-contact"}>
								<p className="cursor-pointer hover:brightness-[5] font-lato text-sm duration-300">
									Contact Us
								</p>
							</Link>
						</div>
					</section>
				</section>
				{/* Bank and Download App  */}
				<section className="flex pt-2 justify-center items-center">
					{/*  SOCIALS mobile*/}
					<section className="w-1/3">
						<div className="flex justify-evenly items-center w-full">
							<a
								href="https://www.facebook.com/apricartonlinegrocery/"
								target={"_blank"}
								rel="noreferrer"
							>
								<Image
									src={facebookLogo}
									alt="Facebook Logo"
									width={30}
								/>
							</a>
							<a
								href="https://twitter.com/apricartpk?lang=en/"
								target={"_blank"}
								rel="noreferrer"
							>
								<Image
									src={twitterLogo}
									alt="Twitter Logo"
									width={30}
								/>
							</a>
							<a
								href="https://pk.linkedin.com/company/apricartestores/"
								target={"_blank"}
								rel="noreferrer"
							>
								<Image
									src={linkedinLogo}
									alt="LinkedIn Logo"
									width={30}
								/>
							</a>
							<a
								href="https://www.instagram.com/apricart.pk/?hl=en/"
								target={"_blank"}
								rel="noreferrer"
							>
								<Image
									src={instagramLogo}
									alt="Instagram Logo"
									width={30}
								/>
							</a>
						</div>
					</section>
					{/* Bangks */}
					<section className="flex justify-center items-center w-1/3 px-2">
						{redirectSourceSelector === "js_bank" ? (
							<>
								<Link passHref href={""}>
									<Image
										src={zindigiLogo}
										alt={"zindigi Logo"}
										width={"101px"}
										height={"30px"}
									/>
								</Link>
							</>
						) : (
							<>
								<Link passHref href={""}>
									<Image
										src={meezanIcon}
										alt={"Meezan Icon"}
										width={"101px"}
										height={"30px"}
									/>
								</Link>
								<Link passHref href={""}>
									<Image
										src={visaIcon}
										alt={"Visa Icon"}
										width={"100px"}
										height={"50px"}
									/>
								</Link>
								<Link passHref href={""} className="">
									<Image
										src={masterIcon}
										alt={"Visa Icon"}
										width={"100px"}
										height={"50px"}
									/>
								</Link>
								<Link passHref href={""}>
									<Image
										src={codIcon}
										alt={"Visa Icon"}
										width={"60px"}
										height={"30px"}
									/>
								</Link>
							</>
						)}
					</section>
					{/* DOwnload ABB mobile*/}
					<section className="w-1/3">
						<div>
							<div className="flex justify-center items-center">
								<div className="px-2">
									<Link
										href={
											"https://play.google.com/store/apps/details?id=com.assorttech.airoso_app&hl=en&gl=US"
										}
										passHref
									>
										<div className="w-[100px] h-[30px] relative cursor-pointer">
											<Image
												src={playstoreIcon}
												layout="fill"
												className="hover:brightness-150"
												alt="playStoreImg"
											/>
										</div>
									</Link>
								</div>
								<div className="px-2">
									<Link
										href={
											"https://apps.apple.com/us/app/apricart/id1562353936?platform=iphone"
										}
										passHref
									>
										<div className="w-[100px] h-[30px] relative cursor-pointer">
											<Image
												src={appstoreIcon}
												layout="fill"
												className="hover:brightness-150"
												alt="appStoreImg"
											/>
										</div>
									</Link>
								</div>
							</div>
						</div>
					</section>
				</section>
			</footer>

			{/* Phone  */}
			<footer className="flex flex-col sm:hidden bg-main-grey-1000 py-5">
				<section className="flex flex-col sm:flex-row justify-between w-full ">
					<section className=" flex flex-col ">
						<div className="pl-4 pb-4">
							<p className=" text-white font-bold">
								Contact Details
							</p>
						</div>
						<div className="px-2 inline-flex mb-2">
							<div className="hidden md:inline-flex">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 384 512"
									className="w-5 fill-main-blue"
								>
									<path d="M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 256C227.3 256 256 227.3 256 192C256 156.7 227.3 128 192 128C156.7 128 128 156.7 128 192C128 227.3 156.7 256 192 256z" />
								</svg>
							</div>
							<p className=" px-2 text-main-grey-500 font-lato sm:text-xl text-sm">
								<strong className="text-white">
									Address:{" "}
								</strong>
								Office No 601, Emarah Suites, Main
								Shahrah-e-Faisal, Sindhi Muslim Co-operative
								Housing Society, Karachi
							</p>
						</div>
						<div className=" px-2 inline-flex mb-2">
							<div className="hidden md:inline-flex">
								<Image
									src={phoneIcon}
									width={22}
									height={22}
									alt=""
								/>
							</div>
							<p className=" px-2 text-main-grey-500 font-lato sm:text-xl text-sm">
								<strong className="text-white">Phone: </strong>
								0304-1110195
							</p>
						</div>

						<div className="px-2 inline-flex mb-4">
							<div className="hidden md:inline-flex">
								<Image
									src={globeIcon}
									width={25}
									height={25}
									alt=""
								/>
							</div>
							<p className="px-2 text-main-grey-500 font-lato sm:text-xl text-sm">
								<strong className="text-white">Email: </strong>
								support@apricart.pk
							</p>
						</div>
					</section>
					{/* Divider Cart */}
					<section className="flex divide-x-2 divide-x-black">
						{/* About Us Mobile */}
						<div className="w-1/2 text-left sm:hidden px-3 flex flex-col text-main-grey-500 font-lato">
							<div>
								<p className=" text-white font-bold">
									Quick Links
								</p>
							</div>
							<div className="flex flex-col mt-2 md:mt-0">
								<Link passHref href={"/"}>
									<p className="cursor-pointer hover:brightness-[5] font-lato text-sm sm:text-lg py-1 md:text-xl duration-300">
										About Us
									</p>
								</Link>
								<Link passHref href={"/privacy-policy"}>
									<p className="cursor-pointer hover:brightness-[5] font-lato text-sm sm:text-lg py-1 md:text-xl duration-300">
										Privacy Policy
									</p>
								</Link>
								<Link passHref href={"/terms-of-use"}>
									<p className="cursor-pointer hover:brightness-[5] font-lato text-sm sm:text-lg py-1 md:text-xl duration-300">
										Terms of Use
									</p>
								</Link>
								<Link passHref href={"/faqs"}>
									<p className="cursor-pointer hover:brightness-[5] font-lato text-sm sm:text-lg py-1 md:text-xl duration-300">
										FAQs
									</p>
								</Link>
								<Link passHref href={"/page-contact"}>
									<p className="cursor-pointer hover:brightness-[5] font-lato text-sm sm:text-lg py-1 md:text-xl duration-300">
										Contact Us
									</p>
								</Link>
							</div>
						</div>
					</section>
					{/* About*/}
				</section>

				<div className="grid grid-cols-2 grid-rows-2">
					{/*  SOCIALS*/}
					<div className="flex justify-center space-x-2 items-center">
						<a
							href="https://www.facebook.com/apricartonlinegrocery/"
							target={"_blank"}
							rel="noreferrer"
						>
							<Image
								src={facebookLogo}
								alt="Facebook Logo"
								width={30}
							/>
						</a>
						<a
							href="https://twitter.com/apricartpk?lang=en/"
							target={"_blank"}
							rel="noreferrer"
						>
							<Image
								src={twitterLogo}
								alt="Twitter Logo"
								width={30}
							/>
						</a>
						<a
							href="https://pk.linkedin.com/company/apricartestores/"
							target={"_blank"}
							rel="noreferrer"
						>
							<Image
								src={linkedinLogo}
								alt="LinkedIn Logo"
								width={30}
							/>
						</a>
						<a
							href="https://www.instagram.com/apricart.pk/?hl=en/"
							target={"_blank"}
							rel="noreferrer"
						>
							<Image
								src={instagramLogo}
								alt="Instagram Logo"
								width={30}
							/>
						</a>
					</div>
					{/* DOWNLOADS*/}
					<div className="flex justify-center items-center">
						<a
							href="https://play.google.com/store/apps/details?id=com.assorttech.airoso_app&hl=en&gl=US"
							target="_blank"
							rel="noreferrer"
						>
							<Image
								src={playstoreIcon}
								className="hover:brightness-150"
								alt=""
							/>
						</a>
						<a
							href="https://apps.apple.com/us/app/apricart/id1562353936?platform=iphone"
							target="_blank"
							rel="noreferrer"
						>
							<Image
								src={appstoreIcon}
								className="hover:brightness-150"
								alt=""
							/>
						</a>
					</div>
					{/* BANKS */}
					<div className="col-span-2 flex justify-center items-center w-full">
						{redirectSourceSelector === "js_bank" ? (
							<Image
								src={zindigiLogo}
								alt={"zindigi Logo"}
								width={"101px"}
								height={"30px"}
							/>
						) : (
							<div className="col-span-2 justify-center items-center w-full grid grid-cols-4 px-4">
								<Image
									src={meezanIcon}
									alt={"Meezan Icon"}
								/>
								<Image
									src={visaIcon}
									alt={"Visa Icon"}
								/>
								<Image
									src={masterIcon}
									alt={"Visa Icon"}
								/>

								<Image
									src={codIcon}
									alt={"Visa Icon"}
								/>
							</div>
						)}
					</div>
				</div>
			</footer>
		</>
	)
}

export default Footer
