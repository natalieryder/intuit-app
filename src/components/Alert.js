import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import { Link } from 'react-router-dom';
import Post from './Post';

class AlertDialog extends React.Component {
  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
        {this.props.post
          ?  (
              <div>
                <DialogTitle id="alert-dialog-title">Success! You Posted:</DialogTitle>
                <DialogContent>
                  <Post {...this.props.post } />
                </DialogContent>

                
                <DialogActions>
                  <Link to="/">
                    <Button onClick={this.props.handleClose} color="primary" autoFocus>
                      Okay
                    </Button>
                  </Link>
                </DialogActions>
              </div>
          )
          : (
            <div>
              <DialogContent>{this.props.errorMessage}</DialogContent>
                <DialogActions>
                      <Button onClick={this.props.handleClose} color="primary" autoFocus>
                        Okay
                      </Button>
                </DialogActions>
            </div>
            )
        }
        </Dialog>
      </div>
    );
  }
}

export default AlertDialog;
