
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
   const handlesubject = (e) => {
    const {value,name } = e.target;
   setsubject(value);
};
const handleemail = (e) => {
    const {value,name } = e.target;
   setemail(value);
};
const handlename = (e) => {
    const {value,name } = e.target;
   setname(value);
};
const handlePhone = (e) => {
    const {value,name } = e.target;
   setphoneNumber(value);
};

    return <>
        <HeadTag title={'Contact Us'}/>
        <body className="">
        <div className="flex justify-center w-full">
                
           
        <div className="flex flex-col p-8 space-y-6 w-full lg:w-1/2 items-center align-center bg-slate-100 shadow rounded-3xl">
                        <PageHeading
                            text={"Contact Us"}
                        />
             <input
                className="col-span-2 w-2/3 h-[40px] py-2 px-2 rounded-lg bg-slate-200"
              
                placeholder="email"
                value={email}
               
       
                onChange={handleemail}
            />
              <input
                className="col-span-2 w-2/3 h-[40px] py-2 px-2 rounded-lg bg-slate-200"
               
                placeholder="Name"
                value={name}
                onChange={handlename}/>
                  <input
                className="col-span-2 w-2/3 h-[40px] py-2 px-2 rounded-lg bg-slate-200"
             
                placeholder="3112220090"
                value={phoneNumber}
                onChange={handlePhone}/>
          
            <textarea    id="w3review" onChange={handlesubject} value={subject} placeholder="SUBJECT" className="col-span-2 w-2/3 h-[100px] py-2 px-2 rounded-lg bg-slate-200 overflow-hidden"  >
              Subject
            </textarea>
          

         <div className="flex flex-col gap-1 items-center">
          
        {/* <label for="w3review">Review of W3Schools:</label> */}
        
         </div>
             <div className="w-1/2 p-[4px]">
             <SubmitButton  onClick={() => {
                                   pContactus();
                                }   }    text={"SEND MESSAGE"}/>   
                
                </div>
            </div>
            </div> 
        </body>
    </>
}