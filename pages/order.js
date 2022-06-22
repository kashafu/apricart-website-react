import React,{useState,useEffect} from 'react'
import Link from 'next/link';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useRouter } from "next/router";

const order = () => {
   const cookies = new Cookies();
   const router = useRouter();

   

   var token = cookies.get('cookies-token')
   if (!token ){
    return(
       <>
       <h5 className='login-token'>Please Login first</h5>
       </>
    )
    }
    const [orders, setOrder] = useState([]);
   const [pending, setPending] = useState([]);
   const [completed,setCompleted] = useState([]);
   const [cancel,setCancel] = useState([]);


   const getProfile = async () => {
     const config = {
        method: 'GET',
        headers: {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json',
          'Authorization' : 'Bearer ' + cookies.get('cookies-token'),
        }
      }
    const resp = await axios.get(
      'https://staging.apricart.pk/v1/order/history',config 
    );
    setPending(resp.data.data.pending);
    setCancel(resp.data.data.cancelled)
    setCompleted(resp.data.data.completed)
    let pendingOrder = resp.data.data.pending
    let cancelOrder = resp.data.data.cancelled
    let completeOrder = resp.data.data.completed
    pending = pendingOrder;
    completed = completeOrder;
    cancel = cancelOrder;


    console.log("Total order1",pending);
    
    
    
  };
  useEffect(() => {
    getProfile();
  }, []);

  ///-----------------Cancel Order -------------------///
//   const [cancelOrderId,setCancelId] = useState([]);
  
//   const handleCancel = () => {
//      const config = {
//       method: 'GET',
//       headers: {
//         'Accept' : 'application/json',
//         'Content-Type' : 'application/json',
//         'Authorization' : 'Bearer ' + cookies.get('cookies-token'),
//       }
//      }
//      useEffect(() => {
//         const response = axios.get(`https://staging.apricart.pk/v1/order/checkout/cancel?id=00922422153228445`,
//         config);

//      })
//   }

const [cancelid, setCancelid] = useState('00922422153228445');
const handleCancel = async (e) => {
   e.preventDefault();
   try {
     const response = await axios.get(
       `https://staging.apricart.pk/v1/order/checkout/cancel?id=${cancelid}`,{
         headers: {
           'Accept' : 'application/json',
           'Content-Type' : 'application/json',
           'Authorization' : 'Bearer ' + cookies.get('cookies-token'),  
         }
     }
     );
     setCancelid(response.data)
     alert(response.data.message)
   } catch (err) {
     alert("Sorry desired order can not be cancelled anymore")
   }
 };
 const handleCancelOrder = (event) => {
   setDiscount(event.target.value);
   
 };

 console.log("Cancel Id",cancelid)
  const logout = () => {
    cookies.remove('cookies-token');
    localStorage.clear();
    router.push('/');
  }
  return (
    <>
     <section className="popular_sec">
         <div className="container">
            <div className="row">
               <div className="col-12 col-sm-12  col-md-12  col-lg-12  col-xl-12  col-xxl-12">
               <div className="tab">
                      <Link href='/order' passHref>
                      <button className="tablinks active" id="defaultOpen">Orders</button>
                      </Link>
                      <Link href='/address' passHref>
                      <button className="tablinks" >My Address</button>
                      </Link>
                      <Link href='/account_Detail' passHref>
                      <button className="tablinks">Account details</button>
                      </Link>
                     <button className="tablinks" onClick={logout}>Logout</button>
                  </div>
                  <div id="London" className="tabcontent">
                     {/* <!-- Main content -->
                     <!-- /.card -->    */}
                     <div className="card">
                        <div className="card-header">
                           <h3 className="card-title">My Orders</h3>
                        </div>
                        {/* <!-- /.card-header --> */}
                        <div className="card-body">
                           <div className="container">
                              
                              <div >
                                 <table className="table table-striped mt32 customers-list" >
                                    <thead>
                                       <tr>
                                          <th>Order Id</th>
                                          <th>Date</th>
                                          <th>Address</th>
                                          <th>Amount</th>
                                          <th>Products</th>
                                          <th>Coupon</th>
                                          <th>Status</th>
                                          <th>Cancel</th>
                                          <th>Reorder</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                       {pending.map((userOrder)=>{
                                         return(
                                           <>
                                           <tr key={userOrder.orderId} name="cancelid"
                                           value={userOrder.orderId}
                                           onChange={handleCancelOrder}>
                                             <td>{userOrder.displayOrderId}</td>
                                             <td>{userOrder.receivedAt}</td>
                                             <td>{userOrder.addressUsed}</td>
                                             <td>{userOrder.grandTotal}</td>
                                             <td>{userOrder.productCount}</td>
                                             <td>{userOrder.couponsUsed}</td>
                                             <td>{userOrder.status}</td>
                                             <td style={{color:"red",cursor:"pointer"}} onClick={handleCancel}>cancel</td>
                                             <td></td>
                                          </tr>
                                           </>
                                         )
                                       })}  
                                    </tbody>
                                    <tbody>
                                       {cancel.map((userOrder)=>{
                                         return(
                                           <>
                                           <tr>
                                             <td>{userOrder.displayOrderId}</td>
                                             <td>{userOrder.receivedAt}</td>
                                             <td>{userOrder.addressUsed}</td>
                                             <td>{userOrder.grandTotal}</td>
                                             <td>{userOrder.productCount}</td>
                                             <td>{userOrder.couponsUsed}</td>
                                             <td>{userOrder.status}</td>
                                            
                                             <td></td>
                                          </tr>
                                           </>
                                         )
                                       })}  
                                    </tbody>
                                    <tbody>
                                       {completed.map((userOrder)=>{
                                         return(
                                           <>
                                           <tr>
                                             <td>{userOrder.displayOrderId}</td>
                                             <td>{userOrder.receivedAt}</td>
                                             <td>{userOrder.addressUsed}</td>
                                             <td>{userOrder.grandTotal}</td>
                                             <td>{userOrder.productCount}</td>
                                             <td>{userOrder.couponsUsed}</td>
                                             <td>{userOrder.status}</td>
                                             <td style={{color:"red"}}>cancel</td>
                                             <td></td>
                                          </tr>
                                           </>
                                         )
                                       })}  
                                    </tbody>
                                    
                                 </table>
                              </div>
                           </div>
                           
                        </div>
                        {/* <!-- /.card-body --> */}
                     </div>
                     {/* <!-- /.card -->
                     <!-- /.content --> */}
                  </div>
                 
               </div>
            </div>
         </div>
      </section>
    </>
  )
}

export default order;

