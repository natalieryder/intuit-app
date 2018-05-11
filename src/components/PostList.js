import React from 'react';
import Post from './Post';
import ErrorComponent from './Error';
const PostList = (props) => {

		return (
		<div className="container">
			{props.err
				? <ErrorComponent> {props.err} </ErrorComponent>
				: props.posts.length < 1 
					? (<div> loading... </div>)
				 	: props.posts.map((post) => {
					return (<Post key={post.id} {...post}/>)
				})
			}
			
			{/* map the posts to the Post component */}
			
		</div>
		)

};

export default PostList;