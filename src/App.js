import React, { Component } from 'react';
import { 
  BrowserRouter as Router,
  Route,
  Switch} from 'react-router-dom';
import Form from "./components/Form";
import PostList from "./components/PostList";
import NotFound from "./components/NotFound";
import Nav from "./components/Nav";
import Alert from "./components/Alert";
import API from './utils/API';
import './App.css';

class App extends Component {
  state = {
    posts: [],
    visiblePosts: [],
    alertIsOpen: false,
    offset: 0,
    gettingPosts: false,
    morePosts: true
  }
  componentDidMount() {
    this.getPosts();
    window.addEventListener("scroll", this.handleScroll);
  }

  getPosts = () => {
    this.setState({gettingPosts: true});
    API.getPosts()
    .then(response => {
      this.setState({posts: response.data}, this.setVisiblePosts);
    })
    .catch(err => {
      //handle failure
      this.setState({fetchError: err.message, gettingPosts: false})
    })
  }
  
  // limit the number of posts shown on initial load to 10
  setVisiblePosts = () => {
    this.setState({gettingPosts: true});
    let visiblePosts = this.state.visiblePosts.slice();
    let offset = this.state.offset;
    let newPosts = this.state.posts.slice(offset, offset + 10);

    //if there are any more posts, add them to visiblePosts and increase offset by 10
    //otherwise, set morePosts to false
    if (newPosts.length) {
      visiblePosts = visiblePosts.concat(newPosts);
      //set timeout to pretend we are waiting for an API call
      setTimeout( () =>
        this.setState({visiblePosts, offset: offset + 10, gettingPosts: false}),
      500)
    
    } else {
      this.setState({morePosts: false});
    }
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
      let visiblePosts = this.state.visiblePosts.slice();
      visiblePosts.unshift(response.data);
      this.setState({visiblePosts});
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
  
  // implementing infinite scroll

  handleScroll = () => {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight - 30) {
      // if we're not already getting the next posts, get the next posts
      if (!this.state.gettingPosts && this.state.morePosts) {
        this.setVisiblePosts()
      }
    }
  }
  render() {
    return (
      <div>
        <Router>
          <div>
            <Nav/>
            <Switch>
              <Route exact path={process.env.PUBLIC_URL + "/"} render={(props) => <PostList posts={this.state.visiblePosts} err={this.state.fetchError} gettingPosts={this.state.gettingPosts && this.state.morePosts}/>}/>
              <Route exact path={process.env.PUBLIC_URL + "/post"} render={(props) => <Form createPost={this.createPost} showError={this.showError}/>}/>
              <Route component={NotFound} />         
            </Switch>
            <Alert open={this.state.alertIsOpen} handleClose={this.handleClose} post={this.state.newPost} errorMessage={this.state.errorMessage}/>
          </div>
        </Router>
        
      </div>
    );
  }
}

export default App;
