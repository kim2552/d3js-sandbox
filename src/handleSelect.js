export function handleSelectHover(event){
    // Reset all other points except for selected point
    const points = document.getElementsByClassName('point')
    for(let p of points){
        if(p.id !== event.target.id){
            document.getElementById(p.id).setAttribute("r","5")
            document.getElementById(p.id).setAttribute("fill","#8a8bf9")
        }
    }

    // Handles selection of either parent or children elements
    if(event.target.childNodes !== 0){
        event.target.childNodes.forEach((e) => {
            document.getElementById(e.id).setAttribute("r","10")
            document.getElementById(e.id).setAttribute("fill","#ff0000")
        })
    }else{
        document.getElementById(event.target.id).setAttribute("r","10")
        document.getElementById(event.target.id).setAttribute("fill","#ff0000")
    }
}

export function handleSelectClick(event){
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