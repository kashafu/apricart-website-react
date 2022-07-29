import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
// import MapPicker from 'react-google-map-picker'
import { base_url_api } from '../information.json'
import { getGeneralApiParams } from "../helpers/ApiHelpers";
import SelectAddress from '../components/Layout/components/Address/SelectAddress'
import HeadTag from "../components/Layout/components/Head/HeadTag";
import { useEffect } from "react";

export default function Address() {
	const router = useRouter()
	let { token } = getGeneralApiParams()

	useEffect(() => {
		if(!token){
			router.push('/login')
		}
	}, [])

	return (
		<>
			<HeadTag title={'Address'} />
			<section className="popular_sec">
				<div className="container">
					<div className="row">
						<div className="col-12 col-sm-12  col-md-12  col-lg-12  col-xl-12  col-xxl-12">
							<div className="tab">
								<Link href="/order" passHref>
									<button className="tablinks" id="defaultOpen">
										Orders
									</button>
								</Link>
								<Link href="/address" passHref>
									<button className="tablinks active">My Address</button>
								</Link>
								<Link href="/profile_user" passHref>
									<button className="tablinks">Account details</button>
								</Link>

							</div>
						</div>
						<div>
							<SelectAddress
								type={'manage'}
							/>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}