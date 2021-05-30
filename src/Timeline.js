import React, { Component } from 'react'

export class TimeLine extends Component {
    constructor(props){
        super(props);

        const currentYear  = new Date().getFullYear();
        this.time_period_list = new Array(currentYear-2000);
        for(var i=0; i<this.time_period_list.length; i++){
            this.time_period_list[i] = 2001+i;
        }
    }

    getTimelineElement(){
        const time_periods = []
        for(const[index, date] of this.time_period_list.entries()){
            time_periods.push(
                <div className="swiper-wrapper" key={index}>
                    <div className="point-wrapper">
                        <svg height="30" width="30" onMouseOver={(e)=>{this.props.handleSelectHover(e)}}>
                            <circle className="point" id={index} cx="15" cy="15" r="5" stroke="black" strokeWidth="1" fill="red"/>
                        </svg>
                    </div>
                    <p>{date}</p>
                </div>
            )
        }
        return time_periods;
    }

    mouseScroll = (e) => {
        var container = document.getElementById('timeline-carousel')
        var containerScrollPosition = document.getElementById('timeline-carousel').scrollLeft
        container.scrollTo({
            top: 0,
            left: containerScrollPosition + e.deltaY,
            behaviour: 'smooth' //if you want smooth scrolling
        })
    }

    render() {
        const time_periods = this.getTimelineElement();
        return (
        <div className="timeline-container">
            <div className="carousel" id="timeline-carousel" onWheel={(e) =>{this.mouseScroll(e)}}>
                {time_periods}
            </div>
        </div>
        )
    }
}

export default TimeLine
