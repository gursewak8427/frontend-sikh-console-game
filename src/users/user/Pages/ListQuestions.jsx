import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import ReactPaginate from "react-paginate";
import { Navigate, redirect, useNavigate, Link } from "react-router-dom";
import { authenticate, getToken } from "../../../helper/auth";
import UserDashboard from "../Screens/Dashboard/UserDashboard";
import "./ListQuestions.css";

const ListQuestions = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    isWaiting: true,
    questions: [],
    userToken: getToken("user"),
    totalPages: 0,
    currentPage: 1,
    categoryList: [],
    activeCategory: null,
    activeQuestionId: null,
    showPopup: false,
    changeCategoryWait: false,
  });

  const setShowPopup = () => {
    if (state.showPopup) {
      setState({
        ...state,
        activeQuestionId: null,
        showPopup: false,
      });
    } else {
      setState({ ...state, showPopup: !state.showPopup });
    }
  };

  const colors = [
    "#A3A05D",
    "#B55454",
    "#5D96A3",
    "#D883DA",
    "#7BE578",
    "#332494",
  ];

  const config = { headers: { Authorization: `Bearer ${state.userToken}` } };

  useEffect(() => {
    // get Categories
    axios
      .post(process.env.REACT_APP_NODE_URL + "/user/getProfile", {}, config)
      .then((res) => {
        // get Question According to Category Id
        // findQuestionsAccordingToQuery
        axios
          .post(
            process.env.REACT_APP_NODE_URL +
              "/question/findQuestionsAccordingToQuery",
            {
              categoryId: res?.data?.details.user?.assigned_category_id[0]._id,
            },
            config
          )
          .then((questionResponse) => {
            setState({
              ...state,
              categoryList: res?.data?.details.user?.assigned_category_id || [],
              activeCategory:
                res?.data?.details.user?.assigned_category_id[0] || null,
              isWaiting: false,
              questions: questionResponse.data.details.list,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });

    // getPaginationData(1);
  }, []);

  const changeCategory = (category) => {
    setState({
      ...state,
      changeCategoryWait: true,
    });
    let data = { currentPage: 1, categoryId: category._id };
    axios
      .post(
        process.env.REACT_APP_NODE_URL +
          "/question/findQuestionsAccordingToQuery",
        data,
        config
      )
      .then((questionResponse) => {
        setState({
          ...state,
          activeCategory: category || null,
          questions: questionResponse.data.details.list,
          changeCategoryWait: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editQuestion = (question) => {
    setState({
      ...state,
      activeQuestionId: question._id,
      showPopup: true,
    });
  };

  if (state.isWaiting) {
    return "Waiting";
  }

  return (
    <>
      <UserDashboard heading_title={"Total Students"} footer={false}>
        {state.showPopup && (
          <AddQuestionPopups
            setShowPopup={setShowPopup}
            questionId={state.activeQuestionId}
            category={state.activeCategory}
            state={state}
            setState={setState}
          />
        )}
        <div className="container questionListPage">
          <div className="addNewQuestionBtn" onClick={setShowPopup}></div>
          {/* make top and ui list at bottom class */}
          <div className="category-list">
            {state.categoryList.map((category, index) => (
              <div
                onClick={() => changeCategory(category)}
                className={`category-box ${
                  category._id == state.activeCategory._id && "active"
                }`}
                style={{ background: colors[index % colors.length] }}
              >
                {category.categoryName}
              </div>
            ))}
          </div>
          {state.changeCategoryWait ? (
            <>Loading...</>
          ) : (
            <>
              <div
                className="title-row"
                style={{ background: colors[1 % colors.length] }}
              >
                <h1>{state.activeCategory.categoryName}</h1>
              </div>
              <div className="main-list">
                <table className="table table-responsive">
                  <thead>
                    <tr>
                      <th>Question</th>
                      <th>
                        Right <br /> Answer
                      </th>
                      <th>
                        Wrong <br /> Answer
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.questions.map((question, index) => (
                      <>
                        <tr key={index}>
                          <td onClick={() => editQuestion(question)}>
                            {question.e_question}
                            <br />
                            {question.p_question}
                          </td>
                          <td>
                            {question.e_rightAnswer}
                            <br />
                            {question.p_rightAnswer}
                          </td>
                          <td>
                            {question.e_wrongAnswer}
                            <br />
                            {question.p_wrongAnswer}
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </UserDashboard>
    </>
  );

  return (
    <>
      <UserDashboard heading_title={"Total Students"}>
        <>
          <div className="row px-4">
            <div className="w-full">
              <div className="shadow-lg mb-4 mt-4">
                <div className="px-0 pt-0 pb-2">
                  <div className="table-responsive p-0">
                    {state.isWaiting ? (
                      "Loading..."
                    ) : (
                      <table className="table w-full mb-0">
                        <thead>
                          <tr>
                            <th className="text-left">Id</th>
                            <th className="text-left p-3">Question</th>
                            <th className="text-left">Right Answer</th>
                            <th className="text-left">Wrong Answer</th>
                            <th className="text-left">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {state.questions.map((question, index) => {
                            return (
                              <tr>
                                <td>
                                  <p className="font-weight-bold mb-0">
                                    {index + 1}
                                  </p>
                                  {/* <p className="text-secondary mb-0"><b>ID:</b> {question._id}</p> */}
                                </td>
                                <td className="align-middle">
                                  <span className="text-secondary font-weight-bold">
                                    {question.question}
                                  </span>
                                </td>
                                <td className="align-middle">
                                  <span className="text-secondary font-weight-bold">
                                    {question.right_answer}
                                  </span>
                                </td>
                                <td className="align-middle">
                                  <span className="text-secondary font-weight-bold">
                                    {question.wrong_answer}
                                  </span>
                                </td>
                                <td className="align-middle">
                                  <span className="text-secondary font-weight-bold">
                                    Pending
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    )}
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
                          //   getPaginationData(event.selected + 1);
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
      </UserDashboard>
    </>
  );
};

const AddQuestionPopups = ({
  questionId,
  setShowPopup,
  category,
  state,
  setState,
}) => {
  const [subState, setSubState] = useState({
    e_question: "",
    e_wrongAnswer: "",
    e_rightAnswer: "",
    p_question: "",
    p_wrongAnswer: "",
    p_rightAnswer: "",
    questionId: questionId,
    questionType: 1, // 1 for punjabi and 2 for english
  });

  useEffect(() => {
    // get question details if question id available
    if (questionId) {
      axios
        .get(
          process.env.REACT_APP_NODE_URL +
            "/question/singleQuestionDetail/" +
            questionId
        )
        .then((res) => {
          console.log({ questionResponse: res });
          setSubState({
            ...subState,
            e_question: res.data.details.question.e_question,
            e_wrongAnswer: res.data.details.question.e_wrongAnswer,
            e_rightAnswer: res.data.details.question.e_rightAnswer,
            p_question: res.data.details.question.p_question,
            p_wrongAnswer: res.data.details.question.p_wrongAnswer,
            p_rightAnswer: res.data.details.question.p_rightAnswer,
          });
        });
    }
  }, []);

  const handleChange = (e) => {
    setSubState({
      ...subState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const config = {
      headers: { Authorization: `Bearer ${getToken("user")}` },
    };
    let data = {
      p_question: subState.p_question,
      p_wrongAnswer: subState.p_wrongAnswer,
      p_rightAnswer: subState.p_rightAnswer,
      e_question: subState.e_question,
      e_wrongAnswer: subState.e_wrongAnswer,
      e_rightAnswer: subState.e_rightAnswer,
      questionType: subState.questionType,
      questionId: subState.questionId,
      category: category._id,
    };
    axios
      .post(process.env.REACT_APP_NODE_URL + "/question/", data, config)
      .then((res) => {
        setSubState({
          ...subState,
          questionId: res.data.details.questionDtl._id,
        });

        // update question list  ==================
        if (questionId == null) {
          // push NEw question
          setState({
            ...state,
            questions: [...state.questions, res.data.details.questionDtl],
          });
        } else { 
          // update existing question
          let findIndex = -1;
          let newQuestionList = state.questions.map((question, index) => {
            if (question._id == questionId) {
              return res.data.details.questionDtl;
            }
            return question;
          });
          console.log({ newQuestionList });
          setState({
            ...state,
            questions: newQuestionList,
          });
        }
        // update question list  ==================

        // toast
        toast(
          <div
            className="notificationPopup"
            // onClick={() => window.open(notification.url, "_blank")}
          >
            <p>
              <b>
                {subState.questionId != null
                  ? "Question Updated"
                  : "New Question Uploaded"}
              </b>
            </p>
            {/* <p>{notification?.body}</p> */}
          </div>
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="add-question-popup">
      <div className="add-question-popup-content">
        <div className="top">
          <div className="left">
            <div
              className={`language ${subState.questionType == 1 && "active"}`}
              onClick={() => setSubState({ ...subState, questionType: 1 })}
            >
              Punjabi
            </div>
            <div
              className={`language ${subState.questionType == 2 && "active"}`}
              onClick={() => setSubState({ ...subState, questionType: 2 })}
            >
              English
            </div>
          </div>
          <div className="right">
            <div className="close" onClick={setShowPopup}>
              X
            </div>
          </div>
        </div>
        {subState.questionType === 1 && (
          <div className="punjabi-box">
            <div className="simulator simulator-punjabi">
              <div className="question-row">{subState.p_question}</div>
              <div className="answer-row">
                <div className="left">
                  {subState.p_rightAnswer.length > 15 ? (
                    <marquee behavior="" direction="">
                      {subState.p_rightAnswer}
                    </marquee>
                  ) : (
                    subState.p_rightAnswer
                  )}
                </div>
                <div className="right">
                  {subState.p_wrongAnswer.length > 15 ? (
                    <marquee behavior="" direction="">
                      {subState.p_wrongAnswer}
                    </marquee>
                  ) : (
                    subState.p_wrongAnswer
                  )}
                </div>
              </div>
            </div>
            <div className="add-question-popup-input">
              <label>Punjabi Question</label>
              <input
                type="text"
                name="p_question"
                value={subState.p_question}
                onChange={handleChange}
              />
            </div>
            <div className="add-question-popup-input">
              <label>Right Answer</label>
              <input
                type="text"
                name="p_rightAnswer"
                value={subState.p_rightAnswer}
                onChange={handleChange}
              />
            </div>
            <div className="add-question-popup-input">
              <label>Wrong Answer</label>
              <input
                type="text"
                name="p_wrongAnswer"
                value={subState.p_wrongAnswer}
                onChange={handleChange}
              />
            </div>
            <div className="add-question-popup-button">
              {subState.questionId != null ? (
                <button
                  className="add-question-popup-button-submit update"
                  onClick={handleSubmit}
                >
                  Update
                </button>
              ) : (
                <button
                  className="add-question-popup-button-submit upload"
                  onClick={handleSubmit}
                >
                  Add
                </button>
              )}
            </div>
          </div>
        )}
        {subState.questionType === 2 && (
          <div className="english-box">
            <div className="simulator simulator-english">
              <div className="question-row">{subState.e_question}</div>
              <div className="answer-row">
                <div className="left">
                  {subState.e_rightAnswer.length > 15 ? (
                    <marquee behavior="" direction="">
                      {subState.e_rightAnswer}
                    </marquee>
                  ) : (
                    subState.e_rightAnswer
                  )}
                </div>
                <div className="right">
                  {subState.e_wrongAnswer.length > 15 ? (
                    <marquee behavior="" direction="">
                      {subState.e_wrongAnswer}
                    </marquee>
                  ) : (
                    subState.e_wrongAnswer
                  )}
                </div>
              </div>
            </div>
            <div className="add-question-popup-input">
              <label>English Question</label>
              <input
                type="text"
                name="e_question"
                value={subState.e_question}
                onChange={handleChange}
              />
            </div>
            <div className="add-question-popup-input">
              <label>Right Answer</label>
              <input
                type="text"
                name="e_rightAnswer"
                value={subState.e_rightAnswer}
                onChange={handleChange}
              />
            </div>
            <div className="add-question-popup-input">
              <label>Wrong Answer</label>
              <input
                type="text"
                name="e_wrongAnswer"
                value={subState.e_wrongAnswer}
                onChange={handleChange}
              />
            </div>
            <div className="add-question-popup-button">
              {subState.questionId != null ? (
                <button
                  className="add-question-popup-button-submit update"
                  onClick={handleSubmit}
                >
                  Update
                </button>
              ) : (
                <button
                  className="add-question-popup-button-submit upload"
                  onClick={handleSubmit}
                >
                  Add
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListQuestions;
