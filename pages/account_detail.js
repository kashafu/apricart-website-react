import axios from "axios"
import { useRouter } from "next/router"
import { useState } from "react"
import Link from "next/link"
import Cookies from "universal-cookie"
import { getGeneralApiParams } from "../helpers/ApiHelpers"
import { base_url_api } from '../information.json'
import TextField from "../components/Layout/components/Input/TextField"
import SubmitButton from "../components/Layout/components/Buttons/SubmitButton"
import ErrorText from "../components/Layout/components/Typography/ErrorText"
import PageHeading from "../components/Layout/components/Typography/PageHeading"
import HeadTag from "../components/Layout/components/Head/HeadTag"
import { toast } from "react-toastify";


export default function AccountDetail(){
	let { token } = getGeneralApiParams()
	const router = useRouter();
    const cookies = new Cookies();
    let { city, headers, userId } = getGeneralApiParams();
	if(!token) {
		return (
			<h5 className='login-token'>Please Login First</h5>
		)
	}

	return (
		<>
			<HeadTag title={'My Account'} />
			
		</>
	)
}