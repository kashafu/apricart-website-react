
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

export default function PageContact() {
    let { token } = getGeneralApiParams()
	const router = useRouter();
    const cookies = new Cookies();
    let { city, headers, userId } = getGeneralApiParams();
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
	const [address, setaddress] = useState("");
    const [subject, setsubject] = useState("");
    const [phoneNumber, setphoneNumber] = useState('')
   const pContactus =async()=>{
    let url = base_url_api + "/home/contactus/save" 
    let body = {
        "name":name,
        "phoneNumber":"92" +phoneNumber ,
        "email":email,
        "file":"http://file.pdf",
         "text":subject
    }
    console.log(body);
    try {
        let response = await axios.post(url, body,
            {
                headers: headers
            }
        )
        console.log(response.data);
        if (response.data.status == 1) {
            toast.success(response.data.message);
        }
    }
    catch(e){
      toast.error(e)
    }
   }
   const handleChange = (e) => {
    const {value } = e.target;
   setsubject(value)
};

    return <>
        <HeadTag title={'Contact Us'}/>
        <body className="">
          
                    <div className="text-center  text-main-blue font-bold">
                        <h4 className="text-brand text-5xl text-main-blue font-bold mb-2">Contact Us</h4>
                     
                    </div>
           
            <div className="flex flex-col w-full gap-y-4 justify-between items-center ">

             
                <TextField
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
				 label={"phoneNumber"}
				 placeHolder={"3138876659"}
				 onChange={setphoneNumber}
				 value={phoneNumber}
				 type={'string'}
			 />
              <div className="grid grid-cols-3 gap-4 items-center">
            {/* <p className="col-span-1 font-lato text-main-blue font-semibold">
                Subject
            </p>
                <input
                type="textarea"
                className="col-span-2 h-[100px] py-2 px-4 rounded-lg"  placeholder="Input Query"
                value={subject}
                name="subject"/>  */}
        {/* <label for="w3review">Review of W3Schools:</label> */}
            <p className="col-span-1 font-lato text-main-blue font-semibold">
                Subject
            </p>
            <textarea id="w3review" onChange={handleChange} value={subject} className="col-span-2 h-[100px] py-2 px-4 rounded-lg overflow-hidden" >
           
            </textarea>

			 </div>
             <div className="w-1/2 p-4">
             <SubmitButton  onClick={() => {
                                   pContactus();
                                }   }    text={"SEND MESSAGE"}/>   
                
                </div>
            </div>
            
        </body>
    </>
}