import React , { Component }from 'react';
import { render } from 'react-dom';
import LoginForm from '../Account/AddressForm';
import CreateNewAccount from '../Registeration/Signup';

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
} from 'react-bootstrap';

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
};


export default class App extends Component {
  constructor(){
    super();
    this.state = {
      showModal : false,
      form : ''
    }
  }
  
  close = () => {
    this.setState ({ showModal: false });
  }



  open = () => {
    this.setState ({ showModal : true});
  }


  render(){
    const isLoggedIn = this.state.isLoggedIn;

    return (
      <div style={styles}>
       
        <Button type="button" className="btn btn-default" onClick={this.open}>
        Add Addess
        </Button>
        <LoginForm showModal={this.state.showModal} onClose = {this.close}  />
     </div>
    );
  }
}

