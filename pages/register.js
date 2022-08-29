import axios from "axios"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { getGeneralApiParams } from "../helpers/ApiHelpers"
import { base_url_api } from '../information.json'
import TextField from "../components/Layout/components/Input/TextField"
import SubmitButton from "../components/Layout/components/Buttons/SubmitButton"
import ErrorText from "../components/Layout/components/Typography/ErrorText"
import PageHeading from "../components/Layout/components/Typography/PageHeading"
import HeadTag from "../components/Layout/components/Head/HeadTag"
import { toast } from "react-toastify";

export default function Register() {
    const router = useRouter();
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [otp, setOtp] = useState();
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)

    const [showOTPScreen, setShowOTPScreen] = useState(false)

    useEffect(() => {
        if (name.length == 0 || email.length == 0 || password.length == 0 || phoneNumber.length != 10) {
            setIsButtonDisabled(true)
        }
        else {
            setIsButtonDisabled(false)
        }
    }, [name, email, phoneNumber, password])

    const handleSubmit = async (e) => {
        try {
            let { userId, headers } = getGeneralApiParams();
            let url = base_url_api + "/auth/open/register?city=karachi&lang=en&userid=" + userId;
            let body = {
                "email": email,
                "name": name,
                "phoneNumber": '92' + phoneNumber,
                "password": password,
                "guestuserid": userId,

            }
            console.log(body)
            const response = await axios.post(url, body, {
                headers: headers,
            });
            toast.success(response.data.message);
            setShowOTPScreen(true);
        } catch (err) {
            console.log(err);
            toast.error(err.message);
        }
    };

    const onEnterPress = async (e) => {
        if (e.key === 'Enter') {
            await handleSubmit()
        }
    }

    const otpCodeApiHandler = async (code) => {
        let { headers, userId } = getGeneralApiParams();

        let url = base_url_api + "/auth/open/otp/verify?client_type=apricart&userid=" + userId;
        let body = {
            phoneNumber: "92" + phoneNumber,
            otp: code,
        };
        try {
            let response = await axios.post(url, body, {
                headers: headers,
            });
            router.push("/");
            toast.success(response.data.message);
        } catch (error) {
            console.log(error);
            toast.error(error)
        }
    }

    return (
        <div className="animate-dropdown">
            <HeadTag title={'Register'} />
            {showOTPScreen ? (
                <div className='flex flex-row justify-center w-full'>
                    <div className='bg-slate-100 p-8 shadow rounded-3xl'>
                        <p>Check 0{phoneNumber} for otp code</p>
                        <TextField
                            label={"otp"}
                            placeHolder={"OTP"}
                            onChange={setOtp}
                            value={otp}
                            type={'number'}
                        />
                        <SubmitButton
                            text={"Register"}
                            onClick={() => {
                                otpCodeApiHandler(otp);
                            }}
                        />
                    </div>
                </div>
            ) : (

                <div>
                    <div className="flex justify-center w-full" onKeyDown={onEnterPress}>
                        <div className="flex flex-col p-8 space-y-6 lg:w-1/3 items-center align-center bg-slate-100 shadow rounded-3xl">
                            <PageHeading
                                text={"Register"}
                            />
                            <div className="space-y-2">
                                <TextField
                                    label={"Name"}
                                    placeHolder={"Enter Name"}
                                    onChange={setname}
                                    value={name}
                                    type={'String'}
                                />
                                <TextField
                                    label={"Email"}
                                    placeHolder={"Enter Email"}
                                    onChange={setemail}
                                    value={email}
                                    type={'String'}
                                />
                                <TextField
                                    label={"Phone Number"}
                                    placeHolder={"3301234567"}
                                    onChange={setPhoneNumber}
                                    value={phoneNumber}
                                    type={'number'}
                                />
                                <TextField
                                    label={"New Password"}
                                    placeHolder={"password"}
                                    onChange={setPassword}
                                    value={password}
                                    type={'password'}
                                />

                            </div>
                            <div className="w-3/4">
                                <SubmitButton
                                    text={"Register"}
                                    onClick={handleSubmit}
                                    disabled={isButtonDisabled}
                                />
                            </div>
                            <ErrorText
                                text={errorMessage}
                            />

                        </div>
                    </div>
                </div>
            )
            }
        </div>
    )
}