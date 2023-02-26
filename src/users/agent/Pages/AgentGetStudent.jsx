import axios from "axios";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link, Navigate, redirect } from "react-router-dom";
import { authenticate, getToken } from "../../../helper/auth";
import AgentDashboard from "../Screens/Dashboard/AgentDashboard";

const AgentGetStudent = () => {
    const [state, setState] = useState({
        isWaiting: false,
        students: [],
        agentToken: getToken("agent"),
        totalPages: 0,
        currentPage: 1,
    })

    useEffect(() => {
        getPaginationData(1);
    }, [])

    const getPaginationData = (page) => {
        const config = { headers: { "Authorization": `Bearer ${state.agentToken}` } }
        let data = { currentPage: page }
        axios.post(process.env.REACT_APP_NODE_URL + "/agent/getstudents", data, config).then(res => {
            console.log(res)
            setState({
                ...state,
                students: res.data.details.students,
                totalPages: res.data.details.totalPages,
                currentPage: res.data.details.currentPage,
                isWaiting: false,
            })
        }).catch(err => {
            console.log(err.response.data)
            alert(err.response.data.message)
        })
    }
    const range = (startAt, size) => {
        return [...Array(size).keys()].map(i => i + startAt);
    }

    return (
        <>
            <AgentDashboard heading_title={"Students"}>
                <>
                    <div className="row">
                        <div className="row">
                            <div className="col-12">
                                <div className="card mb-4">
                                    <div className="card-header pb-0">
                                        {/* filters & Search Here */}
                                        <div className="search col-3 mb-2" style={{ float: "right" }}>
                                            <input type="text" className="form-control" placeholder="Serach" />
                                        </div>
                                    </div>
                                    <div className="card-body px-0 pt-0 pb-2">
                                        <div className="table-responsive p-0">
                                            <table className="table align-items-center mb-0">
                                                <thead>
                                                    <tr>
                                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Id</th>
                                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Name</th>
                                                        <th className="align-middle text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Status</th>
                                                        <th className="align-middle text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Registred</th>
                                                        <th className="text-secondary opacity-7" />
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {
                                                        state.students.map((student, index) => {
                                                            return <tr>
                                                                <td>
                                                                    <p className="text-xs font-weight-bold mb-0">{index + 1}</p>
                                                                    <p className="text-xs text-secondary mb-0"><b>ID:</b> {student._id}</p>
                                                                </td>
                                                                <td>
                                                                    <div className="d-flex px-2 py-1">
                                                                        <div>
                                                                            <img src="../assets/img/team-2.jpg" className="avatar avatar-sm me-3" alt="user1" />
                                                                        </div>
                                                                        <div className="d-flex flex-column justify-content-center">
                                                                            <h6 className="mb-0 text-sm">John Michael</h6>
                                                                            <p className="text-xs text-secondary mb-0">{student.email}</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="align-middle text-center text-sm">
                                                                    <span className="badge badge-sm bg-gradient-success">Online</span>
                                                                </td>
                                                                <td className="align-middle text-center">
                                                                    <span className="text-secondary text-xs font-weight-bold">23/04/18</span>
                                                                </td>
                                                                <td className="align-middle">
                                                                    <a href="javascript:;" className="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                                                                        Edit
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="card-footer pb-0">
                                        {/* pagination is here */}
                                        <div className="pagination">
                                            <div className="pages">
                                                <ReactPaginate
                                                    breakLabel="..."
                                                    nextLabel="next"
                                                    onPageChange={(event) => {
                                                        getPaginationData(event.selected + 1)
                                                    }}
                                                    pageRangeDisplayed={2}
                                                    pageCount={state.totalPages}
                                                    previousLabel="prev"
                                                    renderOnZeroPageCount={null}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            </AgentDashboard>
        </>
    )
}

export default AgentGetStudent;