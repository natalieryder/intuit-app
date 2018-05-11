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
import API from './utils/API';

class App extends Component {
  state = {
    posts: []
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
      console.log(err);
    })
  }
  
  createPost = (post) => {
    API.createPost(post)
    .then(response => {
      console.log(response)
    })
    .catch(err => {
      console.log(err)
    })
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Nav/>
            <Switch>
              <Route exact path="/" render={(props) => <PostList posts={this.state.posts}/>}/>
              <Route exact path="/post" render={(props) => <Form createPost={this.createPost}/>}/>
              <Route component={NotFound} />         
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
