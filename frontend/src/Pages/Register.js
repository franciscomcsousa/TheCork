import React, { useState } from 'react';
import RegisterForm from '../Components/RegisterForm';

export const Register = () => {
    
    const [addNameInput, setNameInput] = useState('')
    const [addEmailInput, setEmailInput] = useState('')
    const [addPasswordInput, setPasswordInput] = useState('')
    
    const [data, setData] = useState('')
    
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
                //throw new Error(`This is an HTTP error: The status is ${response.status}`)
                //instead of throwing an error, we can use the response to display an error message TODO: implement this (and catch the error)
            }   
            return response.json();
        })
         .then(data => {
                //console.log((data))
                //console.log("AAAAAAAAAAAA")
                setData(data)
                //navigate(`/profile/${urlName}`,{ state:{data} })
        
        })
        //.catch(error => {
        //console.log(error.message)
        //})
    };


return (
    <div>
        <RegisterForm nameInput={ addNameInput } emailInput={ addEmailInput } passwordInput={ addPasswordInput } 
        onFormChangeName={handleFormChangeName} onFormChangeEmail={handleFormChangeEmail} onFormChangePassword={handleFormChangePassword} 
        onFormSubmit={handleFormSubmit} userData={data}/>
    </div>
    )
}