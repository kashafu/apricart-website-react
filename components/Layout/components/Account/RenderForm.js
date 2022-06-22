// import React, { Component } from "react";
// import {
//   Navbar,
//   NavDropdown,
//   MenuItem,
//   NavItem,
//   Nav,
//   Popover,
//   Tooltip,
//   Button,
//   Modal,
//   OverlayTrigger,
// } from "react-bootstrap";
// import Link from "next/link";
// import axios from "axios";
// import Register from '../Auth/Register';
// import Login from '../Auth/Login';
// class LoginForm extends Component {
//   constructor() {
//     super();
//     const userData = this.state = {
//       showModal: false,
//       smShow: false,
//       name: "",
//       email: "",
//       password: "",
//       mode: "login",
//     };
//   }
//   componentDidMount() {
//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       try {
//         await axios.post(
//           "https://cbe.apricart.pk/v1/auth/open/register",
//           this.userData
//         );
//         toast.success("Successfully registered ")
//         router.replace("/profile_user");
       
//       } catch (err) {
//         const Error = err.response.data;
//         console.log(Error);
//         toast.error(Error.message);
//       }
//     };
//   }
//   handleSubmit(e){
//     const target = e.target;
//     const value = target.value;

//     this.setState({
//         abc: value
//     })
//     e.preventDefault();
// };
//   setMode = (mode) => {
//     this.setState({
//       mode,
//     });
//   };


//   renderForgot = () => {
//     console.log(this.state.userData);

//     return (
//       <div>
//         <p>Forgat Password</p>
//         <a
//           href="#"
//           onClick={(e) => {
//             e.preventDefault();
//             this.setMode("login");
//           }}
//         >
//           <label
//                   htmlFor="recipient-name"
//                   className="col-form-label label-left"
//                 >
//                   Enter Email
//                 </label>
//           <input
//                   type="text"
//                   className="form-control"
//                   name="name"
//                   onChange={this.onChange}
//                 />
//                 <label
//                   htmlFor="recipient-name"
//                   className="col-form-label label-left"
//                 >
//                   Password
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   name="name"
//                   onChange={this.onChange}
//                 />
//           Back to Login
//         </a>
//       </div>
//     );
//   };

//   renderRegister = () => {
//     return (
//       <div>
//         <div>
//           <div className="modal-body">
//             <div className="already_create">
//               <h5 className="modal-title" id="exampleModalLabel">
//                 Create Account
//               </h5>
//               <h4>
//                 Already have an account?{" "}
//                 <a
//           href="#"
//           onClick={(e) => {
//             e.preventDefault();
//             this.setMode("login");
//           }}
//         >
//           Login
//         </a>
//               </h4>
//             </div>
//             <Register/>
//           </div>
//         </div>
        
//       </div>
//     );
//   };

//   renderLogin = () => {
//     return (
//       <div>
//         <div className="modal-body">
//           <div className="already_create">
//             <h5 className="modal-title" id="exampleModalToggleLabel">
//               Login
//             </h5>
//             <h4>
//               Don't have an account?{" "}
//               <a
//           href="#"
//           onClick={(e) => {
//             e.preventDefault();
//             this.setMode("register");
//           }}
//         >
//           Sign Up
//         </a>
//             </h4>
//           </div>
//          <Login/>
//         </div>
        
//       </div>
//     );
//   };

//   render() {
//     return (
//       <div>
//         <Modal
//           show={this.props.showModal}
//           onHide={this.props.onClose}
//           onSubmit={this.onSubmit}
//           bsSize="large"
//         >
//           <Modal.Header closeButton={true}>
//             <h2>
//               {this.state.mode === "login"
//                 ? "Login"
//                 : this.state.mode === "register"
//                 ? "Register"
//                 : "Forgot Password"}
//             </h2>
//           </Modal.Header>
//           <Modal.Body>
//             {this.state.mode === "login"
//               ? this.renderLogin()
//               : this.state.mode === "register"
//               ? this.renderRegister()
//               : this.renderForgot()}
//           </Modal.Body>
//         </Modal>
//       </div>
//     );
//   }
// }

// export default LoginForm;
