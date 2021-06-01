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

    const provinceCases={
        "CA-MB": {number: 462, text: "MB"},
        "CA-SK": {number: 644, text: "SK"},
        "CA-AB": {number: 2664, text: "AB"},
        "CA-BC": {number: 4646, text: "BC"},
        "CA-NU": {number: 5, text: "NU"},
        "CA-NT": {number: 5, text: "NT"},
        "CA-YT": {number: 5, text: "YT"},
        "CA-ON": {number: 3634, text: "ON"},
        "CA-QC": {number: 346, text: "QC"},
        "CA-NB": {number: 467, text: "NB"},
        "CA-NS": {number: 44, text: "NS"},
        "CA-NL": {number: 467, text: "NL"},
        "CA-PE": {number: 10, text: "PE"}
    }

    const maxValue = 5000
    const minValue = 1
    const scale = (num, in_min, in_max, out_min, out_max) => {
        return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
      }
    
    const projection = geoTransverseMercator()
    .scale(800)
    .translate([fixedTranslate.x, fixedTranslate.y])
    .rotate([96, 0])
    .center([-0.6, 38.7])
  
    const path = geoPath(projection)
    const mouseHover = (event,key) => {
        const regionPathElement = document.getElementById('region_path_'+key)
        const regionElement = document.getElementById('region_'+key)
        regionPathElement.classList.add('interactive')
        regionElement.classList.remove('hide')
        console.log(event.target)
        console.log(event.target.parentElement.parentElement)
        // event.target.parentElement.parentElement.appendChild(event.target);
    }
    const mouseOut = (event,key) => {
        const regionPathElement = document.getElementById('region_path_'+key)
        const regionElement = document.getElementById('region_'+key)
        regionPathElement.classList.remove('interactive')
        regionElement.classList.add('hide')
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
                        <g 
                        className="province-group"
                        key={i}
                        onMouseOver={(event)=>mouseHover(event,i)}
                        onMouseOut={(event)=>mouseOut(event,i)}
                        >
                            <path
                            fill="blue"
                            opacity={scale(provinceCases[feature.id].number,minValue,maxValue,1,0.1)}
                            className="provinces"
                            id={"region_path_"+i}
                            d={path(feature)}
                            ></path>
                            <g className="regionValues hide" id={"region_"+i}>
                                <rect
                                fill="black"
                                opacity=".5"
                                width="50"
                                height="25"
                                rx="10" ry="10"
                                transform={`translate(${provinceTextPosition[feature.id].x-15},${provinceTextPosition[feature.id].y-17})`}/>
                                <text
                                fill="white"
                                opacity="1"
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
