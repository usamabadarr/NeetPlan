// fetch functions for user editing routes

import auth from "../utils/auth"

//user delete fetch, needs no parameters, returns {message: 'user deleted} if successful
export const deleteUser = async () => {
    try {
    const response = await fetch('/api/user', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.getToken()}`
        }
    })

    if (!response.ok) {throw new Error('Invalid API response')}

    return await response.json()

    } catch(error) {
        return Promise.reject('Error: Could not delete user')
    }


}



// user update fetch, takes in new name and location values as parameters, returns {token: token} object on successful fetch.
export const updateUser = async (name: string, location: string) => {
    try {
        const body = {name, location}
        const response = await fetch('api/user', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth.getToken()}`
            },
            body: JSON.stringify(body)
        })

        if (!response.ok) {throw new Error('Invalid API response')}

        return await response.json()

    } catch (error) {
        return Promise.reject('Error: Could not update user')
    }
}


