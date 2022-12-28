import React, { useState, useEffect } from 'react';
import RegisterForm from '../Components/RegisterForm';

export const Register = () => {
    
    const [addNameInput, setNameInput] = useState('')
    const [addEmailInput, setEmailInput] = useState('')
    const [addPasswordInput, setPasswordInput] = useState('') 
    
    const handleFormChangeName = (nameInput) => {
        setNameInput(nameInput)
    }

    const handleFormChangeEmail = (emailInput) => {
        setEmailInput(emailInput)
    }

    const handleFormChangePassword = (passwordInput) => {
        setPasswordInput(passwordInput)
    }

    const handleFormSubmit = () => {
        fetch('/register', {
            method: 'POST',
            body: JSON.stringify({name: addNameInput, email: addEmailInput, password: addPasswordInput}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }


return (
    <div>
        <RegisterForm nameInput={ addNameInput } emailInput={ addEmailInput } passwordInput={ addPasswordInput } 
        onFormChangeName={handleFormChangeName} onFormChangeEmail={handleFormChangeEmail} onFormChangePassword={handleFormChangePassword} 
        onFormSubmit={handleFormSubmit}/>
    </div>
    )
}