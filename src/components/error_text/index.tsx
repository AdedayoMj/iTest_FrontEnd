import React from 'react';

export interface IErrorTextProps {
    error: string | undefined;
}
//Function to ouput error information
const ErrorText: React.FunctionComponent<IErrorTextProps> = (props) => {
    const { error } = props;

    if (error === '') return null;

    return <small className="text-danger">{error}</small>;
};

export default ErrorText;
