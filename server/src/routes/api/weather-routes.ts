import { Router, Request, Response } from "express";

const router=Router()



    router.get('/', async (req: Request, res: Response)=>{
            if (req.user && req.user.location) {
            const {location} = req.user
            const response = await fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${location},US&appid=${process.env.WEATHER_API_KEY}`
            )
                if (!response.ok) {res.status(500).json({ message: "failed to fetch weather data"})}

                else {
                    const {lat, lon, name} = await response.json()

                    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}`
                    )
                        if (!weatherResponse.ok) {res.status(500).json({ message: "failed to fetch weather data"})}

                        else {
                            const weather = await weatherResponse.json()

                            res.status(200).json({location: name, weather: weather.weather[0].description, temp: weather.main.temp})
                            
                }
                }
            }
            else {res.status(500).json({message: "no user location found"})}
        
    })


export default router