import React from 'react'
import './featured.css'
import useFetch from '../../hooks/useFetch'
import api_key from '../../api'



const Featured = () => {
  const api = api_key();
  const {data: newdata} = useFetch(`${api}/hotels`);
  const nowdata = newdata.map((getdata) => getdata.city)
  const {data, loading} = useFetch(`${api}/hotels/countByCity?cities={${nowdata}}`);

  return (
    <div className="featured">
      {loading ? ("please wait") : (
        <>{newdata.map((datas)=>
          <div className="featuredItem">
            <img className="featuredImg" src={datas.photos[0] || "https://plus.unsplash.com/premium_photo-1677178628425-84a64dc416b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80"} alt=""/>
            <div className="featuredTitles">
              <h1>{datas.city}</h1>
              {/* <h1>properties</h1> */}
            </div>
          </div>)}
        </>
      )}
    </div>
  )
}

export default Featured
