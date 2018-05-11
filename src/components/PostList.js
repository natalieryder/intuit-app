import React from 'react';
import Post from './Post';

const PostList = (props) => {

		return (
		<div className="container">
			{/* map the posts to the Post component */}
			{props.posts.length < 1 
				? (<div> loading... </div>)
			 	: props.posts.map((post) => {
				return (<Post key={post.id} {...post}/>)
			})}
		</div>
		)

};

export default PostList;