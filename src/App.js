
import {useData}  from './useData'
import {Marks} from './Marks'
import Timeline from './Timeline'

const topoJsonUrl = 'https://gist.githubusercontent.com/Brideau/2391df60938462571ca9/raw/f5a1f3b47ff671eaf2fb7e7b798bacfc6962606a/canadaprovtopo.json'

function App() {
  const data = useData(topoJsonUrl)

  function handleSelection(event){

    // Reset all other points except for selected point
    const points = document.getElementsByClassName('point')
    for(let p of points){
      if(p.id !== event.target.id){
        document.getElementById(p.id).setAttribute("r","5")
      }
    }
    
    // Handles selection of either parent or children elements
    if(event.target.childNodes !== 0){
      event.target.childNodes.forEach((e) => {
        document.getElementById(e.id).setAttribute("r","10")})
    }else{
      document.getElementById(event.target.id).setAttribute("r","10")
    }
  }

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
        <Timeline handleSelection={handleSelection}></Timeline>
        <h1>Hello World</h1>
      </div>
    )

  }
}

export default App;
