// fetch functions for signing up and logging in

import { UserData } from "../interfaces/UserData";


// signup function. Needs userdata object {email: , password: , name: , location: } as parameter. Returns {token: } object.
export const signUp = async (user: UserData) => {
    try {
        const response = await fetch('/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })

        if (!response.ok) {throw new Error('Invalid API response')}

        return await response.json()
        
    } catch (error) {
        return Promise.reject('Error: Could not create user')
    }
}


// login function. Needs email and password as paramters, returns {token: } object.
export const login = async (email: string, password: string) => {
    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email, password: password})
        })

        if (!response.ok) {throw new Error('Invalid API response')}

        return await response.json()
        
    } catch (error) {
        return Promise.reject('Error: Could not log in')
    }
}