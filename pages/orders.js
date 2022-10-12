import { useState, useEffect } from "react"
import axios from "axios"
import { getGeneralApiParams } from "../helpers/ApiHelpers"
import { base_url_api } from "../information.json"
import HeadTag from "../components/Layout/components/Head/HeadTag"
import { toast } from 'react-toastify'
import ProfileNavigationMenuAndItemsLayout from "../components/Layout/components/Layouts/ProfileNavigationMenuAndItemsLayout"
import { useOrderHistoryApi } from "../helpers/Api"
import SingleOrderRow from "../components/Layout/components/Orders/SingleOrderRow"

const Orders = () => {
	let { token } = getGeneralApiParams()

	const AllOrders = () => {
		const [selectedTab, setSelectedTab] = useState('pending')
		const { isLoading, errorResponse, errorMessage, pendingOrders, cancelledOrders, completedOrders } = useOrderHistoryApi()

		const Tab = () => {
			return (
				<div className="flex flex-row w-full">
					<button className={"w-1/3 bg-white font-nunito text-main-blue font-bold text-lg border-2 border-main-blue " + [selectedTab === 'pending' && "text-white bg-main-blue"]}
						onClick={() => {
							setSelectedTab('pending')
						}}
					>
						PENDING
					</button>
					<button className={"w-1/3 bg-white font-nunito text-main-blue font-bold text-lg border-2 border-main-blue " + [selectedTab === 'completed' && "text-white bg-main-blue"]}
						onClick={() => {
							setSelectedTab('completed')
						}}
					>
						COMPLETED
					</button>
					<button className={"w-1/3 bg-white font-nunito text-main-blue font-bold text-lg border-2 border-main-blue " + [selectedTab === 'cancelled' && "text-white bg-main-blue"]}
						onClick={() => {
							setSelectedTab('cancelled')
						}}
					>
						CANCELLED
					</button>

				</div>
			)
		}

		if (isLoading) {
			return <></>
		}

		if (errorResponse) {
			return (
				<p>
					{errorMessage}
				</p>
			)
		}

		return (
			<div className="w-full">
				<Tab />
				<div className="overflow-auto">
					<table className="w-full table-auto table border-separate">
						{selectedTab === 'pending' && (
							<>
								<thead>
									<tr className="text-center truncate">
										<th>Order Id</th>
										<th>Order Date</th>
										<th>Total Items</th>
										<th>Total Amount</th>
										<th>Order Type</th>
									</tr>
								</thead>
								<tbody>
									{pendingOrders.map((order) => {
										let { orderId } = order
										return (
											<SingleOrderRow
												key={orderId}
												order={order}
											/>
										)
									})}
								</tbody>
							</>
						)}
						{selectedTab === 'completed' && (
							<>
								<thead>
									<tr className="text-center truncate">
										<th>Order Id</th>
										<th>Order Date</th>
										<th>Total Items</th>
										<th>Total Amount</th>
										<th>Order Type</th>
									</tr>
								</thead>
								<tbody>
									{completedOrders.map((order) => {
										let { orderId } = order
										return (
											<SingleOrderRow
												key={orderId}
												order={order}
											/>
										)
									})}
								</tbody>
							</>
						)}
						{selectedTab === 'cancelled' && (
							<>
								<thead>
									<tr className="text-center truncate">
										<th>Order Id</th>
										<th>Order Date</th>
										<th>Total Items</th>
										<th>Total Amount</th>
										<th>Order Type</th>
									</tr>
								</thead>
								<tbody>
									{cancelledOrders.map((order) => {
										let { orderId } = order
										return (
											<SingleOrderRow
												key={orderId}
												order={order}
											/>
										)
									})}
								</tbody>
							</>
						)}
					</table>
				</div>
			</div>
		)
	}

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
			<ProfileNavigationMenuAndItemsLayout>
				<AllOrders />
			</ProfileNavigationMenuAndItemsLayout>
		</div>
	)
}

export default Orders
