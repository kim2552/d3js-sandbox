import React from 'react'
import * as d3 from 'd3'

export const BarChart = ({data,width,height,margin}) => {
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    const yScale = d3.scaleBand()
    .domain(data.map(d=>d['Date']))
    .range([0, innerHeight])

    const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d=>d['Unemployment rate (%)'])])
    .range([0, innerWidth])

    return (
        <svg width={width} height={height}>
            <g transform={`translate(${margin.left},${margin.top})`}>
            {
                xScale.ticks().map(
                    (tickValue, i) =>(
                        <g key={i} transform={`translate(${xScale(tickValue)},0)`}>
                            <line
                            key={i}
                            y2={innerHeight}
                            stroke="black"
                            ></line>
                            <text
                            style={{textAnchor: 'middle'}}
                            y={innerHeight+9}
                            dy=".71em"
                            >{tickValue}</text>
                        </g>
                    ))
            }
            {
                yScale.domain().map(
                    (tickValue, i) =>(
                        <g key={i} transform={`translate(0,${yScale(tickValue)+yScale.bandwidth()/2})`}>
                            <text
                            style={{textAnchor: 'end'}}
                            x="-3"
                            dy=".32em"
                            >{tickValue}</text>
                        </g>
                    ))
            }
            {
                data.map((d,i) =>
                    <rect
                    key={i}
                    x={0}
                    y={yScale(d['Date'])}
                    width={xScale(d['Unemployment rate (%)'])}
                    height={yScale.bandwidth()}
                    opacity={.5}
                    style={{
                        fill: "skyblue",
                        stroke: "cadetblue",
                        strokeWidth: "2"
                    }}
                    ></rect>
                    )
            }                
            </g>
        </svg>
    )
}