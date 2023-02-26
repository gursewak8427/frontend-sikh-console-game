import React, { Component, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Accordion, Icon } from "semantic-ui-react";
import Formaccordian from "./Formaccordian";

const FilterBar = (props) => {
  const navigate = useNavigate()
  const [activeIndex, setActiveIndex] = useState(0);
  const [filters, setFilters] = useState(JSON.parse(props.filters));

  const [state, setState] = useState({
    iletsScore: [0, 0, 0, 0],
    pteScore: 0,
    tofelScore: 0,
    newStreams: [],
  });

  useEffect(() => {
    console.log({ filters })
    if (filters.exam.type == "IELTS") {
      setState({
        ...state,
        iletsScore: filters.exam.score,
        newStreams: filters.new_stream
      })
    }
    if (filters.exam.type == "TOFEL") {
      setState({
        ...state,
        tofelScore: filters.exam.score,
        newStreams: filters.new_stream
      })
    }
    if (filters.exam.type == "PTE") {
      setState({
        ...state,
        pteScore: filters.exam.score,
        newStreams: filters.new_stream
      })
    }
  }, [])

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

  const streams = ["Engineering", "Technology", "Skill Trades", "Transportation", "Science", "Arts", "Media", "Design", "Law", "Politics", "Community Service", "Education", "Business", "Management", "Economics", "Administration", "Accounting", "English For Academic Studies", "Health Sciences", "Medicine", "Nursing", "Paramedic"]
  const handleClick = (index) => {
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  const handleChangeExam = (e) => {
    if (e.target.name == "tofel_score") {
      setState({
        ...state,
        tofelScore: e.target.value
      })
      applyFilter("exam", { type: "TOFEL", score: e.target.value })
    }
    if (e.target.name == "pte_score") {
      setState({
        ...state,
        pteScore: e.target.value
      })
      applyFilter("exam", { type: "PTE", score: e.target.value })
    }
    if (e.target.name == "writing") {
      setState({
        ...state,
        iletsScore: [parseFloat(e.target.value) || 0, state.iletsScore[1], state.iletsScore[2], state.iletsScore[3]]
      })
      applyFilter("exam", { type: "IELTS", score: [parseFloat(e.target.value) || 0, state.iletsScore[1], state.iletsScore[2], state.iletsScore[3]] })
    }
    if (e.target.name == "reading") {
      setState({
        ...state,
        iletsScore: [state.iletsScore[0], parseFloat(e.target.value) || 0, state.iletsScore[2], state.iletsScore[3]]
      })
      applyFilter("exam", { type: "IELTS", score: [state.iletsScore[0], parseFloat(e.target.value) || 0, state.iletsScore[2], state.iletsScore[3]] })
    }
    if (e.target.name == "speaking") {
      setState({
        ...state,
        iletsScore: [state.iletsScore[0], state.iletsScore[1], parseFloat(e.target.value) || 0, state.iletsScore[3]]
      })
      applyFilter("exam", { type: "IELTS", score: [state.iletsScore[0], state.iletsScore[1], parseFloat(e.target.value) || 0, state.iletsScore[3]] })
    }
    if (e.target.name == "listening") {
      setState({
        ...state,
        iletsScore: [state.iletsScore[0], state.iletsScore[1], state.iletsScore[2], parseFloat(e.target.value) || 0]
      })
      applyFilter("exam", { type: "IELTS", score: [state.iletsScore[0], state.iletsScore[1], state.iletsScore[2], parseFloat(e.target.value) || 0] })
    }
  }

  const changeExamType = e => {
    setFilters({
      ...filters,
      exam: {
        ...filters.exam,
        type: e.target.value
      }
    })
    applyFilter("exam", { type: e.target.value, score: e.target.value == "TOFEL" ? state.tofelScore : e.target.value == "PTE" ? state.pteScore : state.iletsScore })
  }


  const handleNewStream = (list) => {
    console.log({ list })
    let old_newstream = state.newStreams
    list.map(item => {
      if (old_newstream.includes(item)) {
        var index = old_newstream.indexOf(item);
        if (index !== -1) {
          old_newstream.splice(index, 1);
        }
      } else {
        old_newstream.push(item)
      }
    })
    console.log({ old_newstream })
    setState({
      ...state,
      newStreams: old_newstream
    })
    applyFilter("new_stream", old_newstream)
  }

  const applyFilter = (newKey, newValue) => {
    var oldFilters = filters;
    oldFilters[newKey] = newValue
    console.log("NOW")
    console.log({ oldFilters })
    props.filterNow(oldFilters)

    // if (oldFilters.exam.type == "IELTS") {
    //   oldFilters.exam.score = state.iletsScore;
    // }
    // if (oldFilters.exam.type == "PTE") {
    //   oldFilters.exam.score = state.pteScore;
    // }
    // if (oldFilters.exam.type == "TOFEL") {
    //   oldFilters.exam.score = state.tofelScore;
    // }
    // oldFilters.new_stream = state.newStreams;

    // this is the new query data
    // var jsondata = JSON.stringify(oldFilters);
    // console.log({oldFilters})
    // window.location.href = "/search/" + jsondata
  }
  function feesFormat(value) {
    var val = Math.abs(value)
    if (val >= 10000000) {
      return (val / 10000000).toFixed(2) + ' Cr';
    }
    if (val >= 100000) {
      return (val / 100000).toFixed(2) + ' Lac';
    }
    if (val >= 1000) {
      return (val / 1000).toFixed(2) + ' Thousand';
    }
    return val;
  }
  return (
    <Accordion>
      <Accordion.Title
        active={activeIndex === 0}
        onClick={() => handleClick(0)}
        className="flex items-center pb-0"
      >
        <Icon name="dropdown" />
        <h2 className="px-4 py-2 text-white text-xl   m-0 w-full">
          Language Scores
        </h2>
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 0}>
        <div className="lg:flex gap-4">
          <div className="w-full">
            <div>
              <label className="font-bold text-white">Select Exam</label>
              <br />
              <select className="p-2 w-full" onChange={(e) => changeExamType(e)}>
                {filters.exam.type == "IELTS" ? <option value="IELTS" selected>IELTS</option> : <option value="IELTS" >IELTS</option>}
                {filters.exam.type == "PTE" ? <option value="PTE" selected>PTE</option> : <option value="PTE" >PTE</option>}
                {filters.exam.type == "TOFEL" ? <option value="TOFEL" selected>TOFEL</option> : <option value="TOFEL" >TOFEL</option>}
                {filters.exam.type == "NOT_HAVE" ? <option value="NOT_HAVE" selected>I don't have this</option> : <option value="NOT_HAVE">I don't have this</option>}
              </select>
              {
                filters.exam.type == "IELTS" ?
                  <div className="lg:flex  inner-course" style={{}}>
                    <div>
                      <label className="text-white">Speaking:</label>
                      <input type="text" name="speaking" value={state.iletsScore[2]} onChange={(e) => handleChangeExam(e)} className="speaking border border-current h-9 p-2" />
                    </div>
                    <div>
                      <label className="text-white">Listening:</label>
                      <input type="text" name="listening" value={state.iletsScore[3]} onChange={(e) => handleChangeExam(e)} className="listening border border-current  h-9 p-2" />
                    </div>
                    <div>
                      <label className="text-white">Reading:</label>
                      <input type="text" name="reading" value={state.iletsScore[1]} onChange={(e) => handleChangeExam(e)} className="reading border border-current  h-9 p-2" />
                    </div>
                    <div>
                      <label className="text-white">Writing:</label>
                      <input type="text" name="writing" value={state.iletsScore[0]} onChange={(e) => handleChangeExam(e)} className="writing border border-current  h-9 p-2" />
                    </div>

                  </div> : filters.exam.type == "TOFEL" ? <div>
                    <label className="text-white">Tofel Score:</label>
                    <input type="text" name="tofel_score" value={state.tofelScore} onChange={(e) => handleChangeExam(e)} className="writing border border-current  h-9 p-2" />
                    <div className="error-field-tofel_score text-danger"></div>
                  </div> : filters.exam.type == "PTE" ? <div>

                    <label className="text-white">Pte Score:</label>
                    <input type="text" name="pte_score" value={state.pteScore} onChange={(e) => handleChangeExam(e)} className="writing border border-current  h-9 p-2" />
                    <div className="error-field-pte_score text-danger"></div>
                  </div> : <></>
              }
            </div>
          </div>
        </div>
      </Accordion.Content>

      <Accordion.Title
        active={activeIndex === 1}
        onClick={() => handleClick(1)}
        className="flex items-center pb-0"
      >
        <Icon name="dropdown" />
        <h2 className="px-4 py-2 text-white text-xl  m-0 w-full">
          Grade Scores
        </h2>
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 1}>
        <div className="w-full">
          <div>
            <label className="font-bold text-white">
              Choose your grade score
            </label>
            <br />
            <input className="w-full bg-white h-9" type="text" name="grade_score" value={filters.grade_score} onChange={e => {
              setFilters({ ...filters, grade_score: e.target.value })
              applyFilter("grade_score", e.target.value)
            }} />
          </div>
        </div>
      </Accordion.Content>

      <Accordion.Title
        active={activeIndex === 2}
        onClick={() => handleClick(2)}
        className="flex items-center pb-0"
      >
        <Icon name="dropdown" />
        <h2 className="px-4 py-2  text-xl text-white m-0 w-full">Country</h2>
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 2}>
        <div className="w-full">
          <div>
            <label className="font-bold text-white">
              Choose your country
            </label>
            <br />
            <select className="p-2 w-full" onChange={e => {
              setFilters({ ...filters, country_to_go: e.target.value })
              applyFilter("country_to_go", e.target.value)
            }}>
              {
                countryList.map(country => {
                  if (filters.country_to_go == country) {
                    return <option value={country} selected>{country}</option>
                  } else {
                    return <option value={country}>{country}</option>
                  }
                })
              }
            </select>
          </div>
        </div>
      </Accordion.Content>

      <Accordion.Title
        active={activeIndex === 3}
        index={3}
        onClick={() => handleClick(3)}
        className="flex items-center pb-0"
      >
        <Icon name="dropdown" />
        <h2 className="px-4 py-2  text-xl text-white m-0 w-full">
          Program level
        </h2>
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 3}>
        <div className="w-full">
          <div>
            <label className="font-bold">Highest Education</label>
            <br />
            <select className="p-2 w-full" onChange={e => {
              setFilters({ ...filters, highest_education: e.target.value })
              applyFilter("highest_education", e.target.value)
            }}>
              <option value="">--Select--</option>
              {
                filters.highest_education == "secondary" ? <option value="secondary" selected>Grade 12/High School</option> : <option value="secondary">Grade 12/High School</option>
              }
              {
                filters.highest_education == "certificate" ? <option value="certificate" selected>1-Year Post-Secondary Certificate</option> : <option value="certificate">1-Year Post-Secondary Certificate</option>
              }
              {
                filters.highest_education == "diploma" ? <option value="diploma" selected>2-Year Undergraduate Diploma</option> : <option value="diploma">2-Year Undergraduate Diploma</option>
              }
              {
                filters.highest_education == "advance_diploma" ? <option value="advance_diploma" selected>3-Year Undergraduate Advanced Diploma</option> : <option value="advance_diploma">3-Year Undergraduate Advanced Diploma</option>
              }
              {
                filters.highest_education == "3_year_bachlor" ? <option value="3_year_bachlor" selected>3-Year Bachelor's Degree</option> : <option value="3_year_bachlor">3-Year Bachelor's Degree</option>
              }
              {
                filters.highest_education == "4_year_bachlor" ? <option value="4_year_bachlor" selected>4-Year Bachelor's Degree</option> : <option value="4_year_bachlor">4-Year Bachelor's Degree</option>
              }
              {
                filters.highest_education == "postgraduate_diploma" ? <option value="postgraduate_diploma" selected>Postgraduate Certificate/Diploma</option> : <option value="postgraduate_diploma">Postgraduate Certificate/Diploma</option>
              }
              {
                filters.highest_education == "master" ? <option value="master" selected>Master's Degree</option> : <option value="master">Master's Degree</option>
              }
              {
                filters.highest_education == "doctrate" ? <option value="doctrate" selected>Doctoral Degree (Phd, M.D., ...)</option> : <option value="doctrate">Doctoral Degree (Phd, M.D., ...)</option>
              }
            </select>
          </div>
        </div>
      </Accordion.Content>

      <Accordion.Title
        active={activeIndex === 4}
        index={4}
        onClick={() => handleClick(4)}
        className="flex items-center pb-0"
      >
        <Icon name="dropdown" />
        <h2 className="px-4 py-2  text-xl text-white m-0 w-full">
          Program filters
        </h2>
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 4}>
        <div className="w-full">
          <div>
            <label className="font-bold text-white">School Types</label>
            <br />
            <div className="">
              <select className="form-group" name="school_type" onChange={(e) => {
                setFilters({ ...filters, school_type: e.target.value })
                applyFilter("school_type", e.target.value)
              }}>

                {
                  !filters.school_type || filters.school_type == "" ? <option value="" selected>--Select--</option> : <option value="">--Select--</option>
                }
                {
                  filters.school_type == "" ? <option value="" selected>Both</option> : <option value="">Both</option>
                }
                {
                  filters.school_type == "college" ? <option value="college" selected>College</option> : <option value="college">College</option>
                }
                {
                  filters.school_type == "university" ? <option value="university" selected>University</option> : <option value="university">University</option>
                }
              </select>
            </div>
          </div>
        </div>
      </Accordion.Content>

      <Accordion.Title
        active={activeIndex === 5}
        index={5}
        onClick={() => handleClick(5)}
        className="flex items-center pb-0"
      >
        <Icon name="dropdown" />
        <h2 className="px-4 py-2  text-xl text-white m-0 w-full">
          What disciplines do you want to study?
        </h2>
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 5}>
        {
          streams.map(item => {
            return (<div className="flex items-center mb-2">
              <p className="text-white">
                {
                  state.newStreams.includes(item) ?
                    <input value={item} name="stream" className="mr-2" type="checkbox" onChange={e => handleNewStream([item])} checked /> :
                    <input value={item} name="stream" className="mr-2" type="checkbox" onChange={e => handleNewStream([item])} />
                }
                {item}
              </p>
            </div>)
          })
        }
      </Accordion.Content>

      <Accordion.Title
        active={activeIndex === 6}
        index={6}
        onClick={() => handleClick(6)}
        className="flex items-center pb-0"
      >
        <Icon name="dropdown" />
        <h2 className="px-4 py-2  text-xl text-white m-0 w-full">
          Tuition Fees
        </h2>
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 6}>
        {feesFormat(filters?.fees || 0)}
        <p className="text-white flex items-center">
          <input type="range" min="1" max="100000" value={filters?.fees || 0} class="slider" id="myRange" onChange={(e) => {
            setFilters({ ...filters, fees: e.target.value })
            applyFilter("fees", e.target.value)
          }} />
        </p>
      </Accordion.Content>
      {/* <div className="p-5">
        <button className="apply-btn btn btn-primary text-black m-2 bg-white" onClick={applyFilter}>Apply</button>
      </div> */}
    </Accordion >
  );
}

export default FilterBar;
