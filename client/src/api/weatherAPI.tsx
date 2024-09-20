import auth from "../utils/auth"

const fetchWeather = async() => {
    try {
    const response = await fetch('/api/weather', {
        method: "GET",
        headers: {'Content-Type': 'application/json',
                Authorization: `Bearer ${auth.getToken()}`
        }
        
    })

    const data = await response.json()
    
    if (!response.ok) {throw new Error('failed to fetch weather')}

    return data

    } catch (error) {
        return Promise.reject('Error: Could not fetch weather')
    }
}

export default fetchWeather
