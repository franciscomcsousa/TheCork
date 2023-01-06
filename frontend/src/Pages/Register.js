import React, { useState } from 'react';
import RegisterForm from '../Components/RegisterForm';
import * as Error from '../Error';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
    
    const [addNameInput, setNameInput] = useState('')
    const [addEmailInput, setEmailInput] = useState('')
    const [addPasswordInput, setPasswordInput] = useState('')
    
    const navigate = useNavigate();
    
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
        .then(response => {
            if (!response.ok) {
            }   
            return response.json();
        })
        .then(data => {
            alert(Error.getErrorMessage(data.status))
            if (data.status === 200) {
                navigate(0)
            }
        })
    };


return (
    <div>
        <RegisterForm nameInput={ addNameInput } emailInput={ addEmailInput } passwordInput={ addPasswordInput } 
        onFormChangeName={handleFormChangeName} onFormChangeEmail={handleFormChangeEmail} onFormChangePassword={handleFormChangePassword} 
        onFormSubmit={handleFormSubmit}/>
    </div>
    )
}