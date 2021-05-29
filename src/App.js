import {useState, useEffect} from 'react'
import * as d3 from 'd3'

import {BarChart} from './BarChart'

const csvUrl = 'https://gist.githubusercontent.com/kim2552/32f7c658e43729f509b037366579af85/raw/unemployment_rate_canada.csv'

const chartMargin={top:50,right:50,bottom:50,left:100}
const dataLimit=15

function App() {

  const [data,setData] = useState(null)

  useEffect(() => {
    d3.csv(csvUrl).then(data=>{
      const start = data.length-dataLimit
      setData(data.slice(start,data.length))
    })
  }, [])

  if(!data){

    return(
    <pre>Loading...</pre>
    )

  }else{
    console.log(data[0])
    
    return(
      <div id="chart-container">
        <BarChart
        data={data}
        margin={chartMargin}
        width={window.innerWidth}
        height={window.innerHeight}
        ></BarChart>
      </div>
    )

  }
}

export default App;
