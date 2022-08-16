import { useState, useEffect } from "react";
import Link from "next/link";
import { base_url_api } from '../information.json'
import axios from 'axios'
import { getCookie } from "../helpers/Cookies";
import { getGeneralApiParams, logOutRemoveCookies } from "../helpers/ApiHelpers";
import TextField from "../components/Layout/components/Input/TextField"
import SubmitButton from "../components/Layout/components/Buttons/SubmitButton"
import PageHeading from "../components/Layout/components/Typography/PageHeading"
import { toast } from "react-toastify";
import HeadTag from "../components/Layout/components/Head/HeadTag";
import { useRouter } from "next/router";

export default function ProfileUser() {
	let { token, headers, userId } = getGeneralApiParams()
	const router = useRouter()
	const [name, setname] = useState("");
	const [email, setemail] = useState("");
	const [address, setaddress] = useState("");

	const [profile, setProfile] = useState([]);
	const [updateshow, setupdateshow] = useState(true);

	useEffect(() => {
		getProfile();
	}, [])

	const logout = () => {
		logOutRemoveCookies()
		router.push("/")
	}

	const updateprofile = async () => {
		const url = base_url_api + "/home/profile/save?client_type=apricart&userid=" + userId
		let body = {
			"name": name,
			"email": email,

			"address": address
		}
		try {
			let response = await axios.post(url, body,
				{
					headers: headers
				}
			)
			if (response.data.status == 1) {
				setupdateshow(true);
				toast.success(response.data.message);
				toast.success("Login again to see changes")
			}
			else {
				toast.error(response.data.message);
				toast.error("enter a phone number for otp request to reset password")
			}

		}
		catch (e) {
			console.log(e)
		}

	}




	const getProfile = async () => {
		const config = {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + getCookie('cookies-token'),
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
				{updateshow ? (
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
									<div>
										<SubmitButton
											bgColor={'bg-red-600'}
											text={"LOGOUT"}
											onClick={() => {
												logout()
											}}
										/>
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
													<input type="readonly" className="form-control" id="exampleFormControlInput1" placeholder="" value={getCookie('cookies-name')} required />
												</div>
												<label htmlFor="exampleFormControlInput1">Phone No *</label>

												<div className="input-group mb-3">

													<span className="input-group-text" id="inputGroup-sizing-sm">+92</span>
													<input type="readonly" className="form-control" id="exampleFormControlInput1" value={getCookie('cookies-phoneNumber')} name="phone" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
												</div>

												<div className="form-group">
													<label htmlFor="exampleFormControlInput1">Email Address *</label>
													<input type="readonly" className="form-control" id="exampleFormControlInput1" value={getCookie('cookies-email')} placeholder="" required />
												</div>


												<div className="form-group">
													<Link href='#'>
														<button onClick={() => { setupdateshow(false) }}>Update Profile Details</button>
														{/* /account_detail */}
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
				) : (
					<div className="flex justify-center w-full">
						<div className="flex flex-col w-full  justify-center items-center align-center sm:w-1/2  bg-slate-100 shadow rounded-3xl">

							<PageHeading
								text={"UPDATE PROFILE"}
							/>
							<div className="space-y-2">
								<TextField
									label={"Name"}
									placeHolder={""}
									onChange={setname}
									value={name}
									type={'string'}
								/>
								<TextField
									label={"Email"}
									placeHolder={"someone@example.com"}
									onChange={setemail}
									value={email}
									type={'string'}
								/>
								<TextField
									label={"Address"}
									placeHolder={"street address, block,city,country"}
									onChange={setaddress}
									value={address}
									type={'password'}
								/>

							</div>
							<div className="flex flex-col w-3/4 sm:w-1/3 my-2  space-y-2  justify-between align-center items-center">

								<SubmitButton
									className="p-4 h-[10px]"
									text={"UPDATE PROFILE"}
									onClick={updateprofile}
								/>

								<SubmitButton className="p-4" onClick={() => { setupdateshow(true) }} text={"Goback"} />
							</div>



						</div>

					</div>

				)}
			</section>


		</>
	)
}