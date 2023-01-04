import React, { useState } from 'react';
import Gift from '../Components/Gift';
import { useNavigate } from 'react-router-dom';

export const GiftCards = () => {

    const [addEmailInput, setEmailInput] = useState('')
    const [addPasswordInput, setPasswordInput] = useState('')
    const [addTierInput, setTierInput] = useState('')

    const navigate = useNavigate();

    // Loads the page with the user's email address in the URL
    const urlName = addEmailInput.substring(0, addEmailInput.indexOf('@'))

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
                throw new Error(`This is an HTTP error: The status is ${response.status}`)
            }
        return response.json();
        })
        .then(data => {
                //setData(data)
                navigate(`/gift_cards/${urlName}`,{ state:{data} })
        })
        .catch(error => {
            console.log(error)
        })
    }

return (
    <div>
        <Gift emailInput={ addEmailInput } passwordInput={ addPasswordInput } tierInput={ addTierInput}
        onFormChangeEmail={handleFormChangeEmail} onFormChangePassword={handleFormChangePassword} onFormChangeCard={handleFormChangeTier}
        onFormSubmit={handleFormSubmit}/>
    </div>
    )
}