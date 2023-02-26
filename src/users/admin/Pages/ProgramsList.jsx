import axios from "axios";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Switch } from "@mui/material";
import { Navigate, redirect, useParams } from "react-router-dom";
import { authenticate, getToken } from "../../../helper/auth";
import Dashboard from "../Screens/Dashboard/Dashboard";

const countryList = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "American Samoa",
    "Andorra",
    "Angola",
    "Anguilla",
    "Antarctica",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas (the)",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bermuda",
    "Bhutan",
    "Bolivia (Plurinational State of)",
    "Bonaire, Sint Eustatius and Saba",
    "Bosnia and Herzegovina",
    "Botswana",
    "Bouvet Island",
    "Brazil",
    "British Indian Ocean Territory (the)",
    "Brunei Darussalam",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cayman Islands (the)",
    "Central African Republic (the)",
    "Chad",
    "Chile",
    "China",
    "Christmas Island",
    "Cocos (Keeling) Islands (the)",
    "Colombia",
    "Comoros (the)",
    "Congo (the Democratic Republic of the)",
    "Congo (the)",
    "Cook Islands (the)",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Curaçao",
    "Cyprus",
    "Czechia",
    "Côte d'Ivoire",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic (the)",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Falkland Islands (the) [Malvinas]",
    "Faroe Islands (the)",
    "Fiji",
    "Finland",
    "France",
    "French Guiana",
    "French Polynesia",
    "French Southern Territories (the)",
    "Gabon",
    "Gambia (the)",
    "Georgia",
    "Germany",
    "Ghana",
    "Gibraltar",
    "Greece",
    "Greenland",
    "Grenada",
    "Guadeloupe",
    "Guam",
    "Guatemala",
    "Guernsey",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Heard Island and McDonald Islands",
    "Holy See (the)",
    "Honduras",
    "Hong Kong",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran (Islamic Republic of)",
    "Iraq",
    "Ireland",
    "Isle of Man",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jersey",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Korea (the Democratic People's Republic of)",
    "Korea (the Republic of)",
    "Kuwait",
    "Kyrgyzstan",
    "Lao People's Democratic Republic (the)",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macao",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands (the)",
    "Martinique",
    "Mauritania",
    "Mauritius",
    "Mayotte",
    "Mexico",
    "Micronesia (Federated States of)",
    "Moldova (the Republic of)",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Montserrat",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands (the)",
    "New Caledonia",
    "New Zealand",
    "Nicaragua",
    "Niger (the)",
    "Nigeria",
    "Niue",
    "Norfolk Island",
    "Northern Mariana Islands (the)",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine, State of",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines (the)",
    "Pitcairn",
    "Poland",
    "Portugal",
    "Puerto Rico",
    "Qatar",
    "Republic of North Macedonia",
    "Romania",
    "Russian Federation (the)",
    "Rwanda",
    "Réunion",
    "Saint Barthélemy",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Martin (French part)",
    "Saint Pierre and Miquelon",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Sint Maarten (Dutch part)",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan (the)",
    "Suriname",
    "Svalbard and Jan Mayen",
    "Sweden",
    "Switzerland",
    "Syrian Arab Republic",
    "Taiwan",
    "Tajikistan",
    "Tanzania, United Republic of",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tokelau",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Turks and Caicos Islands (the)",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates (the)",
    "United States of America (the)",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela (Bolivarian Republic of)",
    "Viet Nam",
    "Virgin Islands (British)",
    "Virgin Islands (U.S.)",
    "Wallis and Futuna",
    "Western Sahara",
    "Yemen",
    "Zambia",
    "Zimbabwe",
    "Åland Islands"
];
const ProgramsList = (props) => {
    const [state, setState] = useState({
        isWaiting: true,
        school_programs: [],
        schoolNamesList: [],
        adminToken: getToken("admin"),
        totalPages: 0,
        currentPage: 1,
        wait: true,
        activeIndex: null,
    })
    const { id } = useParams()

    useEffect(() => {
        // get school name and id list
        axios.post(process.env.REACT_APP_NODE_URL + "/admin/getschoolnameid", {}).then(res => {
            console.log({ response: res })
            getPaginationData(1, res.data.schoolNamesList)
            setState({
                ...state,
                isWaiting: false,
            })
        }).catch(err => {
            console.log(err.response.data)
            // alert(err.response.data.message)
        })
    }, [])

    const getPaginationData = (page, schoolsList) => {
        setState({
            ...state,
            isWaiting: true,
        })
        var schoolName = document.getElementById("schoolName").value;
        var country = document.getElementById("country").value;
        var searchItem = document.getElementById("searchItem").value;
        const config = { headers: { "Authorization": `Bearer ${state.adminToken}` } }
        let data = { currentPage: page, schoolName, country, searchItem }
        axios.post(process.env.REACT_APP_NODE_URL + "/admin/getprograms", data, config).then(res => {
            console.log({ res })
            setState({
                ...state,
                school_programs: res.data.details.totalData,
                schoolNamesList: schoolsList,
                // school: res.data.details.school,     
                // totalPages: res.data.details.totalPages,
                // currentPage: res.data.details.currentPage,
                isWaiting: false,
            })
        }).catch(err => {
            console.log(err.response.data)
            // alert(err.response.data.message)
        })
    }

    const toggleActiveIndex = (index) => {
        setState({
            ...state,
            activeIndex: index == state.activeIndex ? null : index
        })
    }

    const monthsArray = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const changeProgramIntakeStatus = (sId, pId, index) => {
        const config = { headers: { "Authorization": `Bearer ${state.adminToken}` } }
        let data = { sId, pId, index }
        axios.post(process.env.REACT_APP_NODE_URL + "/admin/toggleIntakeStatus", data, config).then(res => {
            console.log({ res })
        }).catch(err => {
            console.log(err.response.data)
            // alert(err.response.data.message)
        })
    }


    const handleChange = e => {
        getPaginationData(1, state.schoolNamesList)
    }

    const toggleFewSeatsStatus = (sId, pId) => {
        const config = { headers: { "Authorization": `Bearer ${state.adminToken}` } }
        let data = { sId, pId }
        axios.post(process.env.REACT_APP_NODE_URL + "/admin/togglefewseatsstatus", data, config).then(res => {
            console.log({ res })
        }).catch(err => {
            console.log(err.response.data)
            // alert(err.response.data.message)
        })
    }

    return (
        <>
            <div heading_title={"Program List"}>
                <>
                    <div className="row min-height-vh-100">
                        <div className="row p-45">
                            <div className="col-12">
                                <div className="schoolFilters">
                                    <div className="left">
                                        <div className="filter-group w-3/12">
                                            <select className="form-control p-2 border" name="country" id="country" onChange={handleChange}>
                                                <option value="">-- Select Country --</option>
                                                <option value="">All</option>
                                                {
                                                    countryList.map(country => {
                                                        if (state.filterCountry == country)
                                                            return <option value={country} selected>{country}</option>
                                                        else
                                                            return <option value={country}>{country}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="filter-group col-3">
                                            <select className="form-control p-2 border" name="schoolName" id="schoolName" onChange={handleChange}>
                                                <option value="">-- Select School --</option>
                                                <option value="">All</option>
                                                {
                                                    state.schoolNamesList.map(school => {
                                                        if (id == school._id)
                                                            return <option value={school._id} selected>{school.school_name}</option>
                                                        else
                                                            return <option value={school._id}>{school.school_name}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="right">
                                        <div className="filter-group">
                                            <input className="form-control p-2 border" type="text" placeholder="search" id="searchItem" name="searchItem" onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>
                                {
                                    state.isWaiting ?
                                        <>
                                            <center className="mt-4">
                                                <div class="spinner-border" role="status">
                                                    <span class="visually-hidden">Loading...</span>
                                                </div>
                                            </center>
                                        </> :
                                        <div className="card mb-4 mt-4">
                                            <div className="card-body px-0 pt-0 pb-2">
                                                <div className="table-responsive p-0">
                                                    <table className="table mb-0 w-full">
                                                        <thead>
                                                            <tr>
                                                                {/* <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Id</th> */}
                                                                <th className="p-2 text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Program</th>
                                                                <th className="p-2 text-left align-middle text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Duration</th>
                                                                <th className="p-2 text-left align-middle text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Few Seats</th>
                                                                <th className="p-2 text-left align-middle text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Status</th>
                                                                {/* <th className="p-2 align-middle text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Registred</th> */}
                                                                <th className="text-secondary opacity-7" />
                                                            </tr>
                                                        </thead>
                                                        <tbody>

                                                            {
                                                                state.school_programs.map((school, index) => {
                                                                    return school.school_programs.map((program, index2) => {
                                                                        return <tr>
                                                                            {/* <td>{+ index2 + 1}</td> */}
                                                                            <td className="p-2 max-width">
                                                                                <div className="">
                                                                                    <div><b>{program.program_name}</b></div>
                                                                                    <div><small>Intake: {program.intake_id}</small></div>
                                                                                </div>
                                                                            </td>
                                                                            <td className="p-2 text-center">{program.duration}</td>
                                                                            <td className="p-2 text-center">
                                                                                {
                                                                                    program.few_seats_status ?
                                                                                        <Switch color="primary" defaultChecked onClick={() => toggleFewSeatsStatus(school._id, program.program_name)} /> :
                                                                                        <Switch color="primary" onClick={() => toggleFewSeatsStatus(school._id, program.program_name)} />
                                                                                }
                                                                            </td>
                                                                            <td className="p-2 text-center statusCell">
                                                                                <span className={`${state.activeIndex == index2 ? "active" : ""} p-2 border rounded`} onClick={() => toggleActiveIndex(index2)}>Status</span>
                                                                                <div className={`${state.activeIndex == index2 ? "statusBox active" : "statusBox"}`}>
                                                                                    <ul>
                                                                                        {
                                                                                            program.status.split(",").map((status, index4) => {
                                                                                                if (status == "1") {
                                                                                                    return <li onClick={() => changeProgramIntakeStatus(school._id, program.program_name, index4)} className={`${index4 + 1 == program.status.split(",").length ? "border-0" : ""}`}><span>{monthsArray[program.intake_id.split(",")[index4]]}</span><span> <Switch color="primary" defaultChecked onClick={() => null} /> </span></li>
                                                                                                } else {
                                                                                                    return <li onClick={() => changeProgramIntakeStatus(school._id, program.program_name, index4)} classname={`${index4 + 1 == program.status.split(",").length ? "border-0" : ""}`}><span>January</span><span><Switch color="primary" onClick={() => null} /> </span></li>
                                                                                                }
                                                                                            })
                                                                                        }
                                                                                    </ul>
                                                                                </div>
                                                                            </td>
                                                                            <td className="p-2 align-middle d-flex">
                                                                                {/* <div className="tableIcons">
                                                                                    <i className="fa fa-edit"></i>
                                                                                </div> */}
                                                                                {/* <div className="tableIcons">
                                                                            <i class="fa-solid fa-trash-can"></i>
                                                                        </div> */}
                                                                                {/* <a href="javascript:;" className="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                                                                        <b>Programs</b>
                                                                    </a> */}
                                                                            </td>
                                                                        </tr>
                                                                    })
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
                                }
                            </div>
                        </div>
                    </div>
                </>
            </div>
        </>
    )
}

export default ProgramsList;