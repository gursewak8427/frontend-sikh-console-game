import axios from "axios";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Navigate, redirect, useNavigate, Link } from "react-router-dom";
import { authenticate, getToken } from "../../../helper/auth";

const AdminListQuestions = () => {
    const navigate = useNavigate()
    const [state, setState] = useState({
        isWaiting: false,
        questions: [],
        adminToken: getToken("admin"),
        totalPages: 0,
        currentPage: 1,
    })

    useEffect(() => {
        getPaginationData(1);
    }, [])

    const getPaginationData = (page) => {
        const config = { headers: { "Authorization": `Bearer ${state.adminToken}` } }
        let data = { currentPage: page, mode: "ALL" }
        // let data = { currentPage: page, mode: "USER", userId: "123kjaklsdjf" } // for specific user
        axios.post(process.env.REACT_APP_NODE_URL + "/question/getQuestions", data, config).then(res => {
            setState({
                ...state,
                questions: res.data.details.questions,
                totalPages: res.data.details.totalPages,
                currentPage: res.data.details.currentPage,
                isWaiting: false,
            })
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <>
            <div heading_title={"Total Students"}>
                <>
                    <div className="row px-4">
                        <div className="w-full mt-5">
                            <div className="mt-4">
                                <div className="px-0 pt-0 pb-2">
                                    <div className="table-responsive p-0">
                                        {
                                            state.isWaiting ? "Loading..." :
                                                <table className="table w-full mb-0 dashboard-table">
                                                    <thead>
                                                        <tr>
                                                            <th className="text-left">Id</th>
                                                            <th className="text-left p-3">Question</th>
                                                            <th className="text-left">Right Answer</th>
                                                            <th className="text-left">Wrong Answer</th>
                                                            <th className="text-left">User/Category</th>
                                                            <th className="text-left">Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                        {
                                                            state.questions.map((question, index) => {
                                                                return <tr>
                                                                    <td>
                                                                        <p className="font-weight-bold mb-0">{index + 1}</p>
                                                                        {/* <p className="text-secondary mb-0"><b>ID:</b> {question._id}</p> */}
                                                                    </td>
                                                                    <td className="align-middle">
                                                                        <span className="text-secondary font-weight-bold">{question.question}</span>
                                                                    </td>
                                                                    <td className="align-middle">
                                                                        <span className="text-secondary font-weight-bold">{question.right_answer}</span>
                                                                    </td>
                                                                    <td className="align-middle">
                                                                        <span className="text-secondary font-weight-bold">{question.wrong_answer}</span>
                                                                    </td>
                                                                    <td className="align-middle flex flex-col">
                                                                        <span className="text-sm text-secondary font-weight-bold text-[green]">{question.userId.username}</span>
                                                                        <span className="text-sm text-secondary font-weight-bold text-[blue]">{question.category.categoryName}</span>
                                                                    </td>
                                                                    <td className="align-middle">
                                                                        <span className="text-secondary font-weight-bold">Pending</span>
                                                                    </td>
                                                                </tr>
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                        }
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
                </>
            </div>
        </>
    )
}

export default AdminListQuestions;