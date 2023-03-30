import React, { useState, useEffect } from 'react'
import './home.css'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { cityData } from '../state_city_data';
import { stores } from '../store data';

export const Home = () => {
    const [state, setState] = useState([])
    const [selectedState, setSelectedState] = useState('');
    const [city, setCity] = useState([])
    const [selectedCity, setSelectedCity] = useState("")
    const [store, setStore] = useState([])

    useEffect(() => {
        var tempState = []
        cityData.forEach((item) => {
            tempState.push(item.state)
        })
        setState(tempState)
    }, [])

    const locateStore = () => {
        if (selectedState !== "" && selectedCity !== "") {
            const randomIndex = []
            while (randomIndex.length < 4) {
                var temp = Math.floor(Math.random() * 10)
                if (temp >= 0 && temp < 10) {
                    if (!randomIndex.includes(temp)) {
                        randomIndex.push(temp)
                    }
                }
            }
            var tempStores = []
            for (let i = 0; i < 4; i++) {
                var tempIndex = randomIndex[i]
                tempStores.push(stores[randomIndex[i]])
            }
            setStore(tempStores)
        }
    }


    const updateCity = (value) => {
        var tempCity = []
        cityData.forEach((item) => {
            if (item.state === value) {
                console.log(selectedState);
                tempCity = item.districts
            }
        })
        setCity(tempCity);
    }

    const handleChange = (event) => {
        setSelectedState(event.target.value);
        updateCity(event.target.value)

    };
    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);

    };

    const hanldeThankYouClick = () =>{
        document.querySelector(".thankyou").style.display = "flex";
    }

    return (
        <div className='home'>
            <header>
                <div className="logo">
                    Gemopai
                </div>
                <div className="links">
                    <ul>
                        <li className='active'>Home</li>
                        <li>About</li>
                        <li>Serivces</li>
                        <li>Gallery</li>
                        <li>Contact us</li>
                    </ul>
                </div>
                <div className="action_button">
                    <button
                        style={{
                            color: "white",
                            backgroundColor: "rgb(99, 179, 206)",
                        }}
                    >Book Now</button>
                    <button>Enquire Now</button>
                </div>
            </header>
            <body>
                <div className="thankyou">
                    <img src=" https://d3h2k7ug3o5pb3.cloudfront.net/image/2022-02-27/5b42cb80-97bd-11ec-b9dd-f3f1585cea44.gif" alt="thank you image" />
                </div>
                <div className="search">
                    <div className="upper">
                        <h1
                            style={{
                                color: "rgb(99,179,206)"
                            }}
                        >Dealer Locator</h1>
                        <h1>Find an <span
                            style={{
                                color: "rgb(99,179,206)"
                            }}
                        >Gemopai</span>  store near you</h1>
                        <p
                            style={{
                                color: "lightgrey"
                            }}
                        >Please select your state and city from the dropdown below</p>
                    </div>
                    <div className="lower">
                        <FormControl sx={{ m: 1, minWidth: 320 }} size="small">
                            <InputLabel id="demo-select-small">State</InputLabel>
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={selectedState}
                                label="State"
                                onChange={handleChange}
                            >
                                {
                                    state.map((item, index) => {
                                        return (
                                            <MenuItem value={item} key={index}>{item}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                        <FormControl sx={{ m: 1, minWidth: 320 }} size="small">
                            <InputLabel id="demo-select-small">City</InputLabel>
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={selectedCity}
                                label="State"
                                onChange={handleCityChange}
                            >
                                {
                                    (city.length === 0) && (
                                        <MenuItem value="">
                                            <em>Select a state to show cities</em>
                                        </MenuItem>
                                    )
                                }
                                {
                                    city.map((item, index) => {
                                        return (
                                            <MenuItem value={item} key={index}>{item}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                        <button className="locate" onClick={locateStore}>Locate store</button>
                    </div>
                </div>
                <div className="answer">
                    {/*  */}
                    {
                        store.map((item, index) => {
                            return (
                                <div className="card" key={index}>
                                    <h3 className="store_name">{item.storeName}</h3>
                                    <div className="phone">
                                        <i style={{
                                            color: "black",
                                            marginRight: "8px"
                                        }} className='bx bx-phone' ></i>
                                        {item.number}
                                    </div>
                                    <div className="address">
                                        <i style={{
                                            color: "black",
                                            marginRight: "8px"
                                        }} className='bx bx-home' ></i>
                                        {item.address}
                                    </div>
                                    <button onClick={hanldeThankYouClick}>Book Now</button>
                                </div>
                            )
                        })
                    }

                </div>
            </body>

        </div>
    )
}
