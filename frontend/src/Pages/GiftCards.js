import React, { useState } from 'react';
import Gift from '../Components/Gift';
import * as Error from '../Error';
import { useNavigate } from 'react-router-dom';


export const GiftCards = () => {

    const [addEmailInput, setEmailInput] = useState('')
    const [addPasswordInput, setPasswordInput] = useState('')
    const [addTierInput, setTierInput] = useState('')

    const navigate = useNavigate();

    //const [data, setData] = useState('')

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
                //alert(Error.getErrorMessage(response.status))
            }
        return response.json();
        })
        .then(data => {
            alert(Error.getErrorMessage(data.status))
            if (data.status === 200) {
                navigate(0)
            }
        })
    }

return (
    <div>
        <Gift emailInput={ addEmailInput } passwordInput={ addPasswordInput } tierInput={ addTierInput}
        onFormChangeEmail={handleFormChangeEmail} onFormChangePassword={handleFormChangePassword} onFormChangeCard={handleFormChangeTier}
        onFormSubmit={handleFormSubmit} />
    </div>
    )
}