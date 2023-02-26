import axios from "axios";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Navigate, redirect, useNavigate } from "react-router-dom";
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
    "Saint Helena, Ascension and Tristan da Cunha",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Martin (French part)",
    "Saint Pierre and Miquelon",
    "Saint Vincent and the Grenadines",
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
    "South Georgia and the South Sandwich Islands",
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
    "United Kingdom of Great Britain and Northern Ireland (the)",
    "United States Minor Outlying Islands (the)",
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
const SchoolList = () => {
    const [state, setState] = useState({
        isWaiting: false,
        schools: [],
        adminToken: getToken("admin"),
        totalPages: 0,
        currentPage: 1,
        country: "",
        searchItem: "",
    })
    const navigate = useNavigate()

    useEffect(() => {
        getPaginationData(1);
    }, [])

    const getPaginationData = (page) => {
        setState({
            ...state,
            isWaiting: true,
        })
        let country = document.getElementById("country").value
        let searchItem = document.getElementById("searchItem").value

        const config = { headers: { "Authorization": `Bearer ${state.adminToken}` } }
        let data = { currentPage: page, country, searchItem }
        axios.post(process.env.REACT_APP_NODE_URL + "/admin/getschools", data, config).then(res => {
            console.log(res)
            setState({
                ...state,
                schools: res.data.details.schools,
                totalPages: res.data.details.totalPages,
                currentPage: res.data.details.currentPage,
                isWaiting: false,
            })
        }).catch(err => {
            console.log(err.response.data)
            // alert(err.response.data.message)
        })
    }

    const handleChange = e => {
        getPaginationData(1)
    }

    return (
        <>
            <div heading_title={"Schools List"}>
                <>
                    <div className="row min-height-vh-100">
                        <div className="row p-45">
                            <div className="col-12 mt-4">
                                <div className="headerr d-flex align-items-end justify-content-end">
                                    {/* <button className="btn AddDataBtn">Add</button> */}
                                    {/* <button className="btn AddDataBtn" onClick={()=>navigate("/admin/addschools")}>Import</button> */}
                                </div>
                                <div className="schoolFilters">
                                    <div className="left">
                                        <div className="filter-group">
                                            <select className="form-control border p-2" name="country" id="country" onChange={handleChange}>
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
                                    </div>
                                    <div className="right">
                                        <div className="filter-group">
                                            <input className="form-control border p-2" type="text" placeholder="search" id="searchItem" name="searchItem" onChange={handleChange} />
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
                                        </> : <div className="card mb-4">
                                            <div className="card-body px-0 pt-0 pb-2">
                                                <div className="table-responsive p-0">
                                                    <table className="table mb-0 w-full">
                                                        <thead>
                                                            <tr>
                                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Id</th>
                                                                <th className="text-left pl-4 text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">School</th>
                                                                <th className="align-middle text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Total Programs</th>
                                                                <th className="align-middle text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Founded</th>
                                                                {/* <th className="align-middle text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Registred</th> */}
                                                                <th className="text-secondary opacity-7" />
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                state.schools.map((school, index) => {
                                                                    return <tr>
                                                                        <td className="p-2">
                                                                            <p className="text-xs font-weight-bold mb-0">{index + 1}</p>
                                                                        </td>
                                                                        <td className="p-2">
                                                                            <div className="flex px-2 py-1">
                                                                                <div className="mr-2">
                                                                                    <img width={60} src="https://upload.wikimedia.org/wikipedia/commons/9/97/Ekya_Schools_logo.png" className="avatar avatar-sm me-3" alt="user1" />
                                                                                </div>
                                                                                <div className="d-flex flex-column justify-content-center">
                                                                                    <h6 className="mb-0 text-sm hover-underline" onClick={() => navigate("/d/admin/programs/" + school._id)}>{school.school_name}</h6>
                                                                                    <p className="text-xs text-secondary mb-0">{school.school_location}</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        {/* <td className="align-middle text-center text-sm">
                             <span className="badge badge-sm bg-gradient-success">Online</span>
                         </td> */}
                                                                        <td className="p-2 align-middle text-center">
                                                                            <span className="text-secondary text-xs font-weight-bold">{school.school_programs.length}</span>
                                                                        </td>
                                                                        <td className="p-2 align-middle text-center">
                                                                            <span className="text-secondary text-xs font-weight-bold">{school.founded}</span>
                                                                        </td>
                                                                        <td className="p-2 align-middle d-flex">
                                                                            {/* <div className="tableIcons">
                                                                                <i className="fa fa-edit"></i>
                                                                            </div> */}
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
                                }



                            </div>
                        </div>
                    </div>
                </>
            </div>
        </>
    )
}

export default SchoolList;