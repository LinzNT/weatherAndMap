import fetch from 'isomorphic-unfetch'

export default async (req, res) => {
    //We want to desctructure the incoming request
    const {
        method,
        body
    } = req

    //format the incoming input to be used in our URL
    const uriEncodedCity = encodeURIComponent(body.city)

    // handeling both google and open weather api would seperate to make each own their compartmentalize api call
    // Handel our API call to google maps and open weather api
    switch (method) {
        case 'POST':
            try {
                // Get coordinated for input city
                const currentLocation = await fetch(`https://google-maps-geocoding.p.rapidapi.com/geocode/json?language=en&address=${uriEncodedCity}`, {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-host": "google-maps-geocoding.p.rapidapi.com",
                        "x-rapidapi-key": process.env.RAPIDAPI_KEY
                    }
                })

                // create JSON for the response
                const locationData = await currentLocation.json()

                // get the longitude and latitude for the city for our map
                const lat = locationData.results[0].geometry.location.lat
                const long = locationData.results[0].geometry.location.lng

                // get weather for our input city
                const currentWeather = await fetch(`https://community-open-weather-map.p.rapidapi.com/weather?units=metric&q=${uriEncodedCity}`,
                    {
                        "method": "GET",
                        "headers": {
                            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
                            "x-rapidapi-key": process.env.RAPIDAPI_KEY
                        }
                    })
                // creates json object
                const weatherData = await currentWeather.json()

                const temperature = await weatherData.main.temp
                const weatherDescription = await weatherData.weather[0].description

                console.log(temperature)
                console.log(weatherDescription)
                // return data with status 200
                res.status(200).json({
                    lat,
                    long,
                    weatherDescription,
                    temperature
                })

            } catch (e) {
                //returns if status is error 400
                res.status(400).send()
            }
            break;
        default:
            //if request is not POST method return HTTP status code 405
            res.setHeader('Allow', ['POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}