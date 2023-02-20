import { useState } from "react"

import HeadTag from "../components/Layout/components/Head/HeadTag"
import ProfileNavigationMenuAndItemsLayout from "../components/Layout/components/Layouts/ProfileNavigationMenuAndItemsLayout"
import { useOptionsApi, useOrderHistoryApi } from "../helpers/Api"
import SingleOrderRow from "../components/Layout/components/Orders/SingleOrderRow"

const AllOrders = () => {
	const [selectedTab, setSelectedTab] = useState('pending')
	const { isLoading, errorResponse, errorMessage, pendingOrders, cancelledOrders, completedOrders } = useOrderHistoryApi()
	const { isLoading: optionsIsLoading, orderCancelTime } = useOptionsApi()

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

	if (isLoading || optionsIsLoading) {
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
		<div className="w-full flex flex-col">
			<Tab />
			<section className="w-full flex flex-col space-y-2 divide-y-2">
				{selectedTab === 'pending' && (
					<>
						{pendingOrders.map((order) => {
							let { orderId } = order
							return (
								<SingleOrderRow
									key={orderId}
									order={order}
									cancelTime={orderCancelTime}
								/>
							)
						})}
					</>
				)}
				{selectedTab === 'completed' && (
					<>
						{completedOrders.map((order) => {
							let { orderId } = order
							return (
								<SingleOrderRow
									key={orderId}
									order={order}
								/>
							)
						})}
					</>
				)}
				{selectedTab === 'cancelled' && (
					<>
						{cancelledOrders.map((order) => {
							let { orderId } = order
							return (
								<SingleOrderRow
									key={orderId}
									order={order}
								/>
							)
						})}
					</>
				)}
			</section>
		</div>
	)
}

const Orders = () => {
	return (
		<div>
			<HeadTag title={"Orders"} />
			<ProfileNavigationMenuAndItemsLayout>
				<AllOrders />
			</ProfileNavigationMenuAndItemsLayout>
		</div>
	)
}

export default Orders
