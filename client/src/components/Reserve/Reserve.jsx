import React, { useContext, useState } from 'react'
import "./reserve.css"
import { AuthContext } from '../../context/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import useFetch from "../../hooks/useFetch"
import { SearchContext } from '../../context/SearchContext'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"
import api_key from '../../api'



const Reserve = ({setOpen, hotelId}) => {
  const {user} = useContext(AuthContext);
  const api = api_key();
  const navigate = useNavigate();
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, loading, error } = useFetch(`${api}/hotels/room/${hotelId}`);
  const { dates } = useContext(SearchContext);
  console.log(selectedRooms);


  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());
    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };

  const alldates = getDatesInRange(dates[0]?.startDate, dates[0]?.endDate);

  const notAvailableRoom = (roomNumber) => {
    const unAvailableDates = roomNumber?.unabailableDates?.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return unAvailableDates;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms( checked ? [...selectedRooms, value] : selectedRooms.filter((item) => item !== value));
  };


  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`${api}/rooms/availability/${roomId}`, {
            dates: alldates,
          });
          return res.data;
        })
      );
      setOpen(false);
      navigate("/");
    } catch (err) {
      console.log(error)
    }
  };

  return (
    <div className='reserve'>
      { user?  
      (<div className='rCircle'>
        <FontAwesomeIcon icon={faCircleXmark} className='rClose' onClick={() => setOpen(false)}/>
        <span>Select your rooms: </span>

        <div className='forScroll'>
          {data.map((item) => (
            <div className='rItem'>
              <div className='rItemInfo'>
                <div className='rTitle'>{item?.title}</div>
                <div className='rDesc'>{item?.desc}</div>
                <div className='rMax'>Max people: <b>{item?.maxPeople}</b></div>
                <div className='rPrice'>Price: {item?.price} Taka</div>
              </div>
              <div className='rSelectedRooms'>
              {item?.roomNumbers?.map((roomNumber) => (
                  <div className='room'>
                    <label>{roomNumber.number}</label>
                    <input type="checkbox" value={roomNumber._id} onChange={handleSelect} disabled={notAvailableRoom(roomNumber)}/>
                  </div>
              ))}
              </div>
            </div>
            ))
          }
        </div>


        <button onClick={handleClick} className="rButton">Reserve Confirm!</button>
      </div>) : 
      (
        <div className='noUser'>
          <h2>Please login your Accout!</h2>
          <Link className='linkk' to={'/login'}> <button className='noUbutton'>Login</button></Link>
        </div>
      )
      }
    </div>
  )
};

export default Reserve;







{
  // data.map((item)=>(
  //   item?.roomNumbers?.map((roomNumber) => (
  //     !isAvailable(roomNumber)?
  //       (<Link to={"/"} className="rButton">Room Not Available</Link>)
  //       :
  //       (<button onClick={handleClick} className="rButton">Reserve Confirm!</button>)
  //   ))
  // ))

}