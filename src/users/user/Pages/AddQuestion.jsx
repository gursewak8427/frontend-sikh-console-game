import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { Link, Navigate, redirect, useNavigate } from "react-router-dom";
import { authenticate, getToken } from "../../../helper/auth";
import UserDashboard from "../Screens/Dashboard/UserDashboard";

const AddQuestion = (props) => {
  const [state, setState] = useState({
    categoryList: null,
    submitProcessing: false,
    token: getToken("user"),
    isWait: true,
  });
  const navigate = useNavigate();
  const config = { headers: { Authorization: `Bearer ${getToken("user")}` } };

  useEffect(() => {
    axios
      .post(process.env.REACT_APP_NODE_URL + "/user/getProfile", {}, config)
      .then((res) => {
        console.log(res.data);
        setState({
          ...state,
          categoryList: res.data.details.user.assigned_category_id,
          isWait: false,
        });
      })
      .catch((err) => {
        console.log(err.response.data);
        if (err.response.data.name == "ValidationError") {
          let errors = err.response.data.details.error;
          let msg = "";
          for (const key in errors) {
            msg += errors[key] += "\n";
            console.log([key, errors[key]]);
          }
          alert(msg);
          return;
        }
        alert(err.response.data.message);
      });
  }, []);

  const UploadNow = async (values) => {
    console.log({ values });
    setState({
      ...state,
      submitProcessing: true,
    });
    const data = {
      question: values.question,
      wrong_answer: values.wrong_answer,
      right_answer: values.right_answer,
      category: state.categoryList[0]._id,
    };
    axios
      .post(
        process.env.REACT_APP_NODE_URL + "/question/addQuestion",
        data,
        config
      )
      .then((res) => {
        navigate("/d/user/questions");
      })
      .catch((err) => {
        console.log(err.response.data);
        if (err.response.data.name == "ValidationError") {
          let errors = err.response.data.details.error;
          let msg = "";
          for (const key in errors) {
            msg += errors[key] += "\n";
            console.log([key, errors[key]]);
          }
          alert(msg);
          return;
        }
        alert(err.response.data.message);
      });
  };

  const ValidationSchema = Yup.object().shape({
    question: Yup.string().required("Required"),
    wrong_answer: Yup.string().required("Required"),
    right_answer: Yup.string().required("Required"),
    category: Yup.string().required("Required"),
  });

  return (
    <>
      <UserDashboard>
        <>
          <div className="row">
            <div className="w-6/12 p-4">
              <div className="">
                <div className="">
                  <div className="">
                    <div className="">
                      {state.isWait ? (
                        <>Loading...</>
                      ) : (
                        <Formik
                          initialValues={{
                            question: "",
                            wrong_answer: "",
                            right_answer: "",
                            category: state.categoryList[0].categoryName,
                          }}
                          validationSchema={ValidationSchema}
                          onSubmit={(values) => {
                            UploadNow(values);
                            // alert("Form is validated and in this block api call should be made...");
                          }}
                        >
                          {({ touched, errors, isSubmitting, values }) => {
                            {
                              console.log({
                                touched,
                                errors,
                                isSubmitting,
                                values,
                              });
                            }
                            return (
                              <Form>
                                <div className="flex">
                                  <div className="m-2 w-full">
                                    <label>Category</label>
                                    <Field
                                      type="text"
                                      className={`block w-full flex-1 border-gray-300 focus:border-black border-2 border-gray p-2 w-full focus:ring-indigo-500 sm:text-sm form-control ${
                                        touched.category && errors.category
                                          ? "is-invalid"
                                          : ""
                                      }`}
                                      placeholder="category"
                                      aria-label="category"
                                      aria-describedby="category-addon"
                                      name="category"
                                      disabled
                                    />
                                    <ErrorMessage
                                      component="div"
                                      name="category"
                                      className="invalid-feedback"
                                    />
                                  </div>
                                </div>

                                <div className="m-2">
                                  <label>Question</label>
                                  <Field
                                    type="text"
                                    className={`block w-full flex-1 border-gray-300 focus:border-black border-2 border-gray p-2 w-full focus:ring-indigo-500 sm:text-sm form-control ${
                                      touched.question && errors.question
                                        ? "is-invalid"
                                        : ""
                                    }`}
                                    placeholder="question"
                                    aria-label="question"
                                    aria-describedby="phone-addon"
                                    name="question"
                                  />
                                  <ErrorMessage
                                    component="div"
                                    name="question"
                                    className="invalid-feedback"
                                  />
                                </div>

                                <div className="m-2">
                                  <label>Right Answer</label>
                                  <Field
                                    type="text"
                                    className={`block w-full flex-1 border-gray-300 focus:border-black border-2 border-gray p-2 w-full focus:ring-indigo-500 sm:text-sm form-control ${
                                      touched.right_answer &&
                                      errors.right_answer
                                        ? "is-invalid"
                                        : ""
                                    }`}
                                    placeholder="Right Answer"
                                    aria-label="Right Answer"
                                    aria-describedby="right_answer-addon"
                                    name="right_answer"
                                  />
                                  <ErrorMessage
                                    component="div"
                                    name="right_answer"
                                    className="invalid-feedback"
                                  />
                                </div>

                                <div className="m-2">
                                  <label>Wrong Answer</label>
                                  <Field
                                    type="text"
                                    className={`block w-full flex-1 border-gray-300 focus:border-black border-2 border-gray p-2 w-full focus:ring-indigo-500 sm:text-sm form-control ${
                                      touched.wrong_answer &&
                                      errors.wrong_answer
                                        ? "is-invalid"
                                        : ""
                                    }`}
                                    placeholder="Wrong Answer"
                                    aria-label="Wrong Answer"
                                    aria-describedby="wrong_answer-addon"
                                    name="wrong_answer"
                                  />
                                  <ErrorMessage
                                    component="div"
                                    name="wrong_answer"
                                    className="invalid-feedback"
                                  />
                                </div>

                                <div className="text-center flex items-start justify-start p-2">
                                  <button
                                    type="submit"
                                    className="bg-gradient-primary text-white px-4 py-1 mt-4 mb-0 text-white rounded"
                                  >
                                    Upload
                                  </button>
                                </div>
                              </Form>
                            );
                          }}
                        </Formik>
                      )}
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

export default AddQuestion;
