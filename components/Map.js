import React, { useState } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import fetch from 'isomorphic-unfetch'

//make MapComponent own component serpeate from Map.js
const MapComponent = withScriptjs(withGoogleMap((props) => (
    <GoogleMap
        defaultZoom={5}
        defaultCenter={{ lat: props.lat, lng: props.long }}
        center={{ lat: props.lat, lng: props.long }}
    >
        {props.isMarkerShown &&
            <Marker shape="rectangle" position={{ lat: props.lat, lng: props.long }}>
                <InfoWindow
                    position={{ lat: props.lat, lng: props.long }}
                >
                    {/* shortcut taken using h2 and h4 as quick bootstrap style sizing there, full css for mobile not done */}
                    {props.weatherDescription ?
                        <div>
                            <h2> {props.city}</h2>
                            <p>It is currently {props.temperature}&deg; in {props.city} with a {props.weatherDescription}</p>
                        </div>
                        :
                        <div>
                            <h4 >Pick a City</h4>
                        </div>
                    }
                </InfoWindow>
            </Marker>
        }
    </GoogleMap>
)))

const Main = () => {
    //initialize state - start at Daese Lake
    let [latitude, setLatitude] = useState(53.9171)
    let [longitude, setLongitude] = useState(-122.7497)
    let [city, setCity] = useState('')
    let [temperature, setTemperature] = useState('')
    let [weatherDescription, setWeatherDescription] = useState('')
    let [message, setMessage] = useState({})

    //Search new location
    // One call the geocoding.js is handling both APIs would seperate into individual components so they could work independently normally easier to test and turn one off
    function updateWeatherAndCoordinates(e) {
        e.preventDefault()

        setMessage({ text: 'Loading..', variant: 'info' })

        const data = {
            city
        }

        if (city.length === 0) {
            return setMessage(true);
        }

        //fetches data from geocoding api and weather 

        fetch('/api/geocoding', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(response => {
                // add data to state
                setLatitude(response.lat)
                setLongitude(response.long)
                setTemperature(response.temperature)
                setWeatherDescription(response.weatherDescription)
                setMessage({})
            })
            .catch(() => setMessage({ text: 'Something went wrong..', variant: 'danger' })
            )

    }
    return (
        <div>
            {/* shortcut taken with favorites buttons, ideally for prototpye this would be JSON data that loads into a component that loops through and create button compnents based off of data in the JSON file, database, HTML5 storage, manully made them as shortcut */}
            <div className="col-sm-12 col-md-3">
                <h2 className="text-center">Find current Weather Conditions</h2>
                <form className="text-center" onSubmit={updateWeatherAndCoordinates}>
                    <h2>Favorite Cities</h2>
                    <div className="col-sm-12 text-center">
                        <button
                            className="btn btn-secondary"
                            // Import to put country otherwise google sends you places, also if you put CA, if there is a city in california aka Creston California, you end up there.
                            value="Dease Lake,Canada"
                            onClick={(e) => setCity(e.target.value)}>
                            Dease Lake
                        </button>
                    </div>
                    <div className="col-sm-12 text-center">
                        <button
                            className="btn btn-secondary"
                            value="Fort Nelson,Canada"
                            onClick={(e) => setCity(e.target.value)}>
                            Fort Nelson
                        </button>
                    </div>
                    <div className="col-sm-12 text-center">
                        <button
                            className="btn btn-secondary"
                            value="Terrace,Canada"
                            onClick={(e) => setCity(e.target.value)}>
                            Terrace
                    </button>
                    </div>
                    <div className="col-sm-12 text-center">
                        <button
                            className="btn btn-secondary"
                            value="Prince George,Canada"
                            onClick={(e) => setCity(e.target.value)}>
                            Prince George
                        </button>
                    </div>
                    <div className="col-sm-12 text-center">
                        <button
                            className="btn btn-secondary"
                            value="Whistler,Canada"
                            onClick={(e) => setCity(e.target.value)}>
                            Whistler
                        </button>
                    </div>
                    <div className="col-sm-12 text-center">
                        <button
                            className="btn btn-secondary"
                            value="Revelstoke,Canada"
                            onClick={(e) => setCity(e.target.value)}>
                            Revelstoke
                        </button>
                    </div>
                    <div className="col-sm-12 text-center">
                        <button
                            className="btn btn-secondary"
                            value="Creston,Canada"
                            onClick={(e) => setCity(e.target.value)}>
                            Creston
                        </button>
                    </div>
                </form>
                <form className="text-center" onSubmit={updateWeatherAndCoordinates}>
                    <div className="col-sm-12 text-center">
                        <input
                            type="text"
                            placeholder="Enter City,Country"
                            maxLength="50"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                        <label>If you don't put your country who knows where you will end up</label>
                    </div>
                    <button className="btn btn-primary">Seacrh City</button>
                </form>

                {/* could put extended forcast here */}
            </div>
            <MapComponent
                city={city}
                temperature={temperature}
                weatherDescription={weatherDescription}
                lat={latitude}
                long={longitude}
                isMarkerShown
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `80vh` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />

            <style jsx>{`
        form {
            margin:2rem;
            background: white;
            border-radius: 5px;
            padding: 1.5rem;
            overflow:hidden;
        }
        button{
            margin:10px;
        }
        h2{
            margin:8px;
        }
        p {
            margin-left: 1rem;
            margin-right: 1rem;
        }
    `}</style>
        </div >
    )

}
export default Main