import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { getGeneralApiParams } from "../../../../helpers/ApiHelpers";
import { base_url_api } from "../../../../information.json";
import TextField from '../Input/TextField'
import SubmitButton from '../Buttons/SubmitButton'
import ErrorText from '../Typography/ErrorText'
import { setCookie } from "../../../../helpers/Cookies";

export default function Login(){
    const router = useRouter();

    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const loginApi = async () => {
        let { city, headers, userId} = getGeneralApiParams();
        let url = base_url_api + "/auth/open/login?city=" + city + "&lang=en&client_type=apricart&userid=" + userId
        let body = {
            "guestuserid": userId,
            "username": '92' + phoneNumber,
            "password": password
        }

        try {
            let response = await axios.post(url, body,
                {
                    headers: headers
                }
            )
            
            if(response.data.status == 1){
                setCookie("cookies-message", response.data.message)
                setCookie("cookies-token", response.data.data.token)
                setCookie("cookies-name", response.data.data.name)
                setCookie("cookies-email", response.data.data.email)
                setCookie("cookies-phoneNumber", response.data.data.phoneNumber)
                setCookie("cookies-userId", response.data.data.userId)
                setErrorMessage('')
                router.reload()
            }
            else{
                setErrorMessage(response.data.message)
            }
        } catch (err) {
            setErrorMessage(err.response.data.message)
        }
    }

    const onEnterPress = async (e)=>{
        if(e.key === 'Enter'){
            await loginApi()
        }
    }

    return (
        <div onKeyDown={onEnterPress}>
            <div>
                <TextField
                    label={"Phone Number"}
                    placeHolder={"3301234567"}
                    onChange={setPhoneNumber}
                    value={phoneNumber}
                    type={'number'}
                />
                <TextField
                    label={"Password"}
                    placeHolder={"password"}
                    onChange={setPassword}
                    value={password}
                    type={'password'}
                />
              
            </div>
            <div>
                <SubmitButton
                    text={"LOGIN"}
                    onClick={loginApi}
                />
                <ErrorText
                    text={errorMessage}
                />
             
            </div>
            
        </div>
    )
}
//<Link> SIGNUP </Link>      <p>Don't have an Account ?  </p>