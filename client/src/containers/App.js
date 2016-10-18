import NavContainer from './NavContainer'
var React = require('react');

export default class App extends React.Component{

  render(){
    return (
      <div>
      	<NavContainer/>
      	<div id="base">
      	  <div id="content">
        		{this.props.children}
          </div>
        </div>
      </div>
    )
  }

}
