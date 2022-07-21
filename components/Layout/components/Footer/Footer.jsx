import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Layout() {
    return (
        <div className="bg-gray-200 inline-flex text-indigo-900 h-60 p-8 w-full">
        <div className="w-4/12 mx-4 text-indigo-900 justify-center items-center">           
            <div className="inline-flex  h-1/3 my-1 justify-center items-center">
             <i className="fa fa-map-marker"></i>
             <p className="pl-2"><span className="font-bold">Address:</span><span>B-191, Block No. 5,</span> Gulshan-e-Iqbal, Karachi </p>
            </div> <br />
            <div className="inline-flex h-1/3 my-1 justify-center items-center">
              <i className="fa fa-phone"></i>
               <p className="pl-2"><span className="font-bold">Phone:</span><span className="highligh1">0304-1110195</span></p>
          </div><br/>
          <div className="inline-flex h-1/3 my-1 justify-center items-center">
               <i className="fa fa-envelope"></i>
               <p className="pl-2"><a href="mailto:support@apricart.pk"><span className="font-bold">Email:</span>support@apricart.pk</a></p><br />
              </div>
        </div>
        
           <div className="flex flex-col justify-between items-center w-4/12 " >

           <a  className="" href="/privacy-policy">Privacy Policy</a><br/> 
               <a  className="" href="/terms-of-use">Terms of Use</a><br/>
               <a  className="" href="/faqs">FAQs</a><br/>
               
               <a  className="" href="/page-contact">Contact Us</a><br/>
            
           </div>
           
 <div className="flex flex-col w-4/12 justify-between items-center" > 
           
<div className="">
         <h3 className="">Install Our App</h3><br/>
         <ul>
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
   <a  className="mx-2" href="#"><i className="fab fa-github"></i></a>
   <a  className="mx-2" href="#"><i className="fab fa-instagram"></i></a>
</div>
{/* <!-- <p class="footer-company-name">Apricart E-Stores Pvt Ltd    <br>  All rights reserved</p> --> */}
</div>



</div>        
    );
}
