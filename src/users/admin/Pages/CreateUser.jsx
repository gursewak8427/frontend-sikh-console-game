import { Switch } from "@mui/material";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link, Navigate, redirect, useNavigate } from "react-router-dom";
import { getCookie, getToken, setCookie } from "../../../helper/auth";
import Papa from "papaparse";
import Dashboard from "../Screens/Dashboard/Dashboard";
// import "./Addschoolname.css";
import { useDropzone } from "react-dropzone";
import { MultiSelect } from "react-multi-select-component";

const CreateUser = () => {
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
    first_name: "",
    last_name: "",
    street: "",
    city: "",
    state: "",
    country: "",
    postalcode: "",
    phone: "",
    assigned_category_id: [""],
    categoriesList: [],
  });
  const config = { headers: { Authorization: `Bearer ${getToken("admin")}` } };

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  var options = [];

  useEffect(() => {
    var data = {
      perPage: 100,
      currentPage: 1,
    };
    axios
      .post(
        process.env.REACT_APP_NODE_URL + "/category/getCategories",
        data,
        config
      )
      .then((res) => {
        // authenticate with token
        // redirect
        if (res.data.status == "0") {
          alert(res.data.message);
          return;
        }

        setState({
          ...state,
          categoriesList: res.data.details.categories,
        });
        // options = res.data.details.categories.map((category) => {
        //   return { value: category._id, label: category.categoryName };
        // });
        // navigate("/d/admin/listemployee")
      })
      .catch((err) => {
        console.log(err.response.data);
        // alert(err.response.data.message)
      });
  }, []);

  const Create = () => {
    var data = {
      email: state.email,
      phone: state.phone,
      first_name: state.first_name,
      last_name: state.last_name,
      street: state.street,
      city: state.city,
      state: state.state,
      country: state.country,
      postalcode: state.postalcode,
      phone: state.phone,
      assigned_category_id: selected,
    };
    axios
      .post(process.env.REACT_APP_NODE_URL + "/user/register", data, config)
      .then((res) => {
        // authenticate with token
        // redirect
        if (res.data.status == "0") {
          alert(res.data.message);
          return;
        }
        alert(res.data.message);
        navigate("/d/admin/listuser");
      })
      .catch((err) => {
        console.log(err.response.data);
        // alert(err.response.data.message)
      });
  };


  return (
    <>
      <div heading_title={"Create Sub-Admin"}>
        <>
          <div className="row addCountryPage flex flex-row justify-start">
            <div class="w-9/12 my-4 p-4">
              <div class="card-body">
                <div className="flex">
                  <div class="m-3 w-6/12">
                    <label>First Name</label>
                    <input
                      placeholder="First Name"
                      type="text"
                      class="block w-full flex-1 border-gray-300 focus:border-black border-2 border-gray p-2 w-full focus:ring-indigo-500 sm:text-sm"
                      name="first_name"
                      value={state.first_name}
                      onChange={handleChange}
                    />
                  </div>

                  <div class="m-3 w-6/12">
                    <label>Last Name</label>
                    <input
                      placeholder="Last Name"
                      type="text"
                      class="block w-full flex-1 border-gray-300 focus:border-black border-2 border-gray p-2 w-full focus:ring-indigo-500 sm:text-sm"
                      name="last_name"
                      value={state.last_name}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="flex">
                  <div class="m-3 w-6/12">
                    <label>Email</label>
                    <input
                      placeholder="Email"
                      type="email"
                      class="block w-full flex-1 border-gray-300 focus:border-black border-2 border-gray p-2 w-full focus:ring-indigo-500 sm:text-sm"
                      name="email"
                      value={state.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div class="m-3 w-6/12">
                    <label>Phone</label>
                    <input
                      placeholder="Phone"
                      type="text"
                      class="block w-full flex-1 border-gray-300 focus:border-black border-2 border-gray p-2 w-full focus:ring-indigo-500 sm:text-sm"
                      name="phone"
                      value={state.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="flex">
                  <div class="m-3 w-6/12">
                    <label>City</label>
                    <input
                      placeholder="Enter City"
                      type="text"
                      class="block w-full flex-1 border-gray-300 focus:border-black border-2 border-gray p-2 w-full focus:ring-indigo-500 sm:text-sm"
                      name="city"
                      value={state.city}
                      onChange={handleChange}
                    />
                  </div>
                  <div class="m-3 w-6/12">
                    <label>State</label>
                    <input
                      placeholder="Enter State"
                      type="text"
                      class="block w-full flex-1 border-gray-300 focus:border-black border-2 border-gray p-2 w-full focus:ring-indigo-500 sm:text-sm"
                      name="state"
                      value={state.state}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="flex">
                  <div class="m-3 w-6/12">
                    <label>Country</label>
                    <input
                      placeholder="Enter Country"
                      type="text"
                      class="block w-full flex-1 border-gray-300 focus:border-black border-2 border-gray p-2 w-full focus:ring-indigo-500 sm:text-sm"
                      name="country"
                      value={state.country}
                      onChange={handleChange}
                    />
                  </div>
                  <div class="m-3 w-6/12">
                    <label>Postal Code</label>
                    <input
                      placeholder="Enter Postal Code"
                      type="text"
                      class="block w-full flex-1 border-gray-300 focus:border-black border-2 border-gray p-2 w-full focus:ring-indigo-500 sm:text-sm"
                      name="postalcode"
                      value={state.postalcode}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="flex">
                  <div class="m-3 w-6/12">
                    <label>Category</label>
                    <MultiSelect
                      options={state.categoriesList.map((category) => {
                        return {
                          value: category._id,
                          label: category.categoryName,
                        };
                      })}
                      value={selected}
                      onChange={setSelected}
                      labelledBy="Select"
                    />
                    {/* <select
                      type="select"
                      class="block w-full flex-1 border-gray-300 focus:border-black border-2 border-gray p-2 w-full focus:ring-indigo-500 sm:text-sm"
                      name="assigned_category_id"
                      value={state.role}
                      onChange={handleChange}
                      multiple
                    >
                      <option value="">--Select--</option>
                      {state.categoriesList.map((category) => {
                        return (
                          <option value={category._id}>
                            {category.categoryName}
                          </option>
                        );
                      })}
                      {/* <option value="COUNSELOR">Counselor</option> */}
                    {/* </select> */}
                  </div>
                  <div class="m-3 w-6/12"></div>
                </div>

                <button
                  type="button"
                  class="btn bg-gradient-primary w-100 mt-4 text-white px-2 py-1 rounded m-3"
                  onClick={() => Create()}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default CreateUser;
