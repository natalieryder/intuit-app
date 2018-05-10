import React from 'react';
import Post from './Post';

const PostList = props => (
	<div className="container">
		{/* To Do: map the posts to the Post component */}
		<Post/> 
		<Post/>
	</div>
)

export default PostList;