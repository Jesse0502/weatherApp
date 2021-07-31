let userInput = document.querySelector("#city-input")
let search = document.querySelector("#search")
let cityName = document.querySelector("#city-name")
let temp = document.querySelector("#temp")
let feels = document.querySelector("#feels") 
let body = document.querySelector("body")

search.addEventListener("click", (e) => {
    e.preventDefault();
    
    if(userInput.value == "" || userInput.value == null){
        alert("Enter a city")
    }
    if(userInput !== ""){
        body.classList.add("loading")
        
        console.log("Sending data")
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${userInput.value}&appid=45c45660fb0f0aa65fa34d6436ae1559`, {mode: "cors"})
        .then((response) => { 
            // console.log(response.json())
            return response.json();
        })
        .then((response) => {
            showTemp(response)
        body.classList.remove("loading")
        userInput.value = null
        })
        .catch(() => {
           cityName.textContent = "Where do you think you're going?"
           cityName.style.fontSize = "3em"
            temp.textContent = ""
            feels.textContent = ""
            body.style.backgroundImage = "url('./assets/space.jpg')"
        })

        // loading.addEventListener("load", () => {
        //     body.classList.add("loading")
        // })

        function showTemp(response){
            let country = response.sys.country
            if(country == undefined){
                cityName.textContent = response.name 
            }
            else cityName.textContent = response.name + ", " +response.sys.country
            temp.innerHTML = response.main.temp + "K"
            feels.textContent = response.weather[0].main
            checkFeels(response)
            let tempSatus = true
            temp.addEventListener("click", () => {
                if(tempSatus){
                    temp.innerHTML = (response.main.temp -273).toFixed(2)+ "&#176;C"
                    tempSatus =false
                }
                else{
                    temp.innerHTML = response.main.temp + "K"
                    tempSatus = true
                }
            })
        }

        function checkFeels(response){
            if(response.weather[0].main == 'Clear'){
                body.style.backgroundImage = "url('./assets/clear.jpg')" 
            }
            if(response.weather[0].main == 'Clouds'){
                body.style.backgroundImage = "url('./assets/cloudy.jpg')" 
            }
            if(response.weather[0].main == 'Rain'){
                body.style.backgroundImage = "url('./assets/rain.jpg')"  
            }
            if(response.weather[0].main == 'Haze'){
                body.style.backgroundImage = "url('./assets/haze.jpg')"  
            }
        }
       
    }
})