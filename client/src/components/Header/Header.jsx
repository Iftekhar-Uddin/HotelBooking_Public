import React, { useContext } from 'react';
import './header.css';
import {useNavigate} from 'react-router-dom'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBed, faCalendarDays, faCar, faPerson, faPlane, faTaxi} from "@fortawesome/free-solid-svg-icons";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useState } from 'react';
import { format } from 'date-fns';
import { SearchContext } from '../../context/SearchContext';
import { AuthContext } from '../../context/AuthContext';



const Header = ({type}) => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([{startDate: new Date(), endDate: new Date(), key:"selection"},])
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({adult:1, children:0, room:1});

  const {user} = useContext(AuthContext);
  const {dispatch} = useContext(SearchContext);

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i"? options[name] +1 : options[name] -1,
      }
    })
  }


  const handleSearch = () => {
    dispatch({type: "NEW_SEARCH", payload: {destination, dates, options}})
    navigate('/hotels', {state: {destination, dates, options}})
  };


  return (
    <div className="header">
      
      <div className={type === "list"? "headerContainer ListMode" : "headerContainer"}>
        <div className="headerList">

          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>

          <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flight</span>
          </div>

          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>

          <div className="headerListItem">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>

          <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airpost taxis</span>
          </div>

        </div>

        {type !== "list" &&

          <>
          <h1 className="headerTitle">Awesome booking system. It's great!</h1>
          <p className="headerDesc">Get rewarded for your travels - unlock instant savings of 10% or more with a free Hotel Booking account</p>

          <div className="headerSearch">
            <div className='hrchin'>

              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerIcon"/>
                <input className="headerSearchInput" type="text" placeholder="where do you want to go" onChange={e=> setDestination(e.target.value)}/>
              </div>

              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon"/>
                  <span onClick={()=> setOpenDate(!openDate)} className="headerSearchText">{`${format(dates[0].startDate, "dd/MM/yyy")} to ${format(dates[0].endDate, "dd/MM/yyy")}`}</span>
                {openDate && <DateRange className="date"  editableDateInputs={true} onChange={(item)=> setDates([item.selection])} moveRangeOnFirstSelection={false} ranges={dates} minDate={new Date()}/>}
              </div>

              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon"/>
                <span onClick={()=> setOpenOptions(!openOptions)} className="headerSearchText">{`${options.adult} adult - ${options.children} children - ${options.room} room `}</span>
                {openOptions && 
                  <div className="options">

                    <div className="optionItem">
                      <span className="optionText">Adult</span>
                      <div className="optionCounter">
                        <button className="optionCounterButton" disabled={options.adult<1} onClick={()=>handleOption("adult", "d")}>-</button>
                        <span className="optionCounterNumber">{options.adult}</span>
                        <button className="optionCounterButton" onClick={()=>handleOption("adult", "i")}>+</button>
                      </div>
                    </div>

                    <div className="optionItem">
                      <span className="optionText">Children</span>
                      <div className="optionCounter">
                        <button className="optionCounterButton" disabled={options.children<1} onClick={()=>handleOption("children", "d")}>-</button>
                        <span className="optionCounterNumber">{options.children}</span>
                        <button className="optionCounterButton" onClick={()=>handleOption("children", "i")}>+</button>
                      </div>
                    </div>

                    <div className="optionItem">
                      <span className="optionText">Room</span>
                      <div className="optionCounter">
                        <button className="optionCounterButton" disabled={options.room<=1} onClick={()=>handleOption("room", "d")}>-</button>
                        <span className="optionCounterNumber">{options.room}</span>
                        <button className="optionCounterButton" onClick={()=>handleOption("room", "i")}>+</button>
                      </div>
                    </div>

                  </div>
                }
              </div>

              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>Search</button>
              </div>
              
            </div>

          </div>
          </>
        }
      </div>
    </div>
  )
}

export default Header
