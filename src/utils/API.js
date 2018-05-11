import axios from "axios";

export default {

  getPosts: function() {
  	return axios.get("https://jsonplaceholder.typicode.com/posts");
  },
  createPost: function(post) {
    return axios.post("https://jsonplaceholder.typicode.com/posts", post)
  }

};
