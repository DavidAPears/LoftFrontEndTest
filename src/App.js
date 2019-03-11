import React, {useEffect, useState, useRef} from 'react';
import Background from './images/github-bg.svg';
import MediaQuery from 'react-responsive';
import axios from 'axios';
import moment from 'moment';
import './styles/header.css';
import './styles/homepage.css';
import './styles/searchbar.css';
import './styles/results.css';

// Adds background image to landing page:
  var homepageStyle = {
    backgroundImage: "url(" + Background + ")",
   };

// React Hooks to set state
export default function App(){
  const [result, setResults] = useState([])
  const [query, setQuery] = useState([null]);
  const [error, setError] = useState(null);
  const [repoDetail, setRepoDetail] = useState(null);
  const searchInputRef = useRef();


  useEffect( () => {
    getResults();
  }, []); //empty array = only updates on mount,

  const getResults = async () => {

// Takes 'query' text from text input (search bar) and fetches data from API using that query, creates 'response'
  var self = this
    try {
      axios.get(`https://api.github.com/search/repositories?q=${query}`).then((response)=>{
        fetchSearchTermData(response)
      const res = response;
     })
    } catch (err) {
        setError(err)
     }
    };

// Using the 'response', ensuring there is one (i.e it has a lenght longer than zero) and sets the url of the first item [0] as the response. If there is no url for 1st item an error is created
  const fetchSearchTermData = (response) => {
    if (response.data.items.length != 0){
      const url = response.data.items[0].url
        axios.get(`${url}`).then((response) => {
          setRepoDetail(response);
        })
      }
      else {setError ("No results found");
      }
    };

// When 'Submit' button is pressed results obtained
  const handleSearch = event => {
    event.preventDefault();
      getResults();
    }

// Ensures when 'Clear' button is pressed focus/cursor returns to begining of textinput (I.E searchbar)
  const handleClearSearch = () =>{
    setQuery("");
    setError("");
      setRepoDetail (null);
      searchInputRef.current.focus();
    };


// ----- BELOW THIS LINE IS THE UI SECTION OF CODE -----
return (

  <div className="homepage" >

{/* Header with logo */}
    <div className="header">
      <img
        className="logo"
        src={require("./images/loft-logo.svg")}
        alt="loft logo"
      />
    </div>

{/* Page Title & Tagline */}
    <div>
      <h1 className="title">
        Front-End Code Test
      </h1>
      <h2 className="tagline">
        GitHub Repo Search
      </h2>

{/* Search-bar & Buttons section */}
      <form
        onSubmit={handleSearch}
        className="searchbar"
      >
        <input
          type="text"
          value={query}
          ref={searchInputRef}
          placeholder=" Search Github Repos"
          onChange={event => setQuery(event.target.value)}
          className="searchbar"
        />
        <button
          type="submit"
          className="searchbutton">
            Search
        </button>
        <button
          type="button"
          onClick={handleClearSearch}
          className= "clearbutton">
            Clear
        </button>
      </form>
    </div>

    {!repoDetail ? (
      <div></div> )
     :
   (

     <div className="results-page">
        <h1 className="result-intro">
          The top search result is
        </h1>
        <h2 className="result-name">
          {repoDetail.data.name}
        </h2>

        <div className="main-results-section">
          <div className="results-section" >
            <h1 className="result-section-title">
              General Info
            </h1>
              <div className="result-box-1">
                <div className="main">
                  <p>Full Name    </p>
                  <p>Description  </p>
                  <p>URL          </p>
                  <p>Language     </p>
                </div>
              <div className="main1">
                  <p> {repoDetail.data.full_name  ? repoDetail.data.full_name   : "No Name Provided"}</p>
                  <p> {repoDetail.data.description? repoDetail.data.description : "No Description Available"}</p>
                  <a href={repoDetail.data.url}>{repoDetail.data.url}</a>
                  <p> {repoDetail.data.language   ? repoDetail.data.language    : "Not Specified"}</p>
                </div>
              <div className="main2">
                  <p>Private     </p>
                  <p>Created At  </p>
                  <p>Updated At  </p>
                </div>
              <div className="main3">
                  <p> {repoDetail.data.private    !=null ? `${repoDetail.data.private}`: "Privacy Info Unavailable"} </p>
                  <p> {repoDetail.data.created_at ? moment(`${repoDetail.data.created_at}`,'YYYY-MM-DD').format('L') : "Created Date Data Unavailable"}</p>
                  <p> {repoDetail.data.updated_at ? moment(`${repoDetail.data.updated_at}`,'YYYY-MM-DD').format(`L`) : "Updated Date Data Unavailable"}</p>
                </div>
              </div>
            </div>
          </div>

      <div className="horizontal-results-section">
      <div className="results-section2" >
        <h1 className="result-section-title">
          Usage Info
        </h1>
          <div className="result-box-2">
            <div className="main">
              <p><img src={require("./images/githubicons/star.svg")}        /> Starred By </p>
              <p><img src={require("./images/githubicons/eye.svg")}         /> Watched By </p>
              <p><img src={require("./images/githubicons/repo-forked.svg")} /> Forked By  </p>
              <p><img src={require("./images/githubicons/law.svg")}         /> License    </p>
            </div>
            <div className="main1">
              <p> {repoDetail.data.stargazers_count ? `${repoDetail.data.stargazers_count}` : "No Count Available"}</p>
              <p> {repoDetail.data.watchers_count   ? `${repoDetail.data.watchers_count}`   : "No Count Available"}</p>
              <p> {repoDetail.data.forks_count      ? `${repoDetail.data.forks_count}`      : "Forking Info Unavailable"}</p>
              <p> {repoDetail.data.license          ? `${repoDetail.data.license.name}`     : "Licensing Info Unvailable"}</p>
            </div>
          </div>
        </div>

      <div className="results-section3" >
        <h1 className="result-section-title">
          Owner Info
        </h1>
          <div className="result-box-3">
            <div className="main">
              <p>Owner      </p>
              <p>Owner ID   </p>
              <p>Owner Type </p>
            </div>
            <div className="main1">
              <p> {repoDetail.data.owner ? `${repoDetail.data.owner.login}` : "None Available"}</p>
              <p> {repoDetail.data.owner ? `${repoDetail.data.owner.id}`    : "None Available"}</p>
              <p> {repoDetail.data.owner ? `${repoDetail.data.owner.type}`  : "None Available"}</p>
              <div className="avatar">
                <img
                  src   = {repoDetail.data.owner.avatar_url}
                  width = {100}
                  height= {100}
                  mode  = 'fit'/>
              </div>
            </div>
          </div>
      </div>
    </div>
    <div className="footer">
      <img
        className = "logo"
        src       = {require("./images/loft-logo.svg")}
        alt       = "loft logo"
      />
    </div>
  </div>)}

    {error &&
      <div className="error-message">
        <p>Error: {error} </p>
          <img
            className="error"
            src={require("./images/no-results.gif")}
            />
      </div>
    }
  </div>)
  }
