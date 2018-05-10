import axios from "axios";

export default {

  getPosts: function() {
  	return axios.get("https://jsonplaceholder.typicode.com/posts");
  },

};
