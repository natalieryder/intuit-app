import React from 'react';

const ErrorComponent = (props) => (
	<div className="std-margin">Something went wrong: {props.children}</div>		
)

export default ErrorComponent;