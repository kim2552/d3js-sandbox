import React from 'react'

import {geoPath, geoTransverseMercator} from 'd3-geo'

export const Marks = ({ data:{provinces, interiors }}) => {
    const svgWidth=800
    const svgHeight=720
    const fixedTranslate={x: svgWidth/2-100, y: svgHeight/2+280}

    const provinceTextPosition={
        "CA-MB": {x: 284.2564, y: 420.6969, text: "MB"},
        "CA-SK": {x: 220.2564, y: 420.6969, text: "SK"},
        "CA-AB": {x: 150.9233, y: 400.6482, text: "AB"},
        "CA-BC": {x: 75.3623, y: 366.3645, text: "BC"},
        "CA-NU": {x: 280.1675, y: 269.3562, text: "NU"},
        "CA-NT": {x: 150.1341, y: 265.2254, text: "NT"},
        "CA-YT": {x: 56.6342, y: 225.7942, text: "YT"},
        "CA-ON": {x: 398.1643, y: 482.6332, text: "ON"},
        "CA-QC": {x: 500.6442, y: 440.1365, text: "QC"},
        "CA-NB": {x: 582.8475, y: 482.2855, text: "NB"},
        "CA-NS": {x: 625.2857, y: 487.5427, text: "NS"},
        "CA-NL": {x: 577.4923, y: 373.5523, text: "NL"},
        "CA-PE": {x: 611.2455, y: 454.2324, text: "PE"}
    }
    
    const projection = geoTransverseMercator()
    .scale(800)
    .translate([fixedTranslate.x, fixedTranslate.y])
    .rotate([96, 0])
    .center([-0.6, 38.7])
  
    const path = geoPath(projection)
    const mouseHover = (event,feature) => {
        const provinces = document.getElementsByClassName('provinces')
        for(let p of provinces){
            p.classList.remove("interactive")
        }
        event.target.classList.add("interactive")
    }

    return (
        <svg
        id="svg"
        width="100%"
        preserveAspectRatio="xMinYMin meet"
        viewBox="0 0 730 650"
        style={{border:"1px", borderStyle: "solid", borderColor: "black"}}
        >
            <g className="marks">
                {
                    provinces.features.map((feature,i) => {
                        return(
                        <g key={i}>
                            <path
                            className="provinces"
                            d={path(feature)}
                            onMouseOver={(event)=>mouseHover(event,feature)}
                            ></path>
                            <g className="regionValues">
                                <text
                                transform={`translate(${provinceTextPosition[feature.id].x},${provinceTextPosition[feature.id].y})`}
                                >{provinceTextPosition[feature.id].text}</text>
                            </g>
                        </g>
                        )
                    })
                }
                {
                <path
                className="interiors"
                d={path(interiors)}
                ></path>
                }
            </g>
        </svg>
    )
}
