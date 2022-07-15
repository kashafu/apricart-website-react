import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import {
	incrementQuantity,
	decrementQuantity,
	removeFromCart,
} from "../redux/cart.slice";
import { base_url_api } from '../information.json'
import axios from 'axios'
import Cookies from 'universal-cookie';
import { getGeneralApiParams } from "../helpers/ApiHelpers";
import HeadTag from "../components/Layout/components/Head/HeadTag";

export default function ProfileUser() {
	const cookies = new Cookies();
	const router = useRouter();
	let { token } = getGeneralApiParams()

	const [profile, setProfile] = useState([]);

	useEffect(() => {
		getProfile();
	}, [])

	const getProfile = async () => {
		const config = {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + cookies.get('cookies-token'),
			}
		}
		let url = base_url_api + '/home/profile?client_type=apricart'
		const response = await axios.get(
			url, config
		);
		setProfile(response.data.data);
		let profileData = response.data
		profile = profileData;

	}

	if (!token) {
		const d = new Date();
		cookies.get('guestUserId', 'desktopuser_' + d.getTime(), 30);
		return (
			<>
				<HeadTag title={'Profile'} />
				<h5 className='login-token'>Please Login first</h5>
			</>
		)
	}

	return (
		<>
			<HeadTag title={'Profile'} />
			<section className="profile_sec">
				<div className="container">
					<div className="row">
						<div className="col-12 col-sm-12 col-md-1 col-lg-1 col-xl-1 col-xxl-1">
						</div>
						<div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
							<div className="personal_details" id="myDIV" >
								<div className="personal_info">
									<button href="#" className="btn active">Personal Information</button>
								</div>
								<div className="change_password">
									<Link href="/forgot_password" passHref>
										<button href="#" className="btn">Change Password</button>
									</Link>
								</div>

							</div>
						</div>
						<div className="col-12 col-sm-12 col-md-1 col-lg-1 col-xl-1 col-xxl-1">
						</div>
						<div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
							<div className="personal_form">

							</div>
							<div className="cont_shop_sec1">
								<div className="row center">
									<div className="col-12 col-sm-12 col-md-1 col-lg-1 col-xl-1 col-xxl-1">
									</div>
									<div className="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 col-xxl-10">

										<div className="personal-f">

											<div className="form-group">
												<label htmlFor="exampleFormControlInput1">Name *</label>
												<input type="readonly" className="form-control" id="exampleFormControlInput1" placeholder="" value={cookies.get('cookies-name')} required />
											</div>
											<label htmlFor="exampleFormControlInput1">Phone No *</label>

											<div className="input-group mb-3">

												<span className="input-group-text" id="inputGroup-sizing-sm">+92</span>
												<input type="readonly" className="form-control" id="exampleFormControlInput1" value={cookies.get('cookies-phoneNumber')} name="phone" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
											</div>

											<div className="form-group">
												<label htmlFor="exampleFormControlInput1">Email Address *</label>
												<input type="readonly" className="form-control" id="exampleFormControlInput1" value={cookies.get('cookies-email')} placeholder="" required />
											</div>


											<div className="form-group">
												<Link href='/account_Detail'>
													<button>Profile Details</button>
												</Link>
											</div>
										</div>

									</div>
									<div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 col-xxl-1">
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

			</section>
		</>
	)
}