import React from 'react'

import {geoPath, geoTransverseMercator} from 'd3-geo'

export const Marks = ({ data:{provinces, interiors }}) => {
    const svgWidth=800
    const svgHeight=720
    
    const projection = geoTransverseMercator()
    .scale(800)
    .translate([svgWidth/2-100, svgHeight/2+280])
    .rotate([96, 0])
    .center([-0.6, 38.7]);
  
    const path = geoPath(projection)

    const mouseClick = (event,feature) => {
        const provinces = document.getElementsByClassName('provinces')
        for(let p of provinces){
            p.classList.remove("interactive")
        }
        event.target.classList.add("interactive")
    }

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
                    provinces.features.map((feature,i) => (
                        <path
                        className="provinces"
                        key={i}
                        d={path(feature)}
                        onClick={(event)=>mouseClick(event,feature)}
                        onMouseOver={(event)=>mouseHover(event,feature)}
                        ></path>
                    ))
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
