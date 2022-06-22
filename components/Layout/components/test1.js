import React, { useState, useContext } from 'react'
import MenuBtn from '../components/Cart/MenuBtn'
import SlideMenu from '../components/MobileMenu/Slidemenu'
import Backmenu from '../components/MobileMenu/Backmenu'
import { AppContext } from '../Layout'

function CategoryBtn() {
  // const [state, setState] = useState({ drawerOpen: false })
  const { appState, handleAppState } = useContext(AppContext)
  console.log({ appState })
  const drawerToggleClickHandler = () => {
    handleAppState({
      "sideDrawerStatus": !appState.sideDrawerStatus
  })
    // setState({
    //   drawerOpen: !state.drawerOpen
    // })
  }
  const backdropClickHandler = () => {
    handleAppState({
      "sideDrawerStatus": false
  })
   
  }

  let backdrop;
  if (appState.sideDrawerStatus) {
    backdrop = <Backmenu close={backdropClickHandler} />;
  }

  return (
    <>
      < SlideMenu show={appState.sideDrawerStatus} />
      {backdrop}
      < MenuBtn toggle={drawerToggleClickHandler} />
    </>
  )
}

export default CategoryBtn;