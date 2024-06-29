import React, { useContext, useState } from 'react'
import './list.css'
import Header from '../../components/Header/Header'
import Navbar from '../../components/Navbar/Navbar'
import { useLocation } from 'react-router-dom'
import { format } from 'date-fns';
import { DateRange } from 'react-date-range'
import SearchItem from '../../components/SearchItem/SearchItem'
import useFetch from '../../hooks/useFetch'
import { SearchContext } from '../../context/SearchContext'
import api_key from '../../api'
import Footer from '../../components/Footer/Footer'


const List = () => {
  const location = useLocation();
  const api = api_key();
  const [openDate, setOpenDate] = useState(false);
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const {dispatch} = useContext(SearchContext);
  // const newdestination = destination?.toUpperCase()[0] + destination?.slice(1);


  const {data, loading, error, reFetch} = useFetch(`${api}/hotels/search?city=${destination}&min=${min || 0}&max=${max || 100000}`);
  // console.log(data);

  // console.log(location);
  // console.log(dates)
  // console.log(options)
  // console.log(data)


  const handleClick = () => {
    reFetch();
    dispatch({type: "NEW_SEARCH", payload: {destination, dates, options}})
  }

  return (
    <div>
      <Navbar/>
      <Header type="list"/>
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="listtitle">Search</h1>
            <div className='lsItem'>
              <label>Destination</label>
              <input onChange={e=> setDestination(e.target.value)} placeholder={destination} type="text"/>
            </div>
            <div className='lsItem'>
              <label>Check-in-Date</label>
              <span onClick={()=>setOpenDate(!openDate)}>{`${format(dates[0].startDate, "dd/MM/yyy")} to ${format(dates[0].endDate, "dd/MM/yyy")}`}</span>
              {openDate && <DateRange className="date1" onChange={item=> setDates([item.selection])} minDate={new Date()} ranges={dates}/>}
            </div>
            <div className='lsItem'>
              <label>Options</label>
              <div className="lsOptions">
              <div className='lsOptionItem'>
                <span className='lsOptionText'>Min Price <small>(Per Night)</small></span>
                <input type="number" className='laoptionInput' onChange={e=> setMin(e.target.value)}/>
              </div>
              <div className='lsOptionItem'>
                <span className='lsOptionText'>Max Price <small>(Per Night)</small></span>
                <input type="number" className='laoptionInput' onChange={e=> setMax(e.target.value)}/>
              </div>
              <div className='lsOptionItem'>
                <span className='lsOptionText'>Adult</span>
                <input type="number" min={1} className='laoptionInput' placeholder={options.adult}/>
              </div>
              <div className='lsOptionItem'>
                <span className='lsOptionText'>Children</span>
                <input type="number" min={0} className='laoptionInput' placeholder={options.children}/>
              </div>
              <div className='lsOptionItem'>
                <span className='lsOptionText'>Room</span>
                <input type="number" min={1} className='laoptionInput' placeholder={options.room}/>
              </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
          {loading ? "loading" : <>
            {data.map(item=>( 
            <SearchItem item={item} key={item._id}/>
            ))}
            </>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default List;
