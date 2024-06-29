import React, { useContext, useState } from 'react'
import './hotel.css'
import Navbar from '../../components/Navbar/Navbar'
import Header from '../../components/Header/Header'
import MailList from '../../components/MailList/MailList'
import Footer from '../../components/Footer/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import useFetch from '../../hooks/useFetch'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext'
import Reserve from '../../components/Reserve/Reserve'
import api_key from '../../api'


const Hotel = () => {
  const api = api_key();
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const {data, loading, error, reFetch} = useFetch(`${api}/hotels/find/${id}`);
  const {dates, destination, options} = useContext(SearchContext);
  const navigate = useNavigate();
  const [slide, setSlide] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const lengthOfPhoto = data?.photos?.length;



  const MILLLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2){
    const timeDiff = Math.abs(date2?.getTime() - date1?.getTime());
    const diffDays = Math.ceil(timeDiff / MILLLISECONDS_PER_DAY);
    return diffDays;
  };

  const days = dayDifference(dates[0]?.endDate, dates[0]?.startDate);

  const handleOpen = (i)=> {
    setSlide(i);
    setOpen(true);
  }

  const handleMove = (direction) => {
    let currSlide ;

    if(direction === "L"){
      currSlide = (slide === 0 ? (lengthOfPhoto-1) : slide - 1)
    } else {
      currSlide = (slide === (lengthOfPhoto-1) ? 0 : slide + 1)
    }
    setSlide(currSlide)
  };

  const handleClick = ()=> {
    setOpenModal(true)
  };


  return (
    <div>
      <Navbar/>
      <Header type="list"/>
      {loading ? ("loading") :(
      <div className='hotelContainer'>
        {open && 
          <div className='slider'>
            <FontAwesomeIcon icon={faCircleXmark} className='close' onClick={()=> setOpen(false)}/>
            <FontAwesomeIcon icon={faCircleArrowLeft} className='arrow' onClick={()=> handleMove("L")}/>
            <div className='sliderWrapper'>
              <img src={data.photos[slide]} alt="" className='sliderImg'/>
            </div>
            <FontAwesomeIcon icon={faCircleArrowRight} className='arrow1' onClick={()=> handleMove("R")}/>
          </div>
        }
        <div className='hotelWrapper'>

          {/* <button className='bookNow'>Reserve or Book Now!</button> */}
          <h1 className='hotelTitle'>{data.name}</h1>

          <div className='hotelAddress'>
            <FontAwesomeIcon icon={faLocationDot}/>
            <span>{data.address}</span>
          </div>

          <span className='hotelDistance'>Excellent location {data.distance} k.m from center</span>
          <span className='hotelPriceHighLight'>Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi.</span>

          <div className='hotelImages'>
            {data?.photos?.map((photo, i)=>(
              <div className='hotelImgWrapper'>
                <img className="hotelImg" onClick={()=> handleOpen(i)} src={photo} alt=""/>
              </div>
            ))}
          </div>

          <div className="hotelDetails">

            <div className='hotelDetailsText'>
              <h2 className='hotelTitles'>{data.title}</h2>
              <p className='hotelDesc'>{data.desc}</p>
            </div>

            <div className='hotelDetailsPrice'>
              <h1>Perfect for {days} nights stay!</h1>
              <span>Located in the real heart of {data.city}, this property has an excellent location score of 7.5 !</span>
              <h2>
                <b>BDT {days * data.cheapestPrice * options.room}</b> ({days} nights)
              </h2>
              {(data.cheapestPrice && days) ? (
                <button className='re-reserve' onClick={handleClick}> Reserve or Book now!</button>
                ):(
                <Link className='linnnnnk' to={"/"}><button className='warning'>please provide a date!</button></Link> 
                )
              }
            </div>

          </div>

        </div>
        <MailList/>
        <Footer/>
      </div>)}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id}/>}
    </div>
  )
}

export default Hotel;


// Hi there, this is the top five hotels one. It is also stayed the center of chittagong city. 
// It is also near of bay of Bangal. You can easily enjoy the nature of beauty of sea's form hotel floor.
// This Apartments has accomodations with air conditioning and free WiFi. The units come with hardwood floors 
// and feature a fully equiped kitchenette with a microwoven, a flat-screen TV, and a private bathroom  with shower 
// and a hairdryer. A fridge is also offered, as well as an electric tea pot and coffee machine. Popular points of interest 
// near the apartment include cloth hall, main Market Square and Town Hall Tower. The nearest airport is Hazrat shah jalal International 
// Airport, 5.6 km from Tower Street Apartments, and the property offers a paid airport shuttle service.