import React from 'react'
export default class Backmenu extends React.Component {
  render(){
    return(
      <div
        className="backmenu"
        onClick={this.props.close}
      />
    )
  }
}