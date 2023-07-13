// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import './search.css';
// import { useNavigate } from 'react-router-dom';
// import { debounce } from 'lodash';

// const SearchComponent = () => {
//   const navigate = useNavigate();
//   const [query, setQuery] = useState('');
//   const [suggestions, setSuggestions] = useState([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [companydata, setCompanydata] = useState({
//     exchange: "",
//     symbol: "",
//   });
//   const suggestBoxRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (suggestBoxRef.current && !suggestBoxRef.current.contains(event.target)) {
//         setShowSuggestions(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const debouncedInputChange = useRef(
//     debounce(async (query) => {
//       try {
//         if (query.length) {
//           const res = await axios.post('http://localhost:8080/autocomplete', { query });
//           const matchedCompanies = res.data.data;
//           setSuggestions(matchedCompanies);
//           setCompanydata(res.data.data2);
//           setShowSuggestions(true);
//         } else {
//           setSuggestions([]);
//           setShowSuggestions(false);
//         }
//       } catch (error) {
//         console.error('Error fetching autocomplete suggestions');
//       }
//     }, 300)
//   ).current;

//   const handleInputChange = async (event) => {
//     const inputValue = event.target.value;
//     setQuery(inputValue);

//     debouncedInputChange(query);
    
//     // try {
//     // if(query.length){
//     //     const res = await axios.post("http://localhost:8080/autocomplete", {query});
//     //     const matchedCompanies = res.data.data;
//     //     console.log(matchedCompanies);
//     //     setSuggestions(matchedCompanies);
//     //     setCompanydata(res.data.data2);
//     //     console.log(res.data.data2);
//     //     setShowSuggestions(true);
//     // }else{
//     //     setSuggestions([]);
//     //     setShowSuggestions(false);
//     // }
     
//     // } catch (error) {
//     //   console.error('Error fetching autocomplete suggestions');
//     // }
//   };

//   const handleSelection = (selectedCompany) => {
//     setQuery(selectedCompany);
//     setShowSuggestions(false);
//   };

//   const handleSearchBarClick = () => {
//     setShowSuggestions(true);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     navigate(`/${query}`);
//   };
  
//   return (
//     <form className="d-flex" role="search" onSubmit={handleSubmit}> 
//       <div className="search-container">
//         <div>
//         <input
//           type="text"
//           value={query}
//           onChange={handleInputChange}
//           onClick={handleSearchBarClick}
//           placeholder="Search"
//           className="form-control me-2"
//           aria-label="Search"
//           />
//         </div>
//         {showSuggestions && suggestions.length > 0 &&
//           (<div className='suggest' ref={suggestBoxRef}>
//             <ul className='suggestbox'>
//               {suggestions.map((company, index) => (
//                 <li className = "suggestion" key={index} onClick={() => handleSelection(company)}>
//                   {company} - 
//                   <span className="exchange">{companydata[company].exchange}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>)
//         }
//       </div>
//     </form>
//   );
// };

// export default SearchComponent;






import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './search.css';
import { useNavigate } from 'react-router-dom';

const SearchComponent = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestBoxRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestBoxRef.current && !suggestBoxRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  
  const handleInputChange = async (event) => {
    const inputValue = event.target.value;
    setQuery(inputValue);

    try {
    if(inputValue.length){
        const res = await axios.post("http://localhost:8080/autocomplete", {inputValue});
        const matchedCompanies = res.data.data;
        console.log(matchedCompanies);
        setSuggestions(matchedCompanies);
        setShowSuggestions(true);
    }else{
        setSuggestions([]);
        setShowSuggestions(false);
    }
     
    } catch (error) {
      console.error('Error fetching autocomplete suggestions');
    }
  };

  const handleSelection = (selectedCompany) => {
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    var s = selectedCompany.symbol;
    if(selectedCompany.exchange === "NSE" || selectedCompany.exchange === "BSE"){
      s = s + '.' + selectedCompany.exchange;
    }
    navigate(`/${s}`);
    const submitButton = document.getElementById('submitButton');
    if (submitButton) {
      submitButton.click();
    }
    
  };

  const handleSearchBarClick = () => {
    setShowSuggestions(true);
  };

  return (
    <form className="d-flex" role="search" id="searchform"> 
      <div className="search-container">
        <div>

        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onClick={handleSearchBarClick}
          placeholder="Search"
          className="form-control me-2"
          aria-label="Search"
          />
        </div>
        {showSuggestions && suggestions.length > 0 &&
          (<div className='suggest' ref={suggestBoxRef}>
            <ul className='suggestbox'>
              {suggestions.map((company, index) => (
                <li className = "suggestion" key={index} onClick={() => handleSelection(company)}>
                  {company.name ? company.name: "abc"} - <span className="exchange">{company.exchange}</span>
                </li>
              ))}
            </ul>
          </div>)
        }
      </div>
      <button type="submit" id="submitButton" style={{ display: 'none' }}></button>
    </form>
  );
};

export default SearchComponent;