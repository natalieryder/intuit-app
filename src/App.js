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

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Nav/>
            <Switch>
              <Route exact path="/" component={PostList}/>
              <Route exact path="/post" component={Form}/>
              <Route component={NotFound} />         
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
