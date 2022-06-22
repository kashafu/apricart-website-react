import React from 'react'

export default class MenuBtn extends React.Component {
   render(){
     return (
        <div>
          <li className="nav-item" onClick={this.props.toggle}> 
                <a className="nav-link openbtn">
                 Catagory
                </a>
               
              </li>
        </div>
     )
    }   
}