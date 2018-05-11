import React from 'react';
import Post from './Post';
import ErrorComponent from './Error';
const PostList = (props) => {
		let loading = '';

		if (props.gettingPosts) {
			loading = <div className="std-margin"> loading... </div>
		}
		return (
		<div className="container">
			{props.err
				? <ErrorComponent> {props.err} </ErrorComponent>
				: props.posts.length < 1 
					? ''
				 	: 
				 	props.posts.map((post) => {
						return (<Post key={post.id} {...post}/>)

					})
			}
			{loading}
			
			{/* map the posts to the Post component */}
			
		</div>
		)

};

export default PostList;