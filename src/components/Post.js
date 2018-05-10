import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';


// create modular override styles for this component
const styles = {
  card: {
    minWidth: 275,
    marginTop: '20px',
    marginRight: '24px',
    marginLeft: '24px'
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
            Post by user
          </Typography>
          <Typography variant="headline" component="h3">
            Post Title
          </Typography>
          
          <Typography component="p">
            Post content Lorem ipsum dolor sit amet, consectetur adipisicing elit. In exercitationem quam dolores.
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