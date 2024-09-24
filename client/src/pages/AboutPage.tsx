import React, { useState } from 'react';

const AboutPage: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

 
        alert("Thank you for reaching out! We'll get back to you soon."); 
        setFormData({
            name: '',
            email: '',
            message: ''
        });
    };

    return (
        <>
            <section>
                <h2 className = 'aboutTitle'>About NeetPlan</h2>
                <p>Welcome to NeetPlan—your all-in-one solution for staying organized and managing your day effectively! Designed with simplicity and productivity in mind, our planner combines several powerful features that help you take control of your time and tasks.</p>

                <h2 className = 'aboutTitle'>Key Features</h2>
                
                <p><strong>Calendar</strong></p>
                <p>Stay on top of important dates and events with our comprehensive calendar feature. Plan your day, week, or month at a glance, and never miss a deadline again. Easily add events or appointments and get a visual overview of what’s coming up!</p>

                <p><strong>Task List</strong></p>
                <p>Prioritize your tasks for the day, week, or even long-term goals. Create, organize, and track your to-do lists with ease. Mark tasks as complete, and let the planner help you stay on track with what's important. Whether it's personal projects or work assignments, this is your go-to tool for managing it all.</p>

                <p><strong>Weather Checker</strong></p>
                <p>No need to open a separate app to check the weather! Our built-in weather checker keeps you informed about the current conditions and forecasts, so you can plan your day around the weather, whether you're heading out for a meeting or staying indoors.</p>

                <p><strong>Reminder</strong></p>
                <p>Never forget a task or event again! Set reminders for important appointments, tasks, or even personal commitments. Choose when and how often you’d like to be reminded—our notification system will keep you updated, ensuring you're always on top of your schedule.</p>
            </section>

            <section className='contactSection'>
                <form className='contact-form' onSubmit={handleSubmit}>
                    <h3>Contact Us</h3>
                    <div className = 'form-group'>
                        <label>Name: </label>
                        <input 
                            className = 'form-input'
                            type='text' 
                            id='name' 
                            name='name' 
                            value={formData.name} 
                            onChange={handleChange} required 
                        />
                    </div>

                    <div className = 'form-group'>
                        <label>Email: </label>
                        <input 
                            className = 'form-input'
                            type='email' 
                            id='email' 
                            name='email' 
                            value={formData.email} 
                            onChange={handleChange} required 
                        />
                    </div>

                    <div className = 'form-group'>
                        <label>Message: </label>
                        <textarea 
                            className = 'form-input-message'
                            id='message' 
                            name='message' 
                            value={formData.message} 
                            onChange={handleChange} required 
                        />
                    </div>

                    <div className = 'form-group form-group-submit'>
                        <button className='btn btn-primary submitButton' type="submit">
                            Submit
                        </button>
                    </div>
                </form>
            </section>
        </>
    );
}

export default AboutPage;
