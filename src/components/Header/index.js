import './index.css'
import {
    updateUserDetails, updateAuthenticationStatus, resetAuthDetails
} from '../../features/picturesSlice';

import { useSelector, useDispatch } from 'react-redux';
import { useAuth0 } from "@auth0/auth0-react";

import React, { useEffect } from 'react'

const Header = () => {
    const dispatch = useDispatch()
    const userDetails = useSelector((state) => state.userDetails)
    const authenticatedStatus = useSelector((state) => state.isAuthenticated)

    const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

    useEffect(() => {
        dispatch(updateUserDetails(user))
        dispatch(updateAuthenticationStatus(isAuthenticated))
    }, [isAuthenticated])

    const onLoginButtonClicked = () => {
        loginWithRedirect()
    }

    const onLogoutButtonClicked = () => {

        logout(logout({ logoutParams: { returnTo: window.location.origin } }))
        dispatch(resetAuthDetails())
    }

    return (
        <nav className='navbar'>
            <h1 className='riseup-heading'>RiseUpp</h1>
            <div className='profile-container'>
                <img className='user-profile-image'
                    src={authenticatedStatus ? userDetails.picture : 'https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg'}
                />
                <span>{authenticatedStatus ? userDetails.given_name : null}</span>

                {authenticatedStatus
                    ? <button className='login-button logout-button' onClick={onLogoutButtonClicked}>Logout</button>
                    : <button className='login-button' onClick={onLoginButtonClicked}>Login</button>}
            </div>
        </nav>
    )
}

export default Header
