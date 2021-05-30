import React from 'react'

import {geoPath, geoTransverseMercator} from 'd3-geo'

export const Marks = ({ data:{provinces, interiors }}) => {
    const svgWidth=800
    const svgHeight=720
    
    const projection = geoTransverseMercator()
    .scale(600)
    .translate([svgWidth/2, svgHeight/2+150])
    .rotate([96, 0])
    .center([-0.6, 38.7]);
  
    const path = geoPath(projection)

    return (
        <svg 
        width={svgWidth} 
        height={svgHeight*3/4}
        >
            <g className="marks">
                {
                    provinces.features.map((feature,i) => (
                        <path
                        className="provinces"
                        key={i}
                        d={path(feature)}
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
