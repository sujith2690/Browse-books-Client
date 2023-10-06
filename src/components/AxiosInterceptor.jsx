import React from 'react';
import { useSelector } from 'react-redux';

function AxiosInterceptor() {

    const authToken = useSelector((state) => state.auth);
    console.log(authToken, '------authToken-------');
    if (authToken) {
        return authToken
    }
    return null;
}

export default AxiosInterceptor;
