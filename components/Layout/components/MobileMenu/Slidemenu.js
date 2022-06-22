import React, { useEffect, useState } from "react";
import MobileCatagory from '../Categories/MobileCatagory'
const Slidemenu = (props) => {
    let drawerClasses = "menu-drawer";
    if (props.show) {
      drawerClasses = "menu-drawer open1";
    }
  return (

    <>
      <div className="menubarD">
        <div className={drawerClasses}>
         <MobileCatagory/>
        </div>
      </div>
    </>
  );
};

export default Slidemenu;
