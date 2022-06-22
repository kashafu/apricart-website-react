import React from 'react'
import Image from 'next/image';
export default class MainPage extends React.Component {
   render(){
     return (
        <div>
          <li className="nav-item" onClick={this.props.toggle}> 
                <a className="nav-link openbtn">
                  <Image src="/assets/images/bag.png" 
                  width={18} height={18}
                  className="img-fluid" alt=''/> Cart
                </a>
               
              </li>
        </div>
     )
    }   
}