import { useState, useEffect } from "react"

import TextField from "../components/Layout/components/Input/TextField"
import SubmitButton from "../components/Layout/components/Buttons/SubmitButton"
import PageHeading from "../components/Layout/components/Typography/PageHeading"
import HeadTag from "../components/Layout/components/Head/HeadTag"
import ProfileNavigationMenuAndItemsMenuLayout from "../components/Layout/components/Layouts/ProfileNavigationMenuAndItemsLayout"
import { useGetProfileApi, useUpdateProfileApi } from '../helpers/Api'

const Profile = () => {
	const { isLoading, errorMessage, errorResponse, profile } = useGetProfileApi()
	const { setData, setIsUpdate } = useUpdateProfileApi()
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [phoneNumber, setPhoneNumber] = useState('')
	const [isDisabled, setIsDisabled] = useState(true)

	useEffect(() => {
		if (profile) {
			setName(profile.name)
			setEmail(profile.email)
			setPhoneNumber(profile.phoneNumber)
		}
	}, [profile])

	useEffect(() => {
		if (profile) {
			if (profile.name === name && profile.email === email && profile.phoneNumber === phoneNumber) {
				setIsDisabled(true)
			}
			else {
				setIsDisabled(false)
			}
		}
	}, [name, email, phoneNumber, profile])

	if (isLoading) {
		return (
			<></>
		)
	}

	if (errorResponse) {
		return (
			<p>
				{errorMessage}
			</p>
		)
	}


	return (
		<div>
			<HeadTag title={"Profile"} />
			<ProfileNavigationMenuAndItemsMenuLayout>
				<div className="flex justify-center w-full animate-dropdown">
					<div className="flex flex-col w-full lg:w-2/3 p-8 space-y-6 items-center align-center bg-slate-100 shadow rounded-3xl">
						<PageHeading
							text={"Account Details"}
						/>
						<div className="space-y-2">
							<TextField
								label={"Name"}
								placeHolder={"3301234567"}
								onChange={setName}
								value={name}
							/>
							<TextField
								label={"Phone Number"}
								placeHolder={"3301234567"}
								onChange={setPhoneNumber}
								value={phoneNumber}
								type={'number'}
							/>
							<TextField
								label={"Email"}
								placeHolder={"name@email.com"}
								onChange={setEmail}
								value={email}
								type={'email'}
							/>
						</div>
						<div className="w-3/4">
							<SubmitButton
								text={"Update Profile Details"}
								onClick={() => {
									setData({
										name,
										email,
										phoneNumber
									})
									setIsUpdate(true)
								}}
								disabled={isDisabled}
							/>
						</div>
					</div>
				</div>
			</ProfileNavigationMenuAndItemsMenuLayout>
		</div>

	)
}

export default Profile