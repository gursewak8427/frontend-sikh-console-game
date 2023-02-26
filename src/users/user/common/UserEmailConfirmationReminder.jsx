import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate, useLocation, useParams } from "react-router-dom"
import { getToken } from '../../../helper/auth';

const UserEmailConfirmationReminder = () => {
    const [state, setState] = useState({
        email: "",
        token: getToken("user")
    })
    const Resend = () => {
        if (state.token) {
            const config = { headers: { "Authorization": `Bearer ${state.token}` } }
            axios.post(process.env.REACT_APP_NODE_URL + "/user/resend_confirmation_email", {}, config).then(res => {
                // window.location.href = "/user/"
                alert("Email send successfully")
            }).catch(err => {
                console.log(err.response.data)
            })
        }
    }

    return (
        <>
            <div className="reminder-menu">
                <span>Email verification is pending</span>
                <span className='resend' onClick={Resend}>Resend email</span>
            </div>
        </>
    )
};

export default UserEmailConfirmationReminder;