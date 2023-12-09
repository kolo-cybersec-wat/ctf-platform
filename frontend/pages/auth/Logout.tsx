import React from "react";
import {postData} from "../../fetchUtils";
import {Navigate} from "react-router-dom";

export const logoutPageLoader = () => {
    return postData('/api/auth/logout/')
}

const LogoutPage = () => (
    <Navigate to="/" />
)

export default LogoutPage