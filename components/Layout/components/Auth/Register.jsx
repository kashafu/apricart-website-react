import Link from "next/link";
import PhoneInput from "react-phone-input-2";
import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {


  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  //myHeaders.append("Access-Control-Allow-Origin", "*");
  // const{ name,
  //   email,
  //   phoneNumber,
  //   password} =userData
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userData);
    try {
      const response = await axios.post(
        "https://staging.apricart.pk/v1/auth/open/register",
       { ...userData} 
      );
   
      toast.success(response.data.message);
      setCookie("register");
      setCookie("token", response.data.data.token, { path: "/address" });
    } catch (err) {
      //const Error = err.response.data;
      console.log(err);
      toast.error(Error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="recipient-name" className="col-form-label label-left">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="recipient-name" className="col-form-label label-left">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <label htmlFor="exampleFormControlInput1" className="label-left">
          Phone
        </label>
        <div className="input-group mb-3">
          <span className="input-group-text" id="inputGroup-sizing-sm">
            +92
          </span>
          <input
            type="tel"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder=""
            name="phoneNumber"
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className="input-group mb-3">
          {/* <PhoneInput
                    country="pk"
                    value={PhoneInput.value}
                    onChange={(e) => setPhone(e.target.value)}
                  /> */}
        </div>
        <div className="mb-3">
          <label htmlFor="recipient-name" className="col-form-label label-left">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="mb-3">
          <button className="btn3">Register</button>
        </div>
      </form>
    </>
  );
};

export default Register;
