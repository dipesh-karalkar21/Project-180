let coords = {}

$(document).ready(function(){
    getLocation()
    render_weather()
})

function getLocation(){
    console.log(window.location.search)
    let location =new URLSearchParams(window.location.search)
    console.log(location)
    if(location.has("source") && location.has("destination")){
        let source = location.get("source")
        let destination = location.get("destination")
        coords.source_lat = source.split(";")[0]
        coords.source_lng = source.split(";")[1]
        coords.dest_lat = destination.split(";")[0]
        coords.dest_lng = destination.split(";")[1]
        console.log(coords)
    }
    else{
        alert("destination not selected")
        window.history.back()
    }
}

function render_weather() {
    $.ajax({
     type:"get",
     url:`https://api.openweathermap.org/data/2.5/weather?lat=${coords.dest_lat}&lon=${coords.dest_lng}&appid=9bcd38e9fbfe21d5b44b1f9152ca4362`,
     success:function(res){
        let name = res.name
        let weather = res.weather[0].main
        $("#scene").append(
            `
                <a-text height = "2" align = "center" color = "yellow" position = "0 0 -10" value = "Weather forecast is ${weather} at ${name}" />
                
            `
        )
     }
    })
}
