// fetch functions for event routes

import auth from "../utils/auth"
import { EventData } from "../interfaces/EventData"


// create event function, needs to be called with {name: , date: , startTime: , endTime: , notes: } object. Returns event object if successful.
export const createEvent = async (event: EventData) => {
    try {
        const response = await fetch('/api/event', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth.getToken()}`
            },
            body: JSON.stringify(event)
        })

        if (!response.ok) {throw new Error('Invalid API response')}

        return response.json()
    } catch (error) {
        return Promise.reject('unable to create event')
    }
}


// delete event function, needs to be called with event id as paramter. Returns {message: event deleted} if successful
export const deleteEvent = async (id: string) => {
    try {
        const response = await fetch(`/api/event/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth.getToken()}`
            },
        })

        if (!response.ok) {throw new Error('Invalid API response')}

        return response.json()
    } catch (error) {
        return Promise.reject('unable to delete event')
    }
}


// update event function. Needs to be called with {name: , date: , startTime: , endTime: , notes: } object, then event id. Returns event object if successful.
export const updateEvent = async (event: EventData, id: string) => {
    try {
        const response = await fetch(`/api/event/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth.getToken()}`
            },
            body: JSON.stringify(event)
        })

        if (!response.ok) {throw new Error('Invalid API response')}

        return response.json()
    } catch (error) {
        return Promise.reject('unable to create event')
    }
}

// get all events function. Returns array of all event data from logged-in user.
export const getAllEvents = async () => {
    try {
        const response = await fetch('/api/event/all',
        {method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth.getToken()}`
            }
        })

        if (!response.ok) {throw new Error('Invalid API response')}

        return response.json()

    } catch (error) {
        return Promise.reject('unable to fetch events')
    }
}


// get today's events function. Returns array of all event data from logged-in user for which the 'date' is today.
export const getTodayEvents = async () => {
    try {
        const response = await fetch('/api/event/today',
        {method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth.getToken()}`
            }
        })
    
        if (!response.ok) {throw new Error('Invalid API response')}
    
        return response.json()
        
    } catch (error) {
        return Promise.reject('unable to fetch events')
    }
}


// get single event by id function. Requires event id as parameter. Returns event object for the given event if successful.
export const getSingleEvent = async (id: string) => {
    try {
        const response = await fetch(`/api/event/${id}`,
        {method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth.getToken()}`
            }
        })
    
        if (!response.ok) {throw new Error('Invalid API response')}
    
        return response.json()
        
    } catch (error) {
        return Promise.reject('unable to fetch event')
    }
}