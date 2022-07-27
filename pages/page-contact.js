
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
import { useEffect } from 'react'
export default function PageContact() {
  
    useEffect(()=>{
        if(!window.location.hash) {
			window.location = window.location + '#loaded';
			window.location.reload();}
	},[])
    let { token } = getGeneralApiParams()
	const router = useRouter();
    const cookies = new Cookies();
    let { city, headers, userId } = getGeneralApiParams();
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
	const [address, setaddress] = useState("");
    const [subject, setsubject] = useState("");


    return <>
        <HeadTag title={'Contact Us'}/>
        <body className="">
          
                    <div className="text-center">
                        <h4 className="text-brand mb-2">Get in touch</h4>
                        {/* <h1 className="mb-2 wow fadeIn animated font-xxl fw-900">
                            Let's Talk  <br />
                            <span className="text-style-1"></span>
                        </h1> */}
         <p className="w-50 m-auto mb-50 wow fadeIn animated">We love hearing from you, our Apricart customers. Please contact us about anything at all. Your experience or request for a specific product. We’ll do everything we can to make your experience unforgettable every time. Reach us however you like.</p>
                        {/* <p className="wow fadeIn animated">
                            <a className="btn btn-brand btn-lg font-weight-bold text-white border-radius-5 btn-shadow-brand hover-up" href="page-about.html">About Us</a>
                            <a className="btn btn-outline btn-lg btn-brand-outline font-weight-bold text-brand bg-white text-hover-white ml-15 border-radius-5 btn-shadow-brand hover-up">Support Center</a>
                        </p>  */}
                    </div>
           
            <div className="flex flex-col gap-y-4 justify-between items-center">

                <h3 className="">Drop Us a Line</h3>
                
                <p className="">Please direct all inquiries via email to: support@apricart.pk</p>
                {/* <TextField
				 label={"Name"}
				 placeHolder={""}
				 onChange={setname}
				 value={name}
				 type={'string'}
			 />
			 <TextField
				 label={"Email"}
				 placeHolder={"someone@example.com"}
				 onChange={setemail}
				 value={email}
				 type={'string'}
			 />
			  <TextField
				 label={"Address"}
				 placeHolder={"street address, block,city,country"}
				 onChange={setaddress}
				 value={address}
				 type={'string'}
			 />
               <TextField
				 label={"Subject"}
				 placeHolder={"Your Query"}
				 onChange={setsubject}
				 value={subject}
				 type={'text-area'}
			 />
			 
             <SubmitButton className="w-1/3 p-4"    text={"SEND MESSAGE"}/>    */}
                
            </div>
        </body>
    </>
}