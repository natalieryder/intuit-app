import React, { Component } from 'react';
import logo from './logo.svg';
import { 
  BrowserRouter as Router,
  Route,
  Switch} from 'react-router-dom';
import Form from "./components/Form";
import PostList from "./components/PostList";
import NotFound from "./components/NotFound";
import Nav from "./components/Nav/Nav";
import Alert from "./components/Alert";
import API from './utils/API';

class App extends Component {
  state = {
    posts: [],
    alertIsOpen: false
  }
  componentDidMount() {
    this.getPosts();
  }

  getPosts = () => {
    API.getPosts()
    .then(response => {
      this.setState({posts: response.data})
    })
    .catch(err => {
      //handle failure
      this.setState({fetchError: err.message}, () => console.log(this.state.error));
    })
  }

  createPost = (post) => {
    API.createPost(post)
    .then(response => {
      // show an alert with the post data
      this.setState({newPost: response.data})
      this.showAlert();
      /*Since the API doesn't actually add the post
      spoof it my prepending the new post to the post object
      works until the app.js gets mounted again, which resets the post object
      React will show error about keys because every new post has the same post id */
      let posts = this.state.posts.slice();
      posts.unshift(response.data);
      this.setState({posts: posts});
    })
    .catch(err => {
      //handle failure
      this.setState({errorMessage: err.message});
      this.showAlert();
    })
  }

  showAlert = () => {
    this.setState({ alertIsOpen: true});
  }

  handleClose = () => {
    this.setState({ alertIsOpen: false });
  }

  showError = (message) => {
    this.setState({errorMessage: message});
    this.showAlert();
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Nav/>
            <Switch>
              <Route exact path="/" render={(props) => <PostList posts={this.state.posts} err={this.state.fetchError}/>}/>
              <Route exact path="/post" render={(props) => <Form createPost={this.createPost} showError={this.showError}/>}/>
              <Route component={NotFound} />         
            </Switch>
            <Alert open={this.state.alertIsOpen} handleClose={this.handleClose} message={this.state.modalMessage} post={this.state.newPost} errorMessage={this.state.errorMessage}/>

          </div>
        </Router>
        
      </div>
    );
  }
}

export default App;
