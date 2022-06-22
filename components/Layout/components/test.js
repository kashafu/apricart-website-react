import React from 'react'
import MainPage from '../components/Cart/CartBtn'
import SlideDrawer from '../components/SlideDarwer/SlideDrawer'
import Backdrop from '../components/SlideDarwer/Backdrop'
export default class App extends React.Component {
   state = { drawerOpen: false }
drawerToggleClickHandler = () => {
    this.setState({
      drawerOpen: !this.state.drawerOpen
    })
  }
backdropClickHandler = () => {
    this.setState({
      drawerOpen: false
    })
  }
  
   render(){
      let backdrop;
      if(this.state.drawerOpen){
        backdrop = <Backdrop close={this.backdropClickHandler}/>;
       }
      return(

         <div>
           < SlideDrawer show={this.state.drawerOpen} />
           { backdrop }
           < MainPage toggle={this.drawerToggleClickHandler} />
         </div>
      )
    }
}