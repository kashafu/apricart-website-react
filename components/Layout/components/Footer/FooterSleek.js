import React from "react";
import Logo from "../Logo/Logo";
import phoneIcon from "../../../../public/assets/svgs/phoneIcon.svg";
import globeIcon from "../../../../public/assets/svgs/globeIcon.svg";
import addressIcon from "../../../../public/assets/svgs/addressIcon.svg";
import playstoreImg from "../../../../public/assets/images/playstore-img.png";
import appstoreImg from "../../../../public/assets/images/appstore-img.png";
import cartOnly from "../../../../public/assets/images/cartonly.png";

import Image from "next/image";
import Link from "next/link";

const FooterSleek = () => {
	return (
		<footer className="flex-col sm:flex-row flex w-full divide-x-8">
			{/* Main Heading Sextion */}
			<section className="py-2 w-full sm:w-1/2 ">
				<section className="mb-2">
					<div className="md:w-full px-3 text-center text-main-blue font-nunito">
						<div>
							<Link passHref href={"/"}>
								<h2 className="cursor-pointer hover:brightness-[5] font-nunito duration-300 text-2xl">
									About Us
								</h2>
							</Link>
						</div>

						<div className="flex flex-col sm:flex-row justify-center items-center mt-2 md:mt-0">
							<Link passHref href={"/privacy-policy"}>
								<p className="cursor-pointer hover:brightness-[5] font-nunito text-base md:text-lg duration-300 px-3">
									Privacy Policy
								</p>
							</Link>
							<p className="hidden sm:block">|</p>
							<Link passHref href={"/terms-of-use"}>
								<p className="cursor-pointer hover:brightness-[5] font-nunito text-[15px] md:text-lg duration-300 px-3">
									Terms of Use
								</p>
							</Link>
							<p className="hidden sm:block">|</p>
							<Link passHref href={"/faqs"}>
								<p className="cursor-pointer hover:brightness-[5] font-nunito text-base md:text-lg duration-300 px-3">
									FAQs
								</p>
							</Link>
							<p className="hidden sm:block">|</p>
							<Link passHref href={"/page-contact"}>
								<p className="cursor-pointer hover:brightness-[5] font-nunito text-base md:text-lg duration-300 px-3">
									Contact Us
								</p>
							</Link>
						</div>
					</div>
				</section>
				{/* Download App secton */}
				<section>
					<div>
						<h2 className="text-2xl text-main-blue text-center sm:text-2xl font-nunito">
							Install Our App
						</h2>
						<div className="flex justify-center items-center">
							<div className="px-2">
								<Link
									href={
										"https://play.google.com/store/apps/details?id=com.assorttech.airoso_app&hl=en&gl=US"
									}
									passHref
								>
									<div className="w-[120px] h-[40px] md:w-[145px] md:h-[45px] my-1 relative cursor-pointer">
										<Image
											src={playstoreImg}
											layout="fill"
											className="hover:brightness-150"
											alt=""
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
									<div className="w-[120px] h-[40px] md:w-[145px] md:h-[45px] my-1 relative cursor-pointer">
										<Image
											src={appstoreImg}
											layout="fill"
											className="hover:brightness-150"
											alt=""
										/>
									</div>
								</Link>
							</div>
						</div>
					</div>
				</section>
				{/* Socials Section */}
				<section>
					<div className="flex justify-center items-center w-full">
						<Link
							passHref
							href={"https://www.facebook.com/apricartonlinegrocery/"}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 448 512"
								className="w-8 mx-2  fill-[#4267B2] cursor-pointer hover:brightness-[2] duration-300"
							>
								<path d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z" />
							</svg>
						</Link>
						<Link passHref href={"https://twitter.com/apricartpk?lang=en    /"}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 448 512"
								className="w-8 mx-2 fill-[#00acee] cursor-pointer hover:brightness-[2] duration-300"
							>
								<path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-48.9 158.8c.2 2.8.2 5.7.2 8.5 0 86.7-66 186.6-186.6 186.6-37.2 0-71.7-10.8-100.7-29.4 5.3.6 10.4.8 15.8.8 30.7 0 58.9-10.4 81.4-28-28.8-.6-53-19.5-61.3-45.5 10.1 1.5 19.2 1.5 29.6-1.2-30-6.1-52.5-32.5-52.5-64.4v-.8c8.7 4.9 18.9 7.9 29.6 8.3a65.447 65.447 0 0 1-29.2-54.6c0-12.2 3.2-23.4 8.9-33.1 32.3 39.8 80.8 65.8 135.2 68.6-9.3-44.5 24-80.6 64-80.6 18.9 0 35.9 7.9 47.9 20.7 14.8-2.8 29-8.3 41.6-15.8-4.9 15.2-15.2 28-28.8 36.1 13.2-1.4 26-5.1 37.8-10.2-8.9 13.1-20.1 24.7-32.9 34z" />
							</svg>
						</Link>
						<Link
							passHref
							href={"https://pk.linkedin.com/company/apricartestores/"}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 448 512"
								className="w-8 mx-2 fill-[#0072b1] cursor-pointer hover:brightness-[2] duration-300"
							>
								<path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
							</svg>
						</Link>
						<Link
							passHref
							href={"https://www.instagram.com/apricart.pk/?hl=en/"}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 448 512"
								className="w-8 mx-2 fill-[#C13584] cursor-pointer hover:brightness-[2] duration-300"
							>
								<path d="M224,202.66A53.34,53.34,0,1,0,277.36,256,53.38,53.38,0,0,0,224,202.66Zm124.71-41a54,54,0,0,0-30.41-30.41c-21-8.29-71-6.43-94.3-6.43s-73.25-1.93-94.31,6.43a54,54,0,0,0-30.41,30.41c-8.28,21-6.43,71.05-6.43,94.33S91,329.26,99.32,350.33a54,54,0,0,0,30.41,30.41c21,8.29,71,6.43,94.31,6.43s73.24,1.93,94.3-6.43a54,54,0,0,0,30.41-30.41c8.35-21,6.43-71.05,6.43-94.33S357.1,182.74,348.75,161.67ZM224,338a82,82,0,1,1,82-82A81.9,81.9,0,0,1,224,338Zm85.38-148.3a19.14,19.14,0,1,1,19.13-19.14A19.1,19.1,0,0,1,309.42,189.74ZM400,32H48A48,48,0,0,0,0,80V432a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V80A48,48,0,0,0,400,32ZM382.88,322c-1.29,25.63-7.14,48.34-25.85,67s-41.4,24.63-67,25.85c-26.41,1.49-105.59,1.49-132,0-25.63-1.29-48.26-7.15-67-25.85s-24.63-41.42-25.85-67c-1.49-26.42-1.49-105.61,0-132,1.29-25.63,7.07-48.34,25.85-67s41.47-24.56,67-25.78c26.41-1.49,105.59-1.49,132,0,25.63,1.29,48.33,7.15,67,25.85s24.63,41.42,25.85,67.05C384.37,216.44,384.37,295.56,382.88,322Z" />
							</svg>
						</Link>
					</div>
				</section>
			</section>

			{/* Address Section */}
			<section className="w-full sm:w-1/2">
				<div className="w-full pt-1 sm:w-full flex flex-col items-center md:px-4">
					<div className="px-2 inline-flex">
						<div className="hidden md:inline-flex">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 384 512"
								className="w-5 fill-main-blue"
							>
								<path d="M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 256C227.3 256 256 227.3 256 192C256 156.7 227.3 128 192 128C156.7 128 128 156.7 128 192C128 227.3 156.7 256 192 256z" />
							</svg>
						</div>
						<h4 className="py-1  px-2 text-main-blue font-nunito sm:text-lg text-center text-base">
							<strong className="font-nunito">Address: </strong>Office No 106,
							Emarah Suites, <br />
							Main Shahrah-e-Faisal, Sindhi Muslim <br /> Co-operative Housing
							Society, Karachi
						</h4>
					</div>
					<div className=" px-2 inline-flex">
						<div className="hidden md:inline-flex">
							<Image src={phoneIcon} width={22} height={22} alt="" />
						</div>
						<h4 className="py-1  px-2 text-main-blue font-nunito sm:text-lg text-center text-base">
							<strong className="font-nunito">Phone: </strong>0304-1110195
						</h4>
					</div>

					<div className="px-2 inline-flex">
						<div className="hidden md:inline-flex">
							<Image src={globeIcon} width={25} height={25} alt="" />
						</div>
						<h4 className="py-1 px-2 text-main-blue font-nunito sm:text-lg text-center text-base">
							<strong className="font-nunito">Email: </strong>
							support@apricart.pk
						</h4>
					</div>
				</div>
			</section>
		</footer>
	);
};

export default FooterSleek;
