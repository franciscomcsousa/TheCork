import React, { useState, useEffect } from 'react';
import Profile from '../Components/Profile';

export const Profilepage = () => {
    
    const [addEmailInput, setEmailInput] = useState('')
    const [addPasswordInput, setPasswordInput] = useState('') 
    const [data, setData] = useState([])


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
        // .then(response => {
        //     if (!response.ok) {
        //         throw new Error(`This is an HTTP error: The status is ${response.status}`)
        //     }   
        // return response.json();
        
        // })
        .then(data => {
                console.log(data)
                setData(data)
        })
    };

return (
    <div>
        <Profile emailInput={ addEmailInput } passwordInput={ addPasswordInput } 
        onFormChangeEmail={handleFormChangeEmail} onFormChangePassword={handleFormChangePassword} 
        onFormSubmit={handleFormSubmit}/>

        {/* <p> {data} </p> */}
        {/* {data.map(data => <div>{data.name}, {data.email}, {data.wallet}</div>)} */}
    </div>
    )
}