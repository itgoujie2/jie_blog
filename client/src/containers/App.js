import NavContainer from './NavContainer'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
var React = require('react');

export default class App extends React.Component{

  render(){
    return (
      <div>
      	<NavContainer/>
        {this.props.children}
      </div>
    )
  }

}
