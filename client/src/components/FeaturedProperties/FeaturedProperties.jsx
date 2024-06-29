import React from 'react'
import './featuredProperties.css'
import useFetch from '../../hooks/useFetch';
import api_key from '../../api'


const FeaturedProperties = () => {
  const api = api_key();
  const {data, loading, error} = useFetch(`${api}/hotels?featured=true`);
  console.log(data);


  return (
    <div className="fp">
      {loading ? "Loading" : 
        <>
          { data.map(item =>(
            <div className="fpitem" key={item._id}>
              <img className="fpImg" src={item.photos[0]} alt=""/>
              <div className='detailsoffeature'>
                <div className='city-name'>
                  <span className="fpName">{item.name}</span>
                  <span className="fpCity">{item.city}</span>
                </div>
                <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
                {item.rating &&
                <div className="fpRating">
                  <button className="fpButton"> {item.rating}</button>
                  <span className="fpSpan">Excellent</span>
                </div>}
              </div>
            </div>))
          }
        </>
      }
    </div>
  )
}

export default FeaturedProperties
