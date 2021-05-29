import {useState, useEffect} from 'react'
import * as d3 from 'd3'

const csvUrl = 'https://gist.githubusercontent.com/kim2552/b92cb98de8ad456cc4fcbd644af568ce/raw/cssNamedColors'

function App() {

  const [data,setData] = useState(null)

  useEffect(() => {
    d3.csv(csvUrl).then(setData)
  }, [])

  if(!data){

    return(
    <pre>Loading...</pre>
    )

  }else{
    console.log(data[0])
    
    return(
      data.map(d =>
        <div style={{
          backgroundColor: d['RGB hex value'],
          width: "100%",
          height: "0.5rem"
        }}></div>
        )
    )

  }
}

export default App;
