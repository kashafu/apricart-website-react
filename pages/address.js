import SelectAddress from "../components/Layout/components/Address/SelectAddress"
import HeadTag from "../components/Layout/components/Head/HeadTag"
import ProfileNavigationMenuAndItemsMenuLayout from "../components/Layout/components/Layouts/ProfileNavigationMenuAndItemsLayout"

export default function Address() {
	return (
		<div>
			<HeadTag title={"Address"} />
			<ProfileNavigationMenuAndItemsMenuLayout>
				<SelectAddress
					type={"manage"}
				/>
			</ProfileNavigationMenuAndItemsMenuLayout>
		</div>
	)
}
