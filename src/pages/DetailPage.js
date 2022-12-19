import '../assets/css/detailpage.css';

// import react
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";

// import moment for time converting
import moment from "moment";

// import axios
import axios from 'axios';

// import recharts to make a pie chart
import { PieChart, Pie} from 'recharts';

// import icon from fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"

function App() {
  
  // for navigation purpose
  const navigate = useNavigate();

  // initiate useState variable
  const [data, setData] = useState([]);
  
  // take aircraft ID in params
  const params = useParams();

  // Validator Token
    const token = localStorage.getItem('token');
    if(!token){
      navigate('/login')
      window.location.href = '/login'
    }
    
  useEffect(() => {    
    
    // config for data fetching
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    
    const summaryDataFetch = axios.get(`http://52.74.166.134:3000/api/${params.deviceId}`, config)
    summaryDataFetch.then(
      (res) => {
        setData(res.data)
      }
    )
    .catch((err) => {
      alert(err.response.data.response.message)
      localStorage.clear('token');
      navigate('/login') 
    })
  }, [])

  // calculate the percentage of aircraft time spent
  
      // Initialize the counts object
      const counts = {};

      // Iterate over the array and update the counts object
      for (const obj of data) {
        if (!counts[obj.location]) {
          counts[obj.location] = 1;
        } else {
          counts[obj.location]++;
        }
      }

      // Calculate the total number of occurrences
      const total = Object.values(counts).reduce((acc, count) => acc + count, 0);

      // Calculate the percentages
      const percentages = {};
      for (const location in counts) {
        percentages[location] = (counts[location] / total) * 100;
      }

      // Initialize the counts object
      const result = [];

      // put the object to object of array
      for (const location in percentages) {
        result.push({
          location,
          percent: percentages[location]
        });
      }

console.log(result);

  return (
    <div className="detail">
        <div className="detail-frame">
            <div className="detail-content">
                  <div className='detail-head'>
                    <h2>{params.deviceId}<br/>Aircraft</h2>
                    <a href='/'> back
                      <FontAwesomeIcon icon={faArrowRight} className='arrow-style' />
                    </a>
                  </div>
                  <div className='detail-tables'>

                    <div className='detail-table_data'>

                      <div className='detail-table_data_head'>
                        <div className='detail-table_first-coloumn border-height'>Timestamp</div>
                        <div className='detail-table_other-coloumn'>Location</div>
                      </div>

                      <div className='detail-table_data_content'>
                        
                        {data.map((item) => (                      
                          <div className='detail-table_data_per-row'>
                            <div className='detail-table_first-coloumn'>{moment(item.timestamp).format('DD-MM-YYYY hh:mm:ss')}</div>
                            <div className='detail-table_other-coloumn'>{item.location}</div>
                          </div>
                        ))}

                      </div>

                    </div>

                    <div className='detail-table_chart'>
                      <div className='detail-table_pie-chart'>
                        {/* pie Chart */}
                         <PieChart width={325} height={275}>
                            <Pie
                              dataKey="percent"
                              isAnimationActive={true}
                              data={result}
                              cx="50%"
                              cy="50%"
                              outerRadius={80}
                              fill="#DF4C4C"
                            />
                          </PieChart>
                      </div>
                      <div className='detail-table_chart-legend'>
                        <p>% Time spent on each location</p>
                        {result.map((item) => (
                        <p className='legend-collection'>{item.location+': '+item.percent+'%'}</p>
                        ))}
                      </div>
                    </div>
                  </div>
            </div>
        </div>
    </div>
  );
}

export default App;
