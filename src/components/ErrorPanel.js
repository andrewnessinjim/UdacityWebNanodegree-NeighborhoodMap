import React from 'react';

const ErrorPanel = (props) => (
    <div className="error-panel" role="alert">
        <p>{props.message}</p>
    </div>
)

export default ErrorPanel;