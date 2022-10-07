import { useState, useEffect } from "react"
import axios from "axios"
import { getGeneralApiParams } from "../helpers/ApiHelpers"
import { base_url_api } from "../information.json"
import HeadTag from "../components/Layout/components/Head/HeadTag"
import { toast } from 'react-toastify'
import ProfileNavigationMenu from "../components/Layout/components/Menus/ProfileNavigationMenu"

const Orders = () => {
	let { token } = getGeneralApiParams()

	const [pendingOrders, setPendingOrders] = useState([])
	const [completedOrders, setCompletedOrders] = useState([])
	const [cancelledOrders, setCancelledOrders] = useState([])

	const getOrderHistoryApi = async () => {
		let { headers, userId } = getGeneralApiParams()
		let url = base_url_api + "/order/history?client_type=apricart&userid=" + userId

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
		let { headers, userId } = getGeneralApiParams()
		let url = base_url_api + '/order/checkout/cancel?client_type=apricart&id=' + id + '&userid=' + userId

		toast.info('Cancelling order')
		try {
			let response = await axios.get(url, { headers: headers })

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
		<div>
			<HeadTag title={"Order"} />
			<div className="flex flex-col lg:flex-row w-full space-y-6 lg:space-y-0 lg:space-x-4">
				<div className="w-full lg:w-1/5">
					<ProfileNavigationMenu />
				</div>
				<section className="w-full lg:w-4/5">
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
																			userOrder.created_at
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
																			userOrder.created_at
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
																			userOrder.created_at
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
				</section>
			</div>
		</div>
	)
}

export default Orders
