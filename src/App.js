import {useState} from 'react'

import {useData}  from './useData'
import {Marks} from './Marks'
import Timeline from './Timeline'
import {handleSelectHover} from './handleSelect'

const topoJsonUrl = 'https://gist.githubusercontent.com/Brideau/2391df60938462571ca9/raw/f5a1f3b47ff671eaf2fb7e7b798bacfc6962606a/canadaprovtopo.json'

function App() {
  const data = useData(topoJsonUrl)
  // const initialDate = new Date()

  // const [date, setDate] = useState(initialDate)

  if(!data){

    return(
    <pre>Loading...</pre>
    )

  }else{

    return(
      <div>
        <div className="viz-container">
          <Marks
          data={data}
          ></Marks>
        </div>
        <Timeline handleSelectHover={handleSelectHover}></Timeline>
        <h1>Hello World</h1>
      </div>
    )

  }
}

export default App;
