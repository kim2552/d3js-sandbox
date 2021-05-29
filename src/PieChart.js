import React from 'react'
import * as d3 from 'd3'

export const PieChart = ({centerX, centerY, width, height, data}) => {
    const pieArc = d3.arc()
    .innerRadius(0)
    .outerRadius(width)

    const colorPie=d3.pie().value(1)

    return (
        <svg width={width} height={height}>
            <g transform={`translate(${centerX} ${centerY})`}>
            {
                colorPie(data).map((d,i) => (
                    <path
                    key={i}
                    fill={d.data['RGB hex value']}
                    d={pieArc(d)}
                    ></path>
                ))
            }
            </g>
        </svg>
    )
}