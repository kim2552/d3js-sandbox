import {useState, useEffect} from 'react'
import * as d3 from 'd3'

import {PieChart} from './PieChart'

const csvUrl = 'https://gist.githubusercontent.com/kim2552/b92cb98de8ad456cc4fcbd644af568ce/raw/cssNamedColors'

const CENTER_POS = {x: window.innerWidth/2, y: window.innerHeight/2}

function App() {

  const [data,setData] = useState(null)
  const [mousePos, setMousePos] = useState(CENTER_POS)

  //Get the CSV data from URL once
  useEffect(() => {
    d3.csv(csvUrl).then(setData)
  }, [])

  const onMouseOver = (event) => {
    setMousePos({x: event.clientX, y: event.clientY})
  }

  // Load Data and Render
  if(!data){

    return(
    <pre>Loading...</pre>
    )

  }else{

    return(
      <div onMouseOver={onMouseOver}>
        <PieChart
          width={window.innerWidth*2}
          height={window.innerHeight*2}
          centerX={mousePos.x}
          centerY={mousePos.y}
          data={data}
        ></PieChart>
      </div>
    )

  }
}

export default App;
