import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';
import { createMuiTheme } from 'material-ui/styles';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Orange from 'material-ui/colors/orange';
import './Nav.css'

const theme = createMuiTheme({
  palette: {
    primary: {
    	main: Orange[900],
    	light: '#fff'
    },
    secondary: {
    	main: '#fff'
    }
  },
})

const Nav = props => (
	<MuiThemeProvider theme={theme}>
		<AppBar color='primary' position={'static'}>
			<Toolbar>
				<Link to="/"><Button color='secondary'>Home</Button></Link>
				<Link to="/post"><Button color='secondary'>Post</Button></Link>
				
			</Toolbar>
		</AppBar>
	</MuiThemeProvider>
);

export default Nav;