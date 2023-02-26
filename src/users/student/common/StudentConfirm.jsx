import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate, useLocation, useParams } from "react-router-dom"
import { getToken } from '../../../helper/auth';

const StudentConfirm = () => {
    const { token } = useParams()
    useEffect(() => {
        // verify now
        if (token) {
            const config = { headers: { "Authorization": `Bearer ${token}` } }
            axios.post(process.env.REACT_APP_NODE_URL + "/student/confirm", {}, config).then(res => {
                // console.log(res)
                window.location.href = "/student/"
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

export default StudentConfirm;