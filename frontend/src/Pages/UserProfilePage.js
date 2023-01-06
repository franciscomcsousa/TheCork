import React, { useState } from 'react';
import Profile from '../Components/UserProfile';

export const UserProfilePage = () => {
    
    const [addEmailInput, setEmailInput] = useState('')
    const [addPasswordInput, setPasswordInput] = useState('') 

    const [data, setData] = useState('')

    const handleFormChangeEmail = (emailInput) => {
        setEmailInput(emailInput)
    }

    const handleFormChangePassword = (passwordInput) => {
        setPasswordInput(passwordInput)
    }

    const handleFormSubmit = () => {
        fetch('/profile', {
            method: 'POST',
            body: JSON.stringify({email: addEmailInput, password: addPasswordInput}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                //throw new Error(`This is an HTTP error: The status is ${response.status}`)
            }   
        return response.json();
         })
        .then(data => {
            setData(data)
        })
        //.catch(error => {
        //   console.log(error)
        //})
    };

return (
    <div>
        <Profile emailInput={ addEmailInput } passwordInput={ addPasswordInput } 
        onFormChangeEmail={handleFormChangeEmail} onFormChangePassword={handleFormChangePassword} 
        onFormSubmit={handleFormSubmit} userData={data}/>
    </div>
    )
}