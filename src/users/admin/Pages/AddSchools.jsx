import { Switch } from "@mui/material";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link, Navigate, redirect } from "react-router-dom";
import { getCookie, setCookie } from "../../../helper/auth";
import Papa from "papaparse";
import Dashboard from "../Screens/Dashboard/Dashboard";
// import "./AddSchools.css";
import { useDropzone } from 'react-dropzone'

// web-socket
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:3006";
console.log("COnnecting")
var socket = socketIOClient(ENDPOINT);
// if (!getCookie("socket")) {
// } else {
//     var socketId = getCookie("socket")
//     var socket = socketIOClient(ENDPOINT, {
//         query: {
//             socketId: socketId
//         }
//     });
//     console.log("Tryping to connect with old ID", socketId)
// }

const AddSchools = () => {
    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            handleFileUpload({ target: { files: [file], name: "csv_attachment" } })
        })

    }, [])
    const { getRootProps, getInputProps } = useDropzone({ onDrop })
    var visitedSchoolPrograms = []
    var totalErrors 
    const [state, setState] = useState({
        progress: 0,
        csv_attachment: "",
        csvData: [],
        isUploadingStart: false,
        fileUploadedStatus: false,

        // requiredColumns: [],
        requiredColumns: [0, 1, 2, 3, 4, 5, 14, 15, 16],

        countryList: [],
        schoolsList: [],
        isWait: true,
    })
    var visitedSchools = [];
    var errorFieds = 0

    // socket.on("Connected", data => {
    //     console.log({ data })
    //     setCookie("socket", data.socketId)
    // });



    const handleFileUpload = (e) => {
        console.log([e.target.name, e.target.files])
        setState({
            ...state,
            [e.target.name]: e.target.files[0]
        });
    }

    // new api one by one row data will send to api
    // const uploadData = async () => {
    //     // upload_status_
    //     let headers = state.csvData[0]; // these are splitted fields of header
    //     let totalData = state.csvData[1]; // these are list of rows and fields are qomma separated
    //     setState({
    //         ...state,
    //         isDataUploadingStart: true,
    //     })
    //     let totalUploadedFiles = 0;
    //     let totalErrorFiles = 0;


    //     let res = await axios.post(process.env.REACT_APP_NODE_URL + "/admin/uploadcsv", , config)

    //     totalData.map(async (rowData, index) => {
    //         const config = {
    //             onUploadProgress: progressEvent => {
    //                 let progress = (progressEvent.loaded / progressEvent.total) * 100;
    //                 document.getElementById(`uploadStatus_${index}`).classList.add("successUploading")
    //                 document.getElementById(`uploadStatus_${index}`).innerText = `${progress}%`
    //             }
    //         }


    //         const changeState = () => {
    //             let progressDiv = document.getElementById("progressDiv");
    //             let progressInput = document.getElementById("progressInput");
    //             let ProgressBarAnimation = document.getElementById("ProgressBarAnimation");

    //             if (index + 1 == totalData.length) {
    //                 console.log([totalUploadedFiles, totalErrorFiles])
    //                 setState({
    //                     ...state,
    //                     uploadedFilesCount: totalUploadedFiles,
    //                     failedFilesCount: totalErrorFiles,
    //                     isDataUploadingStart: true,
    //                 })
    //                 progressDiv.innerText = parseInt((parseInt(progressInput.value) + 1) * 100 / state.totalFilesCount, 10)
    //                 ProgressBarAnimation.style.width = parseInt((parseInt(progressInput.value) + 1) * 100 / state.totalFilesCount, 10) + "%"
    //                 if (parseInt((parseInt(progressInput.value) + 1) * 100 / state.totalFilesCount, 10) == 100) {
    //                     ProgressBarAnimation.classList.add("bg-success")
    //                     ProgressBarAnimation.classList.remove("progress-bar-animated")
    //                 }
    //                 progressInput.value = parseInt(progressInput.value) + 1
    //             } else {
    //                 progressDiv.innerText = parseInt((parseInt(progressInput.value) + 1) * 100 / state.totalFilesCount, 10)
    //                 ProgressBarAnimation.style.width = parseInt((parseInt(progressInput.value) + 1) * 100 / state.totalFilesCount, 10) + "%"
    //                 if (parseInt((parseInt(progressInput.value) + 1) * 100 / state.totalFilesCount, 10) == 100) {
    //                     ProgressBarAnimation.classList.add("bg-success")
    //                     ProgressBarAnimation.classList.remove("progress-bar-animated")
    //                 }
    //                 progressInput.value = parseInt(progressInput.value) + 1
    //             }
    //         }
    //         try {
    //             let res = await axios.post(process.env.REACT_APP_NODE_URL + "/admin/uploadcsv", {}, config)

    //             totalUploadedFiles++;
    //             document.getElementById(`uploadStatus_${index}`).classList.add("successUploading")
    //             document.getElementById(`uploadStatus_${index}`).classList.remove("errorUploading")
    //             document.getElementById(`uploadStatus_${index}`).innerText = "Uploaded"

    //             // changeState()
    //         } catch (error) {
    //             console.log("error", error)
    //             document.getElementById(`uploadStatus_${index}`).classList.add("errorUploading")
    //             document.getElementById(`uploadStatus_${index}`).classList.remove("successUploading")
    //             document.getElementById(`uploadStatus_${index}`).innerText = "Failed"
    //             totalErrorFiles++;

    //             // changeState()
    //         }
    //     })

    // }

    // old api

    const uploadData = async () => {
        if (errorFieds != 0) {
            alert(`Failed: Invalid ${errorFieds} Fields.`);
            return;
        }
        if (state.csv_attachment == "") {
            alert("Please upload the file")
            return;
        }
        setState({
            ...state,
            isUploadingStart: true,
        })
        const fd = new FormData();
        fd.append('csv_attachment', state.csv_attachment);

        try {
            let ProgressBarAnimation = document.getElementById("ProgressBarAnimation");
            let progressInput = document.getElementById("progressInput");
            const config = {
                onUploadProgress: progressEvent => {
                    let progress = (progressEvent.loaded / progressEvent.total) * 100;
                    console.log(progress)
                    ProgressBarAnimation.classList.add("bg-blue-600")
                    // document.getElementById(`uploadStatus_${index}`).classList.add("successUploading")
                    // document.getElementById(`uploadStatus_${index}`).innerText = `${progress}%`

                    // ProgressBarAnimation.style.width = progress + "%"
                    // ProgressBarAnimation.innerText = parseInt(progress, 10) + "%"
                    // if (progress == 100) {
                    //     ProgressBarAnimation.classList.add("bg-success")
                    //     ProgressBarAnimation.classList.remove("progress-bar-animated")
                    // } else {
                    //     ProgressBarAnimation.classList.remove("bg-success")
                    //     ProgressBarAnimation.classList.add("progress-bar-animated")
                    // }
                }
            }


            let response = await axios
                .post(process.env.REACT_APP_NODE_URL + "/admin/uploadcsv", fd, config)

            console.log(response)

            socket.emit("upload_csv_websocket_custom_validation", response.data)
            // socket.emit("upload_csv_websocket", response.data)

            var complete = 0;
            var total = 0;
            var result = [0, 0, 0] // uploaded, updated, failed
            socket.on("FromAPI", data => {
                if (data.total) {
                    total = data.total
                }
                if (data.index != undefined || data.index != null) {
                    let index = data.index
                    complete++;
                    let progress = complete * 100 / total
                    ProgressBarAnimation.style.width = progress + "%"
                    if (progress > 45) {
                        ProgressBarAnimation.innerText = `(${complete}-${total}) ${parseInt(progress, 10)}%` // show percentage
                    }
                    if (progress == 100) {
                        // ProgressBarAnimation.classList.add("bg-green")
                        ProgressBarAnimation.classList.remove("progress-bar-animated")
                        ProgressBarAnimation.classList.add("bg-green-600")
                    } else {
                        // ProgressBarAnimation.classList.remove("bg-red")
                        ProgressBarAnimation.classList.add("progress-bar-animated")
                    }
                    if (data.message == "Uploaded") {
                        result[0] = result[0] + 1
                        document.getElementById(`uploadStatus_${index}`).classList.add("text-[#16a34a]")
                        document.getElementById(`uploadStatus_${index}`).classList.remove("text-[#dc2626]")
                        document.getElementById(`uploadStatus_${index}`).classList.remove("text-[#4338ca]")
                        document.getElementById(`uploadStatus_${index}`).innerText = "Uploaded"
                    }
                    if (data.message == "Updated") {
                        result[1] = result[1] + 1
                        document.getElementById(`uploadStatus_${index}`).classList.remove("text-[#dc2626]")
                        document.getElementById(`uploadStatus_${index}`).classList.remove("text-[#16a34a]")
                        document.getElementById(`uploadStatus_${index}`).classList.add("text-[#4338ca]")
                        document.getElementById(`uploadStatus_${index}`).innerText = "Updated"
                    }
                    if (data.message == "Failed") {
                        result[2] = result[2] + 1
                        document.getElementById(`uploadStatus_${index}`).classList.add("text-[#dc2626]")
                        document.getElementById(`uploadStatus_${index}`).classList.remove("text-[#16a34a]")
                        document.getElementById(`uploadStatus_${index}`).classList.remove("text-[#4338ca]")
                        document.getElementById(`uploadStatus_${index}`).innerText = "Failed"
                        console.log({ data })
                        document.getElementById(`uploadStatus_${index}`).setAttribute("title", data.details)
                    }
                    if (data.message == "--") {
                        result[2] = result[2] + 1
                        document.getElementById(`uploadStatus_${index}`).classList.add("text-danger")
                        document.getElementById(`uploadStatus_${index}`).classList.remove("text-success")
                        document.getElementById(`uploadStatus_${index}`).classList.remove("text-primary")
                        document.getElementById(`uploadStatus_${index}`).innerText = "--"
                        console.log({ data })
                        document.getElementById(`uploadStatus_${index}`).setAttribute("title", data.details)
                    }

                    document.getElementById(`uploadedCount`).innerText = result[0]
                    document.getElementById(`updatedCount`).innerText = result[1]
                    document.getElementById(`failedCount`).innerText = result[2]
                    document.getElementById(`totalCount`).innerText = complete

                    if (total == index + 1) {
                        setState({
                            ...state,
                            isUploadingStart: false,
                        })
                    }
                }
                // console.log({ complete })
            });
            // var results = response.data.details.results;
            // console.log({ results })
            // if (results) {
            //     results.map((item, index) => {
            //         document.getElementById(`uploadStatus_${index}`).innerText = item
            //         if (item == "Updated") {
            //             document.getElementById(`uploadStatus_${index}`).classList.add("text-info")
            //         }
            //         if (item == "Failed") {
            //             document.getElementById(`uploadStatus_${index}`).classList.add("text-danger")
            //         }
            //         if (item == "Uploaded") {
            //             document.getElementById(`uploadStatus_${index}`).classList.add("text-success")
            //         }
            //     })
            // }

        } catch (error) {
            console.log(error);
        }

    }

    const openFile = async () => {
        // get country and schoolNames
        var response1 = await axios.get(process.env.REACT_APP_NODE_URL + "/admin/countries")
        var response2 = await axios.get(process.env.REACT_APP_NODE_URL + "/admin/schoolnames")

        // document.getElementsByClassName("main-content")[0].style.overflow = "hidden"
        visitedSchools = [] // again empty visibleSchoolsList
        visitedSchoolPrograms = [] // again empty visibleSchoolsList
        Papa.parse(state.csv_attachment, {
            complete: function (results) {
                // setFull Screen
                document.getElementById("aside").classList.add("hide_now")
                document.getElementsByTagName("main")[0].classList.add("full_screen")
                setState({
                    ...state,
                    csvData: [results.data[0], results.data.splice(1)],
                    countryList: response1.data.details.list.map(item => item.countryName),
                    schoolsList: response2.data.details.list.map(item => item.schoolName),
                    fileUploadedStatus: true,
                })
            }
        }
        )
    }

    const datamodel = () => {

    }

    // if(state.isWait){
    //     return "Waiting.."
    // }

    return (
        <>
            <div heading_title={"Add Schools"}>
                <>
                    <div className="">
                        {state.fileUploadedStatus ? <></> : <div className="flex flex-column items-center w-10/12 mx-auto mt-10 mb-3">
                            {/* <h4>Upload CSV File</h4> */}
                            <div className="mt-7 w-full">
                                <input type="hidden" name="progressInput" id="progressInput" value={0} />
                                <div className="dropZone w-full" {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <p>Drag 'n' drop file here, or click to select files</p>
                                    <button className="bg-gradient-primary">Browse File</button>
                                </div>
                                {/* <div className="form-group m-2 flex justify-content-end">
                                    <button className="btn btn-primary" onClick={openFile}>Open</button>
                                </div> */}
                            </div>
                        </div>}

                        <div>
                            <ul className="filesList">
                                {
                                    state.csv_attachment &&
                                    <li className="fileItem">
                                        <span>File : <b>{state.csv_attachment.name}</b></span>
                                        <button className="btn bg-gradient-primary m-0 px-2 py-1 rounded text-white" onClick={openFile}>Open</button>
                                    </li>
                                }
                            </ul>
                        </div>
                        {
                            state.fileUploadedStatus ?
                                <div className="tableData">
                                    <label className="flex items-center justify-between" htmlFor="">
                                        <b><span className="m-1">School Details</span></b>

                                        <div className="flex items-center justify-center">
                                            <div className="flex flex-direction-column m-2">
                                                <p className="m-0 p-1"><span className="text-secondary">Updated : </span><b><span id="updatedCount">0</span></b></p>
                                                <p className="m-0 p-1"><span className="text-secondary">Uploaded : </span><b><span id="uploadedCount">0</span></b></p>
                                                <p className="m-0 p-1"><span className="text-secondary">Failed : </span><b><span id="failedCount">0</span></b></p>
                                                <p className="m-0 p-1"><span className="text-secondary">Total : </span><b><span id="totalCount">0</span></b></p>
                                            </div>

                                            <button className="bg-gradient-primary m-0 px-2 py-1 rounded hover:bg-[#2a276b] text-white" onClick={state.isUploadingStart ? null : uploadData}>
                                                {
                                                    state.isUploadingStart ?
                                                        <div class="spinner-border spinner-border-sm" role="status">
                                                            <span class="visually-hidden">Loading...</span>
                                                        </div> : <>Upload</>
                                                }
                                            </button>
                                            <button className="px-2 py-1 text-red-600 hover:text-[#7f1d1d] m-2" onClick={_ => {
                                                if (window.confirm("Are you want to close")) {
                                                    // document.getElementsByClassName("main-content")[0].style.overflow = "auto"
                                                    setState({
                                                        ...state,
                                                        csvData: [[], []],
                                                        fileUploadedStatus: false,
                                                        isUploadingStart: false,
                                                    })
                                                    document.getElementById("aside").classList.remove("hide_now")
                                                    document.getElementsByTagName("main")[0].classList.remove("full_screen")
                                                }
                                            }}>
                                                Close
                                            </button>
                                        </div>
                                    </label>
                                    {
                                        true ?

                                            <div className="w-8/12 mx-auto bg-gray-200 rounded-full">
                                                <div id="ProgressBarAnimation" className="text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: "0%", height: "100%" }}>0%</div>
                                                {
                                                    /* <div className="progress m-2"><div  className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: "0%", height: "100%" }}>0%</div>
                                                </div>  */
                                                }
                                            </div>
                                            : <> </>
                                    }
                                    <table className="table schoolList">
                                        <thead>
                                            <tr>
                                                <th className="p-2">#</th>
                                                <th className="p-2">Status</th>
                                                {
                                                    state.csvData[0].map((item, index) => {
                                                        if (state.requiredColumns.includes(index)) {
                                                            return <th scope="col" className="p-2">{item}<span className="text-red-600">*</span></th>
                                                        }
                                                        return <><th className="p-2" scope="col">{item}</th></>;

                                                    })
                                                }
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                state.fileUploadedStatus ? state.csvData[1].map((schoolDataArr, index) => {
                                                    // console.log(schoolDataArr[0])
                                                    if (schoolDataArr.length == 1 && schoolDataArr[0] == '') return;

                                                    let isDoubleProgram = false;
                                                    if (visitedSchoolPrograms.includes(`${schoolDataArr[0]}-${schoolDataArr[14]}`)) {
                                                        isDoubleProgram = visitedSchoolPrograms.indexOf(`${schoolDataArr[0]}-${schoolDataArr[14]}`);
                                                        errorFieds++;
                                                    } else {
                                                        visitedSchoolPrograms[index] = `${schoolDataArr[0]}-${schoolDataArr[14]}`
                                                    }


                                                    return <tr className={`${isDoubleProgram != false ? "doubleProgramRow text-white" : ""}`} title={`${isDoubleProgram != false ? `Double Program name to row number ${isDoubleProgram + 1}` : ""}`}>
                                                        <td className="p-2 text-center">{index + 1}</td>
                                                        <td className="p-2" id={`uploadStatus_${index}`}>
                                                            {
                                                                isDoubleProgram != false &&
                                                                <>Error</>

                                                            }
                                                        </td>
                                                        {
                                                            schoolDataArr.map((item, index) => {
                                                                if (state.requiredColumns.includes(index) && item == "") {
                                                                    errorFieds++;
                                                                    return <td className="p-2 myCell required_missing">{item}</td>
                                                                }

                                                                if (!state.schoolsList.includes(item.toLowerCase()) && index == 0) {
                                                                    errorFieds++;
                                                                    return <td title={`Unknown School Name : ${item}`} className="p-2 myCell required_missing">{item}</td>
                                                                }

                                                                if (!state.countryList.includes(item.toLowerCase()) && index == 3) {
                                                                    errorFieds++;
                                                                    return <td title={`Unknown Country Name : ${item}`} className="p-2 myCell required_missing">{item}</td>
                                                                }

                                                                return <td className="p-2" title={item}>{item}</td>
                                                            })
                                                        }
                                                    </tr>

                                                }) : <></>
                                            }
                                        </tbody>
                                    </table>
                                </div> : <></>
                        }
                    </div>
                </>
            </div>
        </>
    )
}

export default AddSchools;