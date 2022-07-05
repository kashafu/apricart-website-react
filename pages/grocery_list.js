import { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import { getGeneralApiParams } from '../helpers/ApiHelpers'

export default function GroceryList(){
	let { token, userId, city } = getGeneralApiParams()

	const [userData, setUserData] = useState({
		city: city,
		userid: userId,
		address: 5828,
		notes: "test order",
		coupon: "",
		files: "[]",
		storeid: 1,
		payment: "cash",
	});

	const handleOrder = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				`https://staging.apricart.pk/v1/order/checkout/manual`,
				userData,
				{
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
						Authorization: "Bearer " + cookies.get("cookies-token"),
					},
				}
			);
			console.log("Checkout Data", response.data);
			alert(response.data.message);
		} catch (err) {
			const Error = err.response.data;
		}
	};
	console.log("My Data", userData);

	if (!token) {
		return <h5 className="login-token">Please Login First</h5>;
	}

	return (
		<>
			<section className="grocery_sec">
				<div className="container-fluid">
					<div className="row">
						<div className="col-12 col-sm-12  col-md-12  col-lg-12  col-xl-12  col-xxl-12">
							<div className="grocery_upload">
								<h2>Type Or Upload Your Grocery List</h2>
								<h3>Disclaimer: Delivery only in Karachi and Peshawar</h3>
								<p>
									For online payments, a payment link is shared with you once
									your order has been <br /> Purchased.
								</p>
								<p className="happy_shop">Happy Shopping!</p>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="grocery_sec2">
				<div className="container-fluid">
					<div className="row">
						<div className="col-12 col-sm-12  col-md-8  col-lg-8  col-xl-8  col-xxl-8 d-block m-auto">
							<div className="row">
								<div className="col-12 col-sm-12  col-md-6  col-lg-6  col-xl-6  col-xxl-6">
									<div className="selectadd">
										<div className="mb-3">
											<label
												htmlFor="exampleFormControlInput1"
												className="form-label text-center"
											>
												Select Address
											</label>
											<select
												className="form-select"
												aria-label="Default select example"
											>
												<option selected>Open this select menu</option>
												<option value="1">One</option>
												<option value="2">Two</option>
												<option value="3">Three</option>
											</select>
										</div>
										<div className="mb-3">
											<label
												htmlFor="exampleFormControlInput1"
												className="form-label"
											>
												Coupon(If available)
											</label>
											<input
												type="email"
												className="form-control"
												id="exampleFormControlInput1"
												placeholder="coupon"
											/>
										</div>
										<div className="mb-3">
											<label
												htmlFor="exampleFormControlInput1"
												className="form-label text-center"
											>
												Select payment
											</label>
											<select
												className="form-select"
												aria-label="Default select example"
											>
												<option selected>Open this select menu</option>
												<option value="1">
													Cash On Delivery ~ Cash On Delivery
												</option>
												<option value="2">Two</option>
												<option value="3">Three</option>
											</select>
										</div>
									</div>
								</div>
								<div className="col-12 col-sm-12  col-md-6  col-lg-6  col-xl-6  col-xxl-6"></div>
							</div>
							<div className="textarea_ma">
								<div className="mb-3">
									<textarea
										className="form-control"
										id="exampleFormControlTextarea1"
										rows="3"
										placeholder="Type-in or paste your grocery items here."
									></textarea>
								</div>
							</div>

							<div className="col-8">
								<div className="form-group">
									<button onClick={handleOrder}>Submit</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}