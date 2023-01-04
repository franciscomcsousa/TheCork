import React, { useState } from 'react';
import LoginForm from '../Components/LoginForm';
import { useNavigate } from 'react-router-dom';

export const Login = () => {

    const [addEmailInput, setEmailInput] = useState('')
    const [addPasswordInput, setPasswordInput] = useState('') 

    const navigate = useNavigate();

    //Loads the page with the user's email address in the URL
    const urlName = addEmailInput.substring(0, addEmailInput.indexOf('@'))

    const handleFormChangeEmail = (emailInput) => {
        setEmailInput(emailInput)
    }

    const handleFormChangePassword = (passwordInput) => {
        setPasswordInput(passwordInput)
    }

    const handleFormSubmit = () => {
        fetch('/login', {
            method: 'POST',
            body: JSON.stringify({email: addEmailInput, password: addPasswordInput}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`This is an HTTP error: The status is ${response.status}`)
            }   
        return response.json();
         })
        .then(data => {
                navigate(`/profile/${urlName}`,{ state:{data} })
        })
        .catch(error => {
            console.log(error)
        })
    };

return (
    <div>
        <LoginForm emailInput={ addEmailInput } passwordInput={ addPasswordInput }
        onFormChangeEmail={handleFormChangeEmail} onFormChangePassword={handleFormChangePassword}
        onFormSubmit={handleFormSubmit} />
    </div>
    )
}