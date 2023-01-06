import React, { useState } from 'react';
import Gift from '../Components/Gift';

export const GiftCards = () => {

    const [addEmailInput, setEmailInput] = useState('')
    const [addPasswordInput, setPasswordInput] = useState('')
    const [addTierInput, setTierInput] = useState('')

    const [data, setData] = useState('')

    const handleFormChangeEmail = (emailInput) => {
        setEmailInput(emailInput)
    }

    const handleFormChangePassword = (passwordInput) => {
        setPasswordInput(passwordInput)
    }

    const handleFormChangeTier = (tierInput) => {
        setTierInput(tierInput)
    }

    const handleFormSubmit = () => {
        fetch('/gift_cards', {
            method: 'POST',
            body: JSON.stringify({email: addEmailInput, password: addPasswordInput, amount: addTierInput}),
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
        //    console.log(error)
        //})
    }

return (
    <div>
        <Gift emailInput={ addEmailInput } passwordInput={ addPasswordInput } tierInput={ addTierInput}
        onFormChangeEmail={handleFormChangeEmail} onFormChangePassword={handleFormChangePassword} onFormChangeCard={handleFormChangeTier}
        onFormSubmit={handleFormSubmit} userData={data}/>
    </div>
    )
}