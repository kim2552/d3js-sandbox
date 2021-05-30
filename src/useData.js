import {useState, useEffect} from 'react'

import * as d3 from 'd3'
import {feature, mesh} from 'topojson'

export const useData = (jsonUrl) => {
    
    const [geojsondata,setGeoJsonData] = useState(null)

    useEffect(() => {
        d3.json(jsonUrl).then(topojsondata => {
            const {canadaprov} = topojsondata.objects
            setGeoJsonData({
                provinces: feature(topojsondata, canadaprov),
                interiors: mesh(topojsondata, canadaprov, (a,b) => a !== b)
            })
      })
    }, [jsonUrl])

    return geojsondata
}
