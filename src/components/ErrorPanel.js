import React from 'react';

const ERROR_MESSAGES = {
    NETWORK_ERROR_MESSAGE: "Unable to contact servers! Please check your internet connection and retry"
}

const ErrorPanel = (props) => (
    <div className="error-panel" role="alert">
        <p>{props.message}</p>
    </div>
)

export default ErrorPanel;
export {ERROR_MESSAGES};