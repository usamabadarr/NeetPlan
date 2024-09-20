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

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        <p>Thank you for reaching out! We'll get back to you soon.</p>
        setFormData({
            name: '',
            email: '',
            message: ''
        });
    };

    return (
        <>
            <section>
                <h2>About our Daily Planner</h2>
                <p>Our Daily Planner app is designed to help you organize your tasks, events, and reminders in an efficient and user-friendly way.Whether you're planning your day or setting long-term goals, our tool provides all the features you need to stay on top of your schedule. </p>
                
                <p>With a sleek design and easy-to-navigate interface, the Daily Planner app is perfect for students, professionals, and anyone looking to improve their time management.</p>
            </section>

            <section className = 'contactSection'>
                <h3>Contact Us</h3>
                <form className = 'contactForm' onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor = 'name'>Name: </label>
                        <input type = 'text' id = 'name' name = 'name' value = {formData.name} onChange = {handleChange} required />

                        <label htmlFor = 'email'>Email: </label>
                        <input type = 'email' id = 'email' name = 'email' value = {formData.email} onChange = {handleChange} required />

                        <label htmlFor = 'message'>Message: </label>
                        <textarea id = 'message' name = 'message' value = {formData.message} onChange = {handleChange} required />
                    </div>

                    <button type = "submit" className = 'submit'>Submit</button>
                </form>
            </section>
        </>
    )
 }

 export default AboutPage;