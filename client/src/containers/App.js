import NavContainer from './NavContainer'
var React = require('react');

export default class App extends React.Component{

  render(){
    return (
      <div className='mdl-layout mdl-js-layout mdl-layout-fixed-header'>
      	<NavContainer/>
      	<main className=''>
      		
        		{this.props.children}

        </main>
      </div>
    )
  }

}
