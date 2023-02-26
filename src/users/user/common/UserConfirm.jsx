import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate, useLocation, useParams } from "react-router-dom"
import { getToken } from '../../../helper/auth';

const UserConfirm = () => {
    const { token } = useParams()
    useEffect(() => {
        // verify now
        if (token) {
            const config = { headers: { "Authorization": `Bearer ${token}` } }
            axios.post(process.env.REACT_APP_NODE_URL + "/user/confirm", {}, config).then(res => {
                // console.log(res)
                window.location.href = "/user/"
            }).catch(err => {
                console.log(err.response.data)
            })
        }
    }, [])

    return (
        <>
            Email verified Successfully as Agent
        </>
    )
};

export default UserConfirm;