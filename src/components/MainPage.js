import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import gsap from 'gsap'

function MainPage() {

    //document 
    document.body.style.backgroundRepeat = "no-repeat"
    document.body.style.backgroundSize = "cover"
    //document 

    //useRef 
    const cityStateAnim = useRef(null)
    const tempDivAnim = useRef(null)
    const inputAnim = useRef(null)

    const weatherDesAnim = useRef(null)
    const weatherHighAnim = useRef(null)
    const weatherLowAnim = useRef(null)

    const pressTitleAnim = useRef(null)
    const pressDataAnim = useRef(null)

    const humiTitleAnim = useRef(null)
    const humiDataAnim = useRef(null)

    const windTitleAnim = useRef(null)
    const windDataAnim = useRef(null)
    //useRef

    //useState 
    const [globalNumber, setGlobalNumber] = useState(0)

    const [bodyBackground, setBodyBackground] = useState("")

    const [cityInput, setCityInput] = useState('san+diego')

    const [button1Color, setButton1Color] = useState('rgba(22, 49, 114, 0.7)')
    const [button2Color, setButton2Color] = useState('rgba(255, 255, 255, 0.2)')
    const [button3Color, setButton3Color] = useState('rgba(255, 255, 255, 0.2)')

    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [population, setPopulation] = useState('')

    const [actualTemp, setActualTemp] = useState('')
    const [minTemp, setMinTemp] = useState('')
    const [maxTemp, setMaxTemp] = useState('')

    const [feelsLike, setFeelsLike] = useState('')

    const [humidity, setHumidity] = useState('')
    const [pressure, setPressure] = useState('')
    const [windSpeed, setWindSpeed] = useState('')

    const [dayDescription, setDayDescription] = useState('')
    const [dayMain, setDayMain] = useState('')

    const [today, setToday] = useState('')
    const [tomorrow, setTomorrow] = useState('')
    const [twoTomorrow, setTwoTomorrow] = useState('')

    const [errorOpacity, setErrorOpacity] = useState(0)
    //useState 

    document.body.style.background = bodyBackground

    //useEffect 
    useEffect(() => {
        axios.get('http://api.openweathermap.org/data/2.5/forecast?q=' + cityInput + '&appid=2ccb7d2b46e1765b3c0cd9d9135e88cd')

        .then(res => {
            const info = res.data 

            console.log(info)

            setCity(info.city.name)
            setCountry(info.city.country)
            setPopulation(info.city.population)

            var actualtemp = []
            var mintemp = []
            var maxtemp = []

            var feelslike = []

            var humidity = []
            var pressure = []
            var windspeed = []

            var daydescription = []
            var daymain = []

            for (let i = 0; i < 5; i++) {
                actualtemp.push((info.list[i].main.temp - 273.15) * 9/5 + 32)
                mintemp.push((info.list[i].main.temp_min - 273.15) * 9/5 + 32)
                maxtemp.push((info.list[i].main.temp_max - 273.15) * 9/5 + 32)

                feelslike.push((info.list[i].main.feels_like - 273.15) * 9/5 + 32)

                humidity.push(info.list[i].main.humidity)
                pressure.push(info.list[i].main.pressure)
                windspeed.push(info.list[i].wind.speed * 2.237)

                daydescription.push(info.list[i].weather[0].description)
                daymain.push(info.list[i].weather[0].main)
            }
            setActualTemp(actualtemp)
            setMinTemp(mintemp)
            setMaxTemp(maxtemp)

            setFeelsLike(feelslike)

            setHumidity(humidity)
            setPressure(pressure)
            setWindSpeed(windspeed)

            setDayDescription(daydescription)
            setDayDescription(daydescription)
            setDayMain(daydescription)


            setErrorOpacity(0)

            if (dayDescription.includes('rain') || dayMain.includes('rain')) {
                setBodyBackground("url('https://images.pexels.com/photos/3742711/pexels-photo-3742711.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')")
            }
    
            else if (dayDescription.includes('snow') || dayMain.includes('snow')) {
                setBodyBackground("url('https://images.pexels.com/photos/414459/pexels-photo-414459.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')")
            }
    
            else {
                setBodyBackground("url('https://images.pexels.com/photos/2114014/pexels-photo-2114014.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')")
            }
        })

        .catch(err => {
            const errMsg = err.msg
            console.log(errMsg)
            setErrorOpacity(1)
        })
    }, [])

    useEffect(() => {

        var today = ""
        var objToday = new Date(),
            weekday = new Array('Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'),
            dayOfWeek = weekday[objToday.getDay()],
            domEnder = function() { var a = objToday; if (/1/.test(parseInt((a + "").charAt(0)))) return "th"; a = parseInt((a + "").charAt(1)); return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : "th" }(),
            dayOfMonth = today + ( objToday.getDate() < 10) ? '' + objToday.getDate() + domEnder : objToday.getDate() + domEnder,
            months = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'),
            curMonth = months[objToday.getMonth()],
            today = curMonth + " " + dayOfWeek + " " + dayOfMonth
        setToday(today)

        var tomorrow = ""
        
        var objTomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
            weekday2 = new Array('Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'),
            dayOfWeek2 = weekday2[objToday.getDay()],
            domEnder2 = function() { var a = objTomorrow; if (/1/.test(parseInt((a + "").charAt(0)))) return "th"; a = parseInt((a + "").charAt(1)); return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : "th" }(),
            dayOfMonth2 = tomorrow + ( objTomorrow.getDate() < 10) ? '' + objTomorrow.getDate() + domEnder2 : objTomorrow.getDate() + domEnder2,
            months2 = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'),
            curMonth2 = months2[objTomorrow.getMonth()],
            tomorrow = curMonth2 + " " + dayOfWeek2 + " " + dayOfMonth2
    setTomorrow(tomorrow)

    var twotomorrow = ""
        
        var objTwoTomorrow = new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000),
            weekday3 = new Array('Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'),
            dayOfWeek3 = weekday3[objToday.getDay()],
            domEnder3 = function() { var a = objTwoTomorrow; if (/1/.test(parseInt((a + "").charAt(0)))) return "th"; a = parseInt((a + "").charAt(1)); return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : "th" }(),
            dayOfMonth3 = tomorrow + ( objTwoTomorrow.getDate() < 10) ? '' + objTwoTomorrow.getDate() + domEnder3 : objTwoTomorrow.getDate() + domEnder3,
            months3 = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'),
            curMonth3 = months3[objTwoTomorrow.getMonth()],
            twotomorrow = curMonth3 + " " + dayOfWeek3 + " " + dayOfMonth3
    setTwoTomorrow(twotomorrow)
    }, [])

    useEffect(() => {
        gsap.fromTo(cityStateAnim.current, { autoAlpha: 0, x: -15 }, { autoAlpha: 1, x: 0, duration: 1, delay: 0.5 })
        gsap.fromTo(tempDivAnim.current, { autoAlpha: 0, y: 15 }, { autoAlpha: 1, y: 0, duration: 1, delay: 0.5 })
        gsap.fromTo(inputAnim.current, { autoAlpha: 0, y: -15 }, { autoAlpha: 1, y: 0, duration: 1, delay: 0.75 })
    
        gsap.fromTo(weatherDesAnim.current, { autoAlpha: 0, y: -15 }, { autoAlpha: 1, y: 0, duration: 0.75, delay: 1 })

        gsap.fromTo(weatherHighAnim.current, { autoAlpha: 0, x: -15 }, { autoAlpha: 1, x: 0, duration: 0.75, delay: 1.25 })
        gsap.fromTo(weatherLowAnim.current, { autoAlpha: 0, x: 15 }, { autoAlpha: 1, x: 0, duration: 0.75, delay: 1.25 })

        gsap.fromTo(pressTitleAnim.current, { autoAlpha: 0, x: -15 }, { autoAlpha: 1, x: 0, duration: 0.75, delay: 1.75 })
        gsap.fromTo(pressDataAnim.current, { autoAlpha: 0, x: 15  }, { autoAlpha: 1, x: 0, duration: 0.75, delay: 1.75 })
    
        gsap.fromTo(humiTitleAnim.current, { autoAlpha: 0, x: -15 }, { autoAlpha: 1, x: 0, duration: 0.75, delay: 1.85 })
        gsap.fromTo(humiDataAnim.current, { autoAlpha: 0, x: 15 }, { autoAlpha: 1, x: 0, duration: 0.75, delay: 1.85 })

        gsap.fromTo(windTitleAnim.current, { autoAlpha: 0, x: -15 }, { autoAlpha: 1, x: 0, duration: 0.75, delay: 1.95 })
        gsap.fromTo(windDataAnim.current, { autoAlpha: 0, x: 15 }, { autoAlpha: 1, x: 0, duration: 0.75, delay: 1.95 })
    }, [])
    //useEffect

    const actualtemp = Array.from(actualTemp)

    //functions 
    const clickToday = () => {
        if (globalNumber === 0) {
            console.log(globalNumber)
        }
        else {
            gsap.fromTo(tempDivAnim.current, { autoAlpha: 0, y: 15 }, { autoAlpha: 1, y: 0, duration: 1, delay: 0.2 })
        
            gsap.fromTo(weatherDesAnim.current, { autoAlpha: 0, y: -15 }, { autoAlpha: 1, y: 0, duration: 0.75, delay: 0.5 })

            gsap.fromTo(weatherHighAnim.current, { autoAlpha: 0, x: -15 }, { autoAlpha: 1, x: 0, duration: 0.75, delay: 1 })
            gsap.fromTo(weatherLowAnim.current, { autoAlpha: 0, x: 15 }, { autoAlpha: 1, x: 0, duration: 0.75, delay: 1 })

            gsap.fromTo(pressDataAnim.current, { autoAlpha: 0, x: 15  }, { autoAlpha: 1, x: 0, duration: 0.75, delay: 1.1 })
        
            gsap.fromTo(humiDataAnim.current, { autoAlpha: 0, x: 15 }, { autoAlpha: 1, x: 0, duration: 0.75, delay: 1.2 })

            gsap.fromTo(windDataAnim.current, { autoAlpha: 0, x: 15 }, { autoAlpha: 1, x: 0, duration: 0.75, delay: 1.3 })
        }
        setGlobalNumber(0)
        setButton1Color('rgba(22, 49, 114, 0.7)')
        setButton2Color('rgba(255, 255, 255, 0.2)')
        setButton3Color('rgba(255, 255, 255, 0.2)')
    }

    const clickTomorrow = () => {
        if (globalNumber === 1) {
            console.log(globalNumber)
        }
        else {
            gsap.fromTo(tempDivAnim.current, { autoAlpha: 0, y: 15 }, { autoAlpha: 1, y: 0, duration: 1, delay: 0.2 })
        
            gsap.fromTo(weatherDesAnim.current, { autoAlpha: 0, y: -15 }, { autoAlpha: 1, y: 0, duration: 0.75, delay: 0.5 })

            gsap.fromTo(weatherHighAnim.current, { autoAlpha: 0, x: -15 }, { autoAlpha: 1, x: 0, duration: 0.75, delay: 1 })
            gsap.fromTo(weatherLowAnim.current, { autoAlpha: 0, x: 15 }, { autoAlpha: 1, x: 0, duration: 0.75, delay: 1 })

            gsap.fromTo(pressDataAnim.current, { autoAlpha: 0, x: 15  }, { autoAlpha: 1, x: 0, duration: 0.75, delay: 1.1 })
        
            gsap.fromTo(humiDataAnim.current, { autoAlpha: 0, x: 15 }, { autoAlpha: 1, x: 0, duration: 0.75, delay: 1.2 })

            gsap.fromTo(windDataAnim.current, { autoAlpha: 0, x: 15 }, { autoAlpha: 1, x: 0, duration: 0.75, delay: 1.3 })
        }
        setGlobalNumber(1)
        setButton2Color('rgba(22, 49, 114, 0.7)')
        setButton1Color('rgba(255, 255, 255, 0.2)')
        setButton3Color('rgba(255, 255, 255, 0.2)')
    }

    const clickTwoDay = () => {
        if (globalNumber === 2) {
            console.log(globalNumber)
        }
        else {
            gsap.fromTo(tempDivAnim.current, { autoAlpha: 0, y: 15 }, { autoAlpha: 1, y: 0, duration: 1, delay: 0.2 })
        
            gsap.fromTo(weatherDesAnim.current, { autoAlpha: 0, y: -15 }, { autoAlpha: 1, y: 0, duration: 0.75, delay: 0.5 })

            gsap.fromTo(weatherHighAnim.current, { autoAlpha: 0, x: -15 }, { autoAlpha: 1, x: 0, duration: 0.75, delay: 1 })
            gsap.fromTo(weatherLowAnim.current, { autoAlpha: 0, x: 15 }, { autoAlpha: 1, x: 0, duration: 0.75, delay: 1 })

            gsap.fromTo(pressDataAnim.current, { autoAlpha: 0, x: 15  }, { autoAlpha: 1, x: 0, duration: 0.75, delay: 1.1 })
        
            gsap.fromTo(humiDataAnim.current, { autoAlpha: 0, x: 15 }, { autoAlpha: 1, x: 0, duration: 0.75, delay: 1.2 })

            gsap.fromTo(windDataAnim.current, { autoAlpha: 0, x: 15 }, { autoAlpha: 1, x: 0, duration: 0.75, delay: 1.3 })
        }
        setGlobalNumber(2)
        setButton3Color('rgba(22, 49, 114, 0.7)')
        setButton2Color('rgba(255, 255, 255, 0.2)')
        setButton1Color('rgba(255, 255, 255, 0.2)')
    }

    //mouse over 
    const mouseOverToday = () => {
        if (button1Color === 'rgba(22, 49, 114, 0.7)') {
            setButton1Color('rgba(96, 122, 182, 0.6)')
        }
        else {
            setButton1Color('rgba(255, 255, 255, 0.3)')
        }
    }

    const mouseOverTomorrow = () => {
        if (button2Color === 'rgba(22, 49, 114, 0.7)') {
            setButton2Color('rgba(96, 122, 182, 0.6)')
        }
        else {
            setButton2Color('rgba(255, 255, 255, 0.3)')
        }
    }

    const mouseOverTwoDay = () => {
        if (button3Color === 'rgba(22, 49, 114, 0.7)') {
            setButton3Color('rgba(96, 122, 182, 0.6)')
        }
        else {
            setButton3Color('rgba(255, 255, 255, 0.3)')
        }
    }
    //mouse over 

    //mouse leave 
    const mouseLeaveToday = () => {
        if (button1Color === 'rgba(96, 122, 182, 0.6)' || button1Color === 'rgba(22, 49, 114, 0.7)') {
            setButton1Color('rgba(22, 49, 114, 0.7)')
        }
        else {
            setButton1Color('rgba(255, 255, 255, 0.2)')
        }
    }

    const mouseLeaveTomorrow = () => {
        if (button2Color === 'rgba(96, 122, 182, 0.6)' || button2Color === 'rgba(22, 49, 114, 0.7)') {
            setButton2Color('rgba(22, 49, 114, 0.7)')
        }
        else {
            setButton2Color('rgba(255, 255, 255, 0.2)')
        }
    }

    const mouseLeaveTwoDay = () => {
        if (button3Color === 'rgba(96, 122, 182, 0.6)' || button3Color === 'rgba(22, 49, 114, 0.7)') {
            setButton3Color('rgba(22, 49, 114, 0.7)')
        }
        else {
           setButton3Color('rgba(255, 255, 255, 0.2)') 
        }
    }
    //mouse leave 

    const handleSubmit = e => {
        e.preventDefault()

        setCityInput(e.target.value)

        axios.get('http://api.openweathermap.org/data/2.5/forecast?q=' + cityInput + '&appid=2ccb7d2b46e1765b3c0cd9d9135e88cd')

        .then(res => {
            const info = res.data 

            console.log(info)

            setCity(info.city.name)
            setCountry(info.city.country)
            setPopulation(info.city.population)

            var actualtemp = []
            var mintemp = []
            var maxtemp = []

            var feelslike = []

            var humidity = []
            var pressure = []
            var windspeed = []

            var daydescription = []
            var daymain = []

            for (let i = 0; i < 5; i++) {
                actualtemp.push((info.list[i].main.temp - 273.15) * 9/5 + 32)
                mintemp.push((info.list[i].main.temp_min - 273.15) * 9/5 + 32)
                maxtemp.push((info.list[i].main.temp_max - 273.15) * 9/5 + 32)

                feelslike.push((info.list[i].main.feels_like - 273.15) * 9/5 + 32)

                humidity.push(info.list[i].main.humidity)
                pressure.push(info.list[i].main.pressure)
                windspeed.push(info.list[i].wind.speed * 2.237)

                daydescription.push(info.list[i].weather[0].description)
                daymain.push(info.list[i].weather[0].main)
            }
            setActualTemp(actualtemp)
            setMinTemp(mintemp)
            setMaxTemp(maxtemp)

            setFeelsLike(feelslike)

            setHumidity(humidity)
            setPressure(pressure)
            setWindSpeed(windspeed)

            setDayDescription(daydescription)
            setDayMain(daymain)

            setErrorOpacity(0)

            if (dayDescription[0].includes('rain') || dayMain[0].includes('rain')) {
                setBodyBackground("url('https://images.pexels.com/photos/3742711/pexels-photo-3742711.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')")
            }
    
            else if (dayDescription[0].includes('snow') || dayMain[0].includes('snow')) {
                setBodyBackground("url('https://images.pexels.com/photos/414459/pexels-photo-414459.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')")
            }
    
            else {
                setBodyBackground("url('https://images.pexels.com/photos/2114014/pexels-photo-2114014.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')")
            }

            gsap.fromTo(cityStateAnim.current, { autoAlpha: 0, x: -15 }, { autoAlpha: 1, x: 0, duration: 1, delay: 0.2 })
            gsap.fromTo(tempDivAnim.current, { autoAlpha: 0, y: 15 }, { autoAlpha: 1, y: 0, duration: 1, delay: 0.2 })
        
            gsap.fromTo(weatherDesAnim.current, { autoAlpha: 0, y: -15 }, { autoAlpha: 1, y: 0, duration: 0.75, delay: 0.5 })
    
            gsap.fromTo(weatherHighAnim.current, { autoAlpha: 0, x: -15 }, { autoAlpha: 1, x: 0, duration: 0.75, delay: 1 })
            gsap.fromTo(weatherLowAnim.current, { autoAlpha: 0, x: 15 }, { autoAlpha: 1, x: 0, duration: 0.75, delay: 1 })
    
            gsap.fromTo(pressDataAnim.current, { autoAlpha: 0, x: 15  }, { autoAlpha: 1, x: 0, duration: 0.75, delay: 1.1 })
        
            gsap.fromTo(humiDataAnim.current, { autoAlpha: 0, x: 15 }, { autoAlpha: 1, x: 0, duration: 0.75, delay: 1.2 })
    
            gsap.fromTo(windDataAnim.current, { autoAlpha: 0, x: 15 }, { autoAlpha: 1, x: 0, duration: 0.75, delay: 1.3 })
        })

        .catch(err => {
            console.log(err)
            setErrorOpacity(1)
        })
        setCityInput('')
        
        var form = document.getElementById("myForm");
        form.reset();
    }

    const handleChange = e => {
        setCityInput(e.target.value)
    }
    //functions 

    if (window.location.protocol.indexOf('https') == 0){
        var el = document.createElement('meta')
        el.setAttribute('http-equiv', 'Content-Security-Policy')
        el.setAttribute('content', 'upgrade-insecure-requests')
        document.head.append(el)
      }

    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>

            <div className="left-side-tab">

                <div ref={cityStateAnim} className="absolute-city-div">{city}, {country}</div>

                <div className="left-top-side">
                    <form ref={inputAnim} className="form-input" onSubmit={handleSubmit} onChange={handleChange} id="myForm">
                        <input type="text" placeholder="search for a city" />
                        <div className="city-not-found" style={{opacity: errorOpacity}}>City Not Found</div>
                    </form>
                </div>

                <div className="left-bottom-side">
                    <div className="left-bottom-side-container" ref={tempDivAnim}>
                        <div className="actual-temp">{Math.round(actualtemp[globalNumber])}&#176;</div>
                        <div className="long-div"></div>
                        <div className="feels-like">feels like {Math.round(feelsLike[globalNumber])}&#176;</div>
                    </div>
                    
                </div>

            </div>

            <div className="right-side-tab">

                <div className="box-container-right-side">

                    <div className="day-description" ref={weatherDesAnim} >{dayDescription[globalNumber]}</div>

                    <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                        <div className="high-temp" ref={weatherHighAnim}>High: {Math.round(maxTemp[globalNumber])}&#176;</div>
                        <div className="low-temp" ref={weatherLowAnim}>Low: {Math.round(minTemp[globalNumber])}&#176;</div>
                    </div>
 
                </div>

                <div className="box-container-right-side" style={{flexDirection: 'row', height: '15%'}}>
                    <div className="pressure-title" ref={pressTitleAnim}>Pressure</div>
                    <div className="pressure" ref={pressDataAnim}>{pressure[globalNumber]} hPa</div>
                </div>

                <div className="box-container-right-side" style={{flexDirection: 'row', height: '15%'}}>
                    <div className="pressure-title" ref={humiTitleAnim}>Humidity</div>
                    <div className="pressure" ref={humiDataAnim}>{humidity[globalNumber]}%</div>
                </div>

                <div className="box-container-right-side" style={{flexDirection: 'row', height: '15%'}}>
                    <div className="pressure-title" ref={windTitleAnim}>Wind Speed</div>
                    <div className="pressure" ref={windDataAnim}>{Math.round(windSpeed[globalNumber] * 10) / 10} mph</div>
                </div>

                <div className="box-container-right-side" style={{flexDirection: 'row'}}>
                    <div className="button-box-container">
                        <button onClick={clickToday} onMouseOver={mouseOverToday} onMouseLeave={mouseLeaveToday}
                            style={{backgroundColor: button1Color}}>
                                {today}
                        </button>

                        <button onClick={clickTomorrow} onMouseOver={mouseOverTomorrow} onMouseLeave={mouseLeaveTomorrow}
                            style={{backgroundColor: button2Color}}>
                                {tomorrow}
                        </button>

                        <button onClick={clickTwoDay} onMouseOver={mouseOverTwoDay} onMouseLeave={mouseLeaveTwoDay}
                            style={{backgroundColor: button3Color}}>
                                {twoTomorrow}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default MainPage
