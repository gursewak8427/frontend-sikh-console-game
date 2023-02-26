import { Switch } from "@mui/material";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link, Navigate, redirect } from "react-router-dom";
import { getCookie, setCookie } from "../../../helper/auth";
import Papa from "papaparse";
import Dashboard from "../Screens/Dashboard/Dashboard";
// import "./Addschoolname.css";
import { useDropzone } from 'react-dropzone'

// web-socket
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:3006";
console.log("COnnecting")
var socket = socketIOClient(ENDPOINT);

const Addschoolname = () => {
    const [state, setState] = useState({
        schoolName: "",
        schoolLogo: "",
        isWait: false,
        list: []
    })

    useEffect(() => {
        axios
            .get(process.env.REACT_APP_NODE_URL + "/admin/schoolnames").then(response => {
                console.log(response)
                if (response.data.status == "1") {
                    setState({
                        ...state,
                        list: response.data.details.list,
                    })
                }
            })
    }, [])

    const handleChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }


    const handleFileChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.files[0]
        })
    }

    const uploadData = async () => {
        try {
            const fd = new FormData();
            fd.append('schoolName', state.schoolName);
            fd.append('image', state.schoolLogo);
            let response = await axios
                .post(process.env.REACT_APP_NODE_URL + "/admin/addschoolname", fd)

            if (response.data.status == "1") {
                setState({
                    ...state,
                    countryName: "",
                    countryFlag: "",
                    list: [...state.list, response.data.details.newSchoolName]
                })
            }
            alert(response.data.message)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div heading_title={"Add School Detail"}>
                <>
                    <div className="row addCountryPage flex flex-row">
                        <div class="shadow-lg w-5/12 mx-auto my-4 p-2">
                            <div class="card-body">
                                <label>School</label>
                                <div class="mb-3">
                                    <input
                                        placeholder="Enter School Name"
                                        type="text" class="block w-full flex-1 border-gray-300 focus:border-black border-2 border-gray p-2 w-full focus:ring-indigo-500 sm:text-sm   " name="schoolName" value={state.schoolName} onChange={handleChange} />
                                </div>
                                <label>Logo</label>
                                <div class="mb-3">
                                    <input type="file"
                                        className="form-control
                                    block
                                    w-full
                                    px-3
                                    py-1.5
                                    text-base
                                    font-normal
                                    text-gray-700
                                    bg-white bg-clip-padding
                                    border border-solid border-gray-300
                                    rounded
                                    transition
                                    ease-in-out
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        name="schoolLogo" onChange={handleFileChange} />
                                </div>
                                <button type="button" class="btn bg-gradient-primary w-100 ml-2 mt-4 text-white px-2 py-1 rounded mb-0" onClick={uploadData}>Upload</button>
                            </div>
                        </div>
                        <div className="mx-auto w-5/12 my-4 p-2">
                            <div class="flex flex-col">
                                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                        <div class="overflow-hidden">
                                            <table class="min-w-full">
                                                <thead class="bg-white border-b">
                                                    <tr>
                                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                            #
                                                        </th>
                                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                            School Name
                                                        </th>
                                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                            Logo
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        state.list.map((school, index) => {
                                                            return <tr class="bg-gray-100 border-b">
                                                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                                                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                    {school.schoolName.toUpperCase()}
                                                                </td>
                                                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                    <img width={100} src={process.env.REACT_APP_NODE_URL + "/uploads/agent/" + school.schoolLogo} alt="" />
                                                                </td>
                                                            </tr>
                                                        })
                                                    }

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            </div>
        </>
    )
}

export default Addschoolname;