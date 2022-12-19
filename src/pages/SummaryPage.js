import '../assets/css/summarypage.css';

// import react
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

// import moment for time converting
import moment from "moment";

// import axios
import axios from 'axios';

// import icon from fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faArrowRight, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons"



function App() {
  
  // for navigation purpose
  const navigate = useNavigate();

  // Handle Log Out
  const handleLogOut = () => {
    localStorage.clear('token');
    window.location.href = '/'
  }


  // Validator Token
    const token = localStorage.getItem('token');
    if(!token){
      navigate('/login')
      window.location.href = '/login'
    }

  // declare useState
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');

  console.log(search)


  //  * TO DO: token statis -> token diambil dari local storage
  useEffect(() => {
      
      // config for data fetching
      let config = {
        headers: {
          'Authorization': 'Bearer '+ token
          // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBhc2hhY29iYUBnbWFpbC5jb20iLCJ1c2VyX2lkIjo1MCwiaWF0IjoxNjcxNDM1NTI1LCJleHAiOjE2NzE1MjE5MjV9.JNZqTCIJvjnRTpuPKlAr0HpyRCgqhPgGv6-9mmeHQ9X'
        }
      }
      
      const summaryDataFetch = axios.get("http://52.74.166.134:3000/api", config)
      summaryDataFetch.then(
        (res) => {
          console.log(res)
          // setData(res)

          const latestData = res.data.reduce((acc, curr) => {
            const deviceId = curr.device_id;
            const latest = acc[deviceId] ? acc[deviceId] : null;
            if (!latest || new Date(curr.timestamp) > new Date(latest.timestamp)) {
              acc[deviceId] = curr;
            }
            return acc;
          }, {});

          const cleanedLatestData = Object.values(latestData);
          
          console.log(cleanedLatestData);
          setData(cleanedLatestData);
          
        }
      )
      .catch((err) => {
          alert(err.response.data.response.message)
          localStorage.clear('token');
          navigate('/login')
      })
    }, [])


  return (
    <div className="summary">
        <div className="summary-frame">
            <div className="summary-content">
                  <div className='summary-head'>
                    <h2>GPS Summary</h2>
                    <a href='' onClick={handleLogOut}> Log Out
                      <FontAwesomeIcon icon={faArrowRightFromBracket} className='logout-style' />
                    </a>
                  </div>
                  <div className='table-bar'>
                      <div className='search-bar'>
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                        <input
                          type='text'
                          placeholder='Search by DeviceID / Type'
                          id="name"
                          name="name"
                          onChange={(e) => setSearch(e.target.value)}
                        />
                      </div>
                      <div className='pagination-bar'>
                        {/* <p>1-5 of 25</p>
                        <div>x</div>
                        <div>x</div> */}
                      </div>
                  </div>
                  <div className='summary-table'>
                      <div className='table-head'>
                        <div className='table__first-coloumn'>DeviceID</div>
                        <div className='table__other-coloumn'>Device Type</div>
                        <div className='table__other-coloumn'>Latest Timestamp</div>
                        <div className='table__other-coloumn'>Latest Location</div>
                      </div>
                      {data
                      .filter((item) => {
                        return item.device_id.toLowerCase().includes(search.toLowerCase()) || item.device_type.toLowerCase().includes(search.toLowerCase()); 
                      })
                      .map((item) => (
                        <div className='table-content'>
                          <div className='table__first-coloumn'>{item.device_id}</div>
                          <div className='table__other-coloumn'>{item.device_type}</div>
                          <div className='table__other-coloumn'>{moment(item.timestamp).format('DD-MM-YYYY hh:mm:ss')}</div>
                          <div className='table__other-coloumn'>{item.location}</div>
                          <div className='table__arrow-coloumn'>
                          <a href={'/detail/'+item.device_id}>
                            <FontAwesomeIcon icon={faArrowRight} />
                          </a>
                        </div>
                        </div>
                      ))}
                  </div>
            </div>
        </div>
    </div>
  );
}

export default App;
