import NavContainer from './NavContainer'
var React = require('react');

export default class App extends React.Component{

  render(){
    return (
      <div className="base">
      	<NavContainer/>
    	  <div className="container">
      		{this.props.children}
        </div>
      </div>
    )
  }

}
