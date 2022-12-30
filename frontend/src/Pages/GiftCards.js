import React, { useState, useEffect } from 'react';
import Gift from '../Components/Gift';

export const GiftCards = () => {

    const [addEmailInput, setEmailInput] = useState('')
    const [addPasswordInput, setPasswordInput] = useState('')
    const [addTierInput, setTierInput] = useState('')

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
    }

return (
    <div>
        <Gift emailInput={ addEmailInput } passwordInput={ addPasswordInput } tierInput={ addTierInput}
        onFormChangeEmail={handleFormChangeEmail} onFormChangePassword={handleFormChangePassword} onFormChangeCard={handleFormChangeTier}
        onFormSubmit={handleFormSubmit}/>
    </div>
    )
}