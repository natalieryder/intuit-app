import React from 'react';

const ErrorComponent = (props) => (
	<div>Something went wrong: {props.children}</div>		
)

export default ErrorComponent;