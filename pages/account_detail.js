import { getGeneralApiParams } from "../helpers/ApiHelpers"
import HeadTag from "../components/Layout/components/Head/HeadTag"

export default function AccountDetail(){
	let { token } = getGeneralApiParams()
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