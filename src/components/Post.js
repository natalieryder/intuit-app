import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

// create modular override styles for this component
const styles = {
  card: {
    minWidth: 275,
    marginTop: '20px',
    marginBottom: '20px',
    marginRight: '24px',
    marginLeft: '24px',
    animation: 'fadeIn .5s'
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    fontWeight: 500
  },
};

function Post(props) {
  const { classes } = props;

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary">
           User Id: {props.userId} | Post Id: {props.id}
          </Typography>
          <Typography variant="headline" component="h3">
            {props.title}
          </Typography>
          
          <Typography component="p">
            {props.body}
          </Typography>
        </CardContent>
      
      </Card>
    </div>
  );
}

Post.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Post);