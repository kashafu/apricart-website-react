import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../Logo/Logo";

export default function Layout() {
    return (
        <div className="bg-gray-200 flex flex-col  text-indigo-900  p-8 w-full sm:flex-row sm:h-60">
        <div className="flex flex-col mx-4 text-indigo-900 justify-center items-center sm:w-4/12">          
            <div className="h-1/4 w-1/2 mx-1/4">
               <Logo/>
            </div>
            <div className="inline-flex  h-1/4 my-1 justify-between items-center">
            
             <i className="fa fa-map-marker"></i>
             <p className="pl-2"><span className="font-bold">Address:</span><span>B-191, Block No. 5,</span> Gulshan-e-Iqbal, Karachi </p>
            </div> <br />
            <div className="inline-flex h-1/4 my-1 justify-center items-center">
              <i className="fa fa-phone"></i>
               <p className="pl-2"><span className="font-bold">Phone:</span><span className="highligh1">0304-1110195</span></p>
          </div><br/>
          <div className="inline-flex h-1/4 my-1 justify-center items-center">
               <i className="fa fa-envelope"></i>
               <p className="pl-2"><a href="mailto:support@apricart.pk"><span className="font-bold">Email:</span>support@apricart.pk</a></p><br />
              </div>
        </div>
        {/* grid grid-cols-2 sm:flex sm:flex-col  */}
           <div className="flex flex-col sm:flex sm:flex-col border-y-2 border-indigo-200 justify-between items-center sm:border-x-2 sm:border-indigo-200 sm:border-y-0  sm:w-4/12" >
              <h3 className="font-bold">About Us</h3>
          <div className="grid grid-cols-2 gap-y-4 gap-x-6 justify-between items-center  sm:flex sm:flex-col">
      
           <a  className="" href="/privacy-policy">Privacy Policy</a> 
               <a  className="" href="/terms-of-use">Terms of Use</a>
               <a  className="" href="/faqs">FAQs</a>
               
               <a  className="" href="/page-contact">Contact Us</a>
          
            </div>
           </div>
           
 <div className="flex flex-col  justify-between items-center sm:w-4/12" > 
           
<div className="">
       
         <ul>
            <li className="flex justify-center">
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
