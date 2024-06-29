import React from 'react'
import './propertyList.css'
import useFetch from '../../hooks/useFetch';
import api_key from '../../api'


const PropertyList = () => {
  const api = api_key();
  const {data, loading} = useFetch(`${api}/hotels/countByType`);

  const images = [
    "https://assets-global.website-files.com/5c6d6c45eaa55f57c6367749/65045f093c166fdddb4a94a5_x-65045f0266217.webp",
    "https://cf.bstatic.com/xdata/images/hotel/max1024x768/383834719.jpg?k=a8ed632aeaf2eb621e6753e941d4fb2f858005614b603cdef5bfe644ce1a1906&o=&hp=1",
    "https://www.jetsetter.com//uploads/sites/7/2018/04/Imq9-S-V-1380x690.jpeg",
    "https://amazingarchitecture.com/storage/711/responsive-images/Deep-Villa-Atrey-and-Associates-New-Delhi-ndia-Amazing-Architecture-House___media_library_original_1386_924.jpg",
    "https://img.freepik.com/premium-photo/modern-bar-restaurant-interior-part-hotel-designer-interior-3d-rendering_295714-3613.jpg?size=626&ext=jpg&ga=GA1.1.1826414947.1699833600&semt=ais"
  ];

  return (
      <div className="pList">
        {loading ? ("loading") : (
        <> {
          data && images.map((img, i) => (
          <div className="pListItem" key={i}>
            <img className="pListImage" src={img} alt=""/>
            <div className="pListTitles">
              <h1>{data[i]?.type}</h1>
              <h2>{data[i]?.count} {data[i]?.type}</h2>
            </div>
          </div>))}
        </>)}
      </div>
  )
}

export default PropertyList;