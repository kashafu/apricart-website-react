import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../Logo/Logo";
// import add from "../../../../public/assets/images/Group 72"
    // layout="fill" Group 72
export default function Layout() {
    return (
        <div className="bg-gray-200 flex flex-col  text-indigo-900  p-8 w-full sm:flex-row sm:h-60">
        <div className="flex flex-col my-2.5 text-indigo-900 sm:justify-center sm:items-center sm:w-4/12">          
            <div className="h-1/4 w-1/2  mb-4">
               <Logo/>
            </div>
            <div className="inline-flex  h-1/4 my-1 sm:justify-between sm:items-center">
            <Image src="/assets/images/Group 72.svg"
               width={40} height={40} 
               // className="img-fluid"
               alt=""
               />
             <p className="pl-2"><span className="font-bold">Address:</span><span>B-191, Block No. 5,</span> Gulshan-e-Iqbal, Karachi </p>
            </div> <br />
            <div className="inline-flex h-1/4 my-1 sm:justify-center sm:items-center">
            <Image src="/assets/images/Group 65.svg"
               width={30} height={30} 
               // className="img-fluid"
               alt=""
               />
               <p className="pl-2"><span className="font-bold">Phone:</span><span className="highligh1">0304-1110195</span></p>
          </div><br/>
          <div className="inline-flex h-1/4 my-2 sm:justify-center sm:items-center">
               
          <Image src="/assets/images/Group 68.svg"
               width={40} height={40} 
               // className="img-fluid"
               alt=""
               />
               <p className="pl-2"><a href="mailto:support@apricart.pk"><span className="font-bold">Email:</span>support@apricart.pk</a></p><br />
              </div>
        </div>
        {/* grid grid-cols-2 sm:flex sm:flex-col  */}
           <div className="flex flex-col my-2.5 sm:flex sm:flex-col border-y-2 border-indigo-200 sm:justify-between sm:items-center sm:border-x-2 sm:border-indigo-200 sm:border-y-0  sm:w-4/12" >
              <p className="font-bold">About Us</p>
              {/* grid grid-cols-2 gap-y-4 gap-x-6 */}
          <div className="flex flex-col p-4 sm:justify-between sm:items-center  sm:flex sm:flex-col">
      
           <a  className="p-1" href="/privacy-policy">Privacy Policy</a> 
               <a  className="p-1" href="/terms-of-use">Terms of Use</a>
               <a  className="p-1" href="/faqs">FAQs</a>
               
               <a  className="p-1" href="/page-contact">Contact Us</a>
          
            </div>
           </div>
           
 <div className="flex flex-col my-2.5 sm:justify-between sm:items-center sm:w-4/12" > 
           
<div className="">
       
         <ul>
            <li className="flex sm:justify-center">
            <h3 className="font-bold">Install Our App</h3><br/>
            </li>
            <li className="inline-flex">
               <a href="#"><img src="/assets/images/playstore-img.png"
               width={80} height={40} margin-right={50}
               className="img-fluid"
               alt=""
               /></a>
            </li>
            <li className="inline-flex" >
               <a href="#"><img src="/assets/images/appstore-img.png" 
               width={80} height={40}
               className="img-fluid king"
               alt=""
               /></a>
            </li>
            
         </ul>
      </div>
      <br/>
      <p className="mb-2">Secured payment gateways</p>
            <img src="/assets/images/payment-method.svg" 
               // width={80} height={40}
               className="mb-3"
               alt=""
               />

      <div className="inline-flex">

   <a  className="mx-2" href="https://www.facebook.com/apricartonlinegrocery/"><i className="fab fa-facebook"></i></a>
   <a   className="mx-2" href="https://twitter.com/apricartpk?lang=en" ><i className="fab fa-twitter"></i></a>
   <a  className="mx-2" href="https://pk.linkedin.com/company/apricartestores"><i className="fab fa-linkedin"></i></a>

   <a  className="mx-2" href="https://www.instagram.com/apricart.pk/?hl=en"><i className="fab fa-instagram"></i></a>
</div>
{/* <!-- <p className="bg-white">Apricart E-Stores Pvt Ltd    <br>  All rights reserved</p> --> */}
</div>
  
{/* <div className="flex bg-white justify-center items-center h-[50px]">
               <p className="font-bold">Apricart E-Stores Pvt Ltd All Rights Reserved</p> 
            </div> */}


</div>        
    );
}
