import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import { Link } from 'react-router-dom';
import Post from './Post';
/* themeing */
import { createMuiTheme } from 'material-ui/styles';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Orange from 'material-ui/colors/orange';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: Orange[900],
    },
  },
})


const AlertDialog = props => {

    return (
      <MuiThemeProvider theme={theme}>
      <div>
        <Dialog
          open={props.open}
          onClose={props.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
        {props.post
          ?  (
              <div>
                <DialogTitle id="alert-dialog-title">Success! You Posted:</DialogTitle>
                <DialogContent>
                  <Post {...props.post } />
                </DialogContent>
                <DialogActions>
                  <Link to={process.env.PUBLIC_URL + "/"}>
                    <Button variant='raised' onClick={props.handleClose} color="primary" autoFocus>
                      Okay
                    </Button>
                  </Link>
                </DialogActions>
              </div>
          )
          : (
            <div>
              <DialogContent>{props.errorMessage}</DialogContent>
                <DialogActions>
                      <Button variant='raised' onClick={props.handleClose} color="primary" autoFocus>
                        Okay
                      </Button>
                </DialogActions>
            </div>
            )
        }
        </Dialog>
      </div>
      </MuiThemeProvider>
    );
}

export default AlertDialog;
