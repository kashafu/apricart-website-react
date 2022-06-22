import React, { useState } from 'react'
import {
  Navbar,
  NavDropdown,
  MenuItem,
  NavItem,
  Nav,
  Popover,
  Tooltip,
  Button,
  Modal,
  OverlayTrigger
} from "react-bootstrap";
import CreateNewAccount from "../Registeration/Signup";

const Test = (props) => {

    const [showModal, setshowModal] = useState(false);
    const [smShow, setSmShow] = useState(false);
    const [mode, setMode] = useState('login');

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
      });
      

  return (
    <div>Test</div>
  )
}

export default Test