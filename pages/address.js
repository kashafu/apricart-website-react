import React, { useState, useEffect } from "react";
import Link from "next/link";
import AddressBtn from "../components/Layout/components/Account/Test";
import AddressBtn1 from "../components/Layout/components/Auth/Test";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";
import axios from "axios";
// import MapPicker from 'react-google-map-picker'
import { base_url_api } from '../information.json'
import { getGeneralApiParams } from "../helpers/ApiHelpers";
import AddressCard from "../components/Layout/components/Address/AddressCard";

const address = () => {
	const cookies = new Cookies();
	const router = useRouter();

	let token = cookies.get("cookies-token");
	if (!token) {
		return <h5 className='login-token'>Please Login First</h5>
	}
	const [show, setShow] = useState(false);
	const [save, setSave] = useState(false);

	const [savedAddresses, setSavedAddresses] = useState([]);
	const [deliveryAreaOptions, setDeliveryAreaOptions] = useState([]);
	const [cityOptions, setCityOptions] = useState([]);
	const [errorMessage, setErrorMessage] = useState('')

	const [newAddress, setNewAddress] = useState({
		name: "",
		address: "",
		phoneNumber: '',
		email: "",
		city: "",
		areaId: '158',
		mapLat: "24.881308",
		mapLong: "67.06022",
		// googleAddress: "karachi",
	})

	useEffect(() => {
		getSavedAddressesApi()
		getCityAreasOptionsApi()
	}, []);

	const getSavedAddressesApi = async () => {
		let { headers } = getGeneralApiParams()
		let url = base_url_api + '/home/address/delivery?lang=en&client_type=apricart'
		
		const response = await axios.get(
			url,
			{
				headers: headers
			}
		);
		setSavedAddresses(response.data.data);
	};

	const getDeliveryAreasOptionsApi = async (id) => {
		let { headers } = getGeneralApiParams()
		let url = base_url_api + '/home/address/areas?cityid=' + id + '&lang=en&client_type=apricart'

		const response = await axios.get(
			url,
			{
				headers: headers
			}
		);
		setDeliveryAreaOptions(response.data.data)
	}

	const getCityAreasOptionsApi = async () => {
		let { headers } = getGeneralApiParams()
		let url = base_url_api + '/home/address/cities?lang=en&client_type=apricart'

		const response = await axios.get(
			url,
			{
				headers: headers
			}
		);

		setCityOptions(response.data.data)
	}

	const addAddressApi = async (e) => {
		e.preventDefault();
		try {
			let { headers } = getGeneralApiParams()
			let url = base_url_api + '/home/address/delivery/save?client_type=apricart'
			const response = await axios.post(
				url, newAddress, 
				{
					headers: headers
				}
			);
			alert(response.data.message)
			setErrorMessage('')
		} catch (err) {
			setErrorMessage(err.response.data.message)
		}
	};

	const handleAreaSave = (e) => {
		const { name, value } = e.target;
		setNewAddress({ ...newAddress, [name]: value });
	}

	let addressID = cookies.get('address-id')
	////------------Save New Address API END------------///


	//----------Post Area API------------------///
	const [postArea, setPostArea] = useState({
		id: addressID,
		name: "",
		phoneNumber: '',
		email: "",
		mapLat: "24.881308",
		mapLong: "67.06022",
		address: "",
		googleAddress: "karachi",
		areaId: '',
	})
	const handleArea = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				`https://staging.apricart.pk/v1/home/address/delivery/update`, postArea, {
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + cookies.get('cookies-token'),
				}
			}
			);
			console.log("Checkout Data", response.data)
			alert(response.data.message)
		} catch (err) {
			console.log(err.data)
		}
		console.log("My area", postArea)

	};


	const handleChange = (e) => {
		const { name, value } = e.target;
		setPostArea({ ...postArea, [name]: value });
	};

	const logout = () => {
		cookies.remove("cookies-token");
		localStorage.clear();
		router.push("/");
	};

	return (
		<>
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
								<Link href="/account_Detail" passHref>
									<button className="tablinks">Account details</button>
								</Link>
								<button onClick={logout} className="tablinks">
									Logout
								</button>
							</div>
							<div id="London" className="tabcontent">
								{/* <!-- Main content -->
                     <!-- /.card -->    */}

								{/* <!-- /.card -->
                     <!-- /.content --> */}
							</div>
							<div id="Paris" className="tabcontent">
								{/* <!-- Main content -->
                     <!-- /.card -->    */}

								<div className="container-fluid">
									<div className="row">
										<div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
											<div className="delivery_body_sec">
												<div className="card">
													<div className="card-header">
														<h3 className="card-title">Address</h3>
													</div>
													<button onClick={() => setSave(!save)}>Add Address</button>
													{/* <!-- /.card-header --> */}
													{savedAddresses.map((tes) => {
														return (
															<div className="card-body">
																<div className="billing_add">

																	<>
																		<p>{tes.name}</p>
																		<p>{tes.googleAddress}</p>
																		<p>{tes.phoneNumber}</p>
																		<p>{tes.email}</p>
																		<p>{tes.city}</p>
																	</>

																</div>
																<div className="d_address">
																	<button className="address-btn" onClick={() => setShow(!show)}>
																		Edit
																	</button>

																</div>
															</div>
														);
													})}
												</div>

											</div>
										</div>


										{
											show ? <>
												<div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
													<div className="personal-f address-card1 ">
														<div className="form-group">
															<label htmlFor="exampleFormControlInput1">
																Name *
															</label>
															<input
																type='text'
																className="form-control"
																id="exampleFormControlInput1"
																placeholder=""
																name="name"
																onChange={(e) => handleChange(e)}
																required
															/>
														</div>

														<div className="form-group">
															<label htmlFor="exampleFormControlInput1">
																Address *
															</label>
															<input
																type="text"
																className="form-control"
																id="exampleFormControlInput1"
																placeholder=""
																name="address"
																onChange={(e) => handleChange(e)}
																required
															/>
														</div>

														<label htmlFor="exampleFormControlInput1">
															Phone No *
														</label>
														<div className="input-group mb-3">
															<input
																type="text"
																className="form-control"
																id="exampleFormControlInput1"
																name="phoneNumber"
																placeholder="123-45-678"
																pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
																onChange={(e) => handleChange(e)}
																required
															/>
														</div>

														<div className="form-group">
															<label htmlFor="exampleFormControlInput1">
																Email Address *
															</label>
															<input
																type="text"
																className="form-control"
																id="exampleFormControlInput1"
																placeholder=""
																name="email"
																onChange={(e) => handleChange(e)}
																required
															/>
														</div>
														<div className="selectedBox">
															<select name="areaId">
																{
																	cityOptions.map((area) => {
																		return (
																			<option value={area.id}>{area.city}</option>

																		)
																	})
																}
															</select>
														</div>
														<div className="selectedBox">

															<select id="area">
																{deliveryAreaOptions.map((area) => {
																	return (
																		<>
																			<option value={area.areaId}>{area.town}</option>
																		</>
																	)
																})}
															</select>
														</div>
														<div className="w-[300px] h-[300px]">
															<MapPicker
																// defaultLocation={defaultLocation}
																// zoom={zoom}
																mapTypeId="roadmap"
																style={{
																	height: "300px",
																	borderRadius: 10,
																	boxShadow: "0 0 0 1px rgb(0 0 0 / 20%)"
																}}
																// onChangeLocation={handleChangeLocation}
																// onChangeZoom={handleChangeZoom}
																apiKey="AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8"
															/>
														</div>
														<div className="form-group">
															<button onClick={handleArea}>Submit</button>
														</div>
													</div>
												</div>
											</> : null
										}

										{
											save ? <>
												<div className="min-w-full">
													<AddressCard
														type={'add'}
													/>
												</div>
											</> : null
										}
									</div>
								</div>
							</div>

						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default address;
