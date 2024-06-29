import React from 'react'
import './searchItem.css'
import { Link } from 'react-router-dom'
import Footer from '../Footer/Footer'


const SearchItem = (item) => {
  console.log(item)
  return (
    <div className='searchItem'>
      <img className="searchitemImg" src={item.item?.photos[0]} alt=""/>
      <div className='siDesc'>
        <h1 className='siTitle'>{item.item.name}</h1>
        <label className="siDistance">{item.item.distance} k.m from <span style={{color: "crimson"}}>{item.item.city}</span> City</label>
        <span className="siTaxiOp">Free airport Taxi</span>
        <span className="siSubtitle">{item.item.title}</span>
        <span className="siFeatures">{item.item.desc}</span>
        <span className="siCancelOp">Free cancellation</span>
        <span className="siCancelOpSubtitle">You can cancel later, so lock in this great price today!</span>
      </div>
      <div className="siDetails">
        {item.item.rating &&
          <div className='SiRating'>
            <span>Excellent</span>
            <button>{item.item.rating}</button>
          </div>
        }
        <div className='SiDetailsTexts'>
          <span className='SiPrice'>${item.item.cheapestPrice}</span>
          <span className='SiTaxOp'>Includes taxes and fees</span>
          <Link to={`/hotels/${item.item._id}`}>
            <button className='seeButton'>See Availability</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SearchItem
