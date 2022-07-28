import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import TextField from '../components/Layout/components/Input/TextField'
import SubmitButton from '../components/Layout/components/Buttons/SubmitButton'
import axios from "axios";
import { base_url_api } from '../information.json'
import { getGeneralApiParams } from '../helpers/ApiHelpers'
import PageHeading from "../components/Layout/components/Typography/PageHeading";
import ErrorText from "../components/Layout/components/Typography/ErrorText";
import SuccessText from "../components/Layout/components/Typography/SuccessText";
import HeadTag from "../components/Layout/components/Head/HeadTag";

export default function ForgotPassword(){
	const router = useRouter()

	/* states can be
		'otp' : user enters mobile number and generates otp
		'verify' : user enters new password and otp and clicks submit
	*/
	const [viewState, setViewState] = useState('otp') 
	const [phoneNumber, setPhoneNumber] = useState('')
	const [otp, setOtp] = useState('')
	const [newPassword, setNewPassword] = useState('')
	const [errorMessage, setErrorMessage] = useState('')
	const [successMessage, setSuccessMessage] = useState('')
	const [buttonDisabled, setButtonDisabled] = useState(true)

	useEffect(() => {
		setButtonDisabled(phoneNumber.length != 10)
	}, [phoneNumber])

	useEffect(() => {
		setButtonDisabled(otp.length != 4 || newPassword.length == 0)
	}, [otp, newPassword])

	const getOtpApi = async () => {
		try {
			let { headers } = getGeneralApiParams()
			let url = base_url_api + '/auth/open/otp?client_type=apricart' 
			let body = {
				'phoneNumber' : phoneNumber
			}

			let response = await axios.post(url, body, {
				headers: headers
			})

			toast.success(response.data.message);
			setButtonDisabled(true)
			setErrorMessage('')
			setViewState('verify')
		} catch (error) {
			setErrorMessage(error.response.data)
		}
	}

	const changePasswordApi = async () => {
		try {
			let { headers } = getGeneralApiParams()
			let url = base_url_api + '/auth/open/password/forgot?client_type=apricart' 
			let body = {
				'phoneNumber' : phoneNumber,
				'password': newPassword,
				'otp': otp
			}

			let response = await axios.post(url, body, {
				headers: headers
			})

			setButtonDisabled(true)
			setErrorMessage('')
			setSuccessMessage(response.data.message)
			await new Promise((r) => setTimeout(r, 1000))
			router.push('/login')
		} catch (error) {
			setErrorMessage(error.response.data.message)
		}
	}

	return(
		<div className="flex flex-col w-screen items-center justify-center">
			<HeadTag title={'Forgot Password'}/>
			<div className="flex flex-col p-8 space-y-6 lg:w-1/3 items-center align-center bg-slate-100 shadow rounded-3xl">
				<div className="mt-4 mb-12">
					<PageHeading
						text={"Forgot Password"}
					/>
				</div>
				<div className="">
					{viewState == 'otp' && (
						<div className="space-y-6">
							<TextField
								label={'Enter Registered Phone Number'}
								placeHolder={'3301234567'}
								onChange={setPhoneNumber}
								value={phoneNumber}
								type={'number'}
							/>
							{errorMessage != '' && (
								<ErrorText
									text={errorMessage}
								/>
							)}
							<SubmitButton
								disabled={buttonDisabled}
								text={'Send OTP'}
								onClick={getOtpApi}
							/>
						</div>
					)}
					{viewState == 'verify' && (
						<div className="space-y-6">
							<div className="flex flex-row space-x-2 justify-center">
								<p className="text-center">
									OTP sent to {phoneNumber}
								</p>
								<button
									onClick={()=>{
										setViewState('otp')
									}}
								>
									<p>
										Wrong Number?
									</p>
								</button>
							</div>
							<TextField
								label={'Enter New Password'}
								placeHolder={'password'}
								onChange={setNewPassword}
								value={newPassword}
								type={'text'}
							/>
							<TextField
								label={'Enter OTP'}
								placeHolder={'1234'}
								onChange={setOtp}
								value={otp}
								type={'number'}
							/>
							{errorMessage != '' && (
								<ErrorText
									text={errorMessage}
								/>
							)}
							{successMessage != '' && (
								<SuccessText
									text={successMessage}
								/>
							)}
							<SubmitButton
								disabled={buttonDisabled}
								text={'Change Password'}
								onClick={changePasswordApi}
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
