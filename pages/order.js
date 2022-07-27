import { useState, useEffect } from "react"
import Link from "next/link"
import axios from "axios"
import { getGeneralApiParams } from "../helpers/ApiHelpers"
import { base_url_api } from "../information.json"
import HeadTag from "../components/Layout/components/Head/HeadTag"
import { toast } from 'react-toastify'

export default function Order() {
	let { token } = getGeneralApiParams()

	const [pendingOrders, setPendingOrders] = useState([])
	const [completedOrders, setCompletedOrders] = useState([])
	const [cancelledOrders, setCancelledOrders] = useState([])

	const getOrderHistoryApi = async () => {
		let { headers } = getGeneralApiParams()
		let url = base_url_api + "/order/history?client_type=apricart"

		try {
			let response = await axios.get(url, {
				headers: headers,
			})

			setPendingOrders(response.data.data.pending)
			setCancelledOrders(response.data.data.cancelled)
			setCompletedOrders(response.data.data.completed)
		} catch (error) {
			console.log(error.response)
		}
	}

	useEffect(() => {
		getOrderHistoryApi()
	}, [])

	const cancelOrderApi = async (id) => {
		let { headers } = getGeneralApiParams()
		let url = base_url_api + '/order/checkout/cancel?client_type=apricart&id=' + id

		try {
			let response = await axios.get(url, {headers: headers})

			console.log(response.data)
			getOrderHistoryApi()
			toast.success(response.data.message)
		} catch (error) {
			toast.error(error?.response?.data?.message)
		}
	}

	if (!token) {
		return (
			<>
				<HeadTag title={"Order"} />
				<h5 className="login-token">Please Login first</h5>
			</>
		)
	}

	return (
		<>
			<HeadTag title={"Order"} />
			{/* <p>
				PENDING ORDERS
			</p>
			<table className="table-auto">
				<thead>
					<tr>
						<th>Order Id</th>
						<th>Date</th>
						<th>Address</th>
						<th>Amount</th>
						<th>Products</th>
						<th>Coupon</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{pendingOrders.map((userOrder) => {
						return (
							<>
								<tr key={userOrder.orderId} name="cancelid"
									value={userOrder.orderId}
									onChange={handleCancelOrder}>
									<td>{userOrder.displayOrderId}</td>
									<td>{userOrder.receivedAt}</td>
									<td>{userOrder.addressUsed}</td>
									<td>{userOrder.grandTotal}</td>
									<td>{userOrder.productCount}</td>
									<td>{userOrder.couponsUsed}</td>
									<td>{userOrder.status}</td>
									<td style={{ color: "red", cursor: "pointer" }} onClick={handleCancel}>cancel</td>
									<td></td>
								</tr>
							</>
						)
					})}
					<tr>
						<td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
						<td>Malcolm Lockyer</td>
						<td>1961</td>
					</tr>
				</tbody>
			</table> */}
			<section className="popular_sec">
				<div className="container">
					<div className="row">
						<div className="col-12 col-sm-12  col-md-12  col-lg-12  col-xl-12  col-xxl-12">
							<div className="tab">
								<Link href="/order" passHref>
									<button
										className="tablinks active"
										id="defaultOpen"
									>
										Orders
									</button>
								</Link>
								<Link href="/address" passHref>
									<button className="tablinks">
										My Address
									</button>
								</Link>
								<Link href="/account_detail" passHref>
									<button className="tablinks">
										Account details
									</button>
								</Link>
							</div>
							<div id="London" className="tabcontent">
								<div className="card">
									<div className="card-header">
										<h3 className="card-title">
											My Orders
										</h3>
									</div>
									<div className="card-body">
										<div className="container">
											<div>
												<table className="table table-striped mt32 customers-list">
													<thead>
														<tr>
															<th>Order Id</th>
															<th>Date</th>
															<th>Address</th>
															<th>Amount</th>
															<th>Products</th>
															<th>Coupon</th>
															<th>Status</th>
															<th>Cancel</th>
															<th>Reorder</th>
														</tr>
													</thead>
													<tbody>
														{pendingOrders.map(
															(userOrder) => {
																return (
																	<>
																		<tr
																			key={
																				userOrder.orderId
																			}
																			name="cancelid"
																			value={
																				userOrder.orderId
																			}
																		>
																			<td>
																				{
																					userOrder.displayOrderId
																				}
																			</td>
																			<td>
																				{
																					userOrder.receivedAt
																				}
																			</td>
																			<td>
																				{
																					userOrder.addressUsed
																				}
																			</td>
																			<td>
																				{
																					userOrder.grandTotal
																				}
																			</td>
																			<td>
																				{
																					userOrder.productCount
																				}
																			</td>
																			<td>
																				{
																					userOrder.couponsUsed
																				}
																			</td>
																			<td>
																				{
																					userOrder.status
																				}
																			</td>
																			<td
																				style={{
																					color: "red",
																					cursor: "pointer",
																				}}
																				onClick={() => {
																					cancelOrderApi(userOrder.orderId)
																				}}
																			>
																				cancel
																			</td>
																			<td></td>
																		</tr>
																	</>
																)
															}
														)}
													</tbody>
													<tbody>
														{cancelledOrders.map(
															(userOrder) => {
																return (
																	<>
																		<tr>
																			<td>
																				{
																					userOrder.displayOrderId
																				}
																			</td>
																			<td>
																				{
																					userOrder.receivedAt
																				}
																			</td>
																			<td>
																				{
																					userOrder.addressUsed
																				}
																			</td>
																			<td>
																				{
																					userOrder.grandTotal
																				}
																			</td>
																			<td>
																				{
																					userOrder.productCount
																				}
																			</td>
																			<td>
																				{
																					userOrder.couponsUsed
																				}
																			</td>
																			<td>
																				{
																					userOrder.status
																				}
																			</td>

																			<td></td>
																		</tr>
																	</>
																)
															}
														)}
													</tbody>
													<tbody>
														{completedOrders.map(
															(userOrder) => {
																return (
																	<>
																		<tr>
																			<td>
																				{
																					userOrder.displayOrderId
																				}
																			</td>
																			<td>
																				{
																					userOrder.receivedAt
																				}
																			</td>
																			<td>
																				{
																					userOrder.addressUsed
																				}
																			</td>
																			<td>
																				{
																					userOrder.grandTotal
																				}
																			</td>
																			<td>
																				{
																					userOrder.productCount
																				}
																			</td>
																			<td>
																				{
																					userOrder.couponsUsed
																				}
																			</td>
																			<td>
																				{
																					userOrder.status
																				}
																			</td>
																			<td
																				style={{
																					color: "red",
																				}}
																			>
																				cancel
																			</td>
																			<td></td>
																		</tr>
																	</>
																)
															}
														)}
													</tbody>
												</table>
											</div>
										</div>
									</div>
									{/* <!-- /.card-body --> */}
								</div>
								{/* <!-- /.card -->
                     <!-- /.content --> */}
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}
