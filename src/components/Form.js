import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button'
import { FormControl } from 'material-ui/Form';
/* themeing */
import { createMuiTheme } from 'material-ui/styles';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Orange from 'material-ui/colors/orange';
import lightBlue from 'material-ui/colors/lightBlue';


const theme = createMuiTheme({
  palette: {
    primary: {
    	main: lightBlue[500],
    	dark: lightBlue[700],

    },
    secondary: {
    	main: Orange[900],
    },
  },
})


const styles = {
  formWrapper: {
    minWidth: 275,
    marginTop: '20px',
    marginRight: '24px',
    marginLeft: '24px'
  },
  marginY: {
    marginTop: '20px',
    marginBottom: '20px'
  },
  error: {
  	marginRight: '20px',
  	textAlign: 'right',
  },
  errorOn: {
  	color: '#ff0000',
  },
};

class Form extends Component {
	state = {
		userId: '',
		title: '',
		body: '',
		characters: 140,
		errors: {},
		areThereErrors: false
	}
	handleInput = prop => event => {
		let errors = {...this.state.errors}
		var charactersLeft = this.state.characters;
		// if they type and then delete, show the error state
		if (!event.target.value.length) {
			errors[prop] = true;
		} else {
			errors[prop] = false;
		}
		if (prop === "body") {
			let length = event.target.value.length;
			charactersLeft = 140 - length;
			if (charactersLeft < 0 || charactersLeft > 130) {
				errors.body = true;
			}
		}
		let areThereErrors = this.checkErrors(errors);
		
		this.setState({[prop]: event.target.value, characters:charactersLeft, errors, areThereErrors});
	}
	handlePost = () => {
		let { userId, title, body } = this.state;
		// there aren't any errors and all three fields have a value, post
		if (!this.state.areThereErrors && userId && title && body) {
			this.props.createPost({
				userId,
				title,
				body
			})
			this.setState({userId: '', title: '', body: ''})
		} else {
			this.props.showError("Please fill all fields")
		}
	}

	checkErrors = (errorObj) =>  {
		let areThereErrors = Object.keys(errorObj).reduce((errorBool, key) => {
			// if there are any errors, return true, otherwise it will remain false
			if (errorObj[key]) {
				errorBool = true
			} 
			return errorBool;
		},false)
		return areThereErrors;
	}

	render() {
		let classes = this.props.classes;

		return (
			<MuiThemeProvider theme={theme}>
				<div className={classes.formWrapper}>
					<FormControl fullWidth>
						<TextField 
							className={classes.marginY}
							label="UserId"
							error={this.state.errors.userId}
							value={this.state.userId}
							onChange={this.handleInput("userId")}/>
						<TextField
						className={classes.marginY}
							label="Title"
							error={this.state.errors.title}
							value={this.state.title}
							onChange={this.handleInput("title")}/>
						<TextField 
							className={classes.marginY}
							label="Body"
							error={this.state.errors.body}
							value={this.state.body}
							onChange={this.handleInput("body")}
							multiline={true}
							rows={3}/>

						<div className={`${classes.error} ${(this.state.characters < 0) ? classes.errorOn : ''}`}>
							{(this.state.characters > 130) 
			            		? 'Type ' + (this.state.characters - 130) + ' more characters'
			            		: this.state.characters + ' remaining'}
			            </div>
			            
					</FormControl>
					<Button color='secondary' disabled={this.state.areThereErrors} variant='raised' onClick={this.handlePost}> Post </Button>
				</div>
			</MuiThemeProvider>
		)
	}
};

export default withStyles(styles)(Form);