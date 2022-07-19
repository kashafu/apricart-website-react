import React from 'react'
import Image from 'next/image';
import cartIcon from '../../../../public/assets/svgs/cartIcon.svg'

export default class MainPage extends React.Component {
  render() {
    return (
      <button onClick={this.props.toggle} className='flex items-center'>
        <Image
          src={cartIcon}
          height={45}
          width={45}
        />
      </button>
      // {/* <li className="nav-item" onClick={this.props.toggle}>
      //   <a className="nav-link openbtn">
      //     <Image src={cartIcon}
      //       width={45} height={45}
      //       className="" alt=''
      //     />
      //   </a>
      // </li> */}
    )
  }
}