import React, { useState } from 'react';
import RedeemForm from '../Components/RedeemForm';
import { useNavigate } from 'react-router-dom';

export const RedeemCards = () => {

    const [addCardInput, setCardInput] = useState('')
    const [addEmailInput, setEmailInput] = useState('')

    const navigate = useNavigate();

    // Loads the page with the user's email address in the URL
    const urlName = addEmailInput.substring(0, addEmailInput.indexOf('@'))

    const handleFormChangeCard = (cardInput) => {
        setCardInput(cardInput)
    }

    const handleFormChangeEmail = (emailInput) => {
        setEmailInput(emailInput)
    }

    const handleFormSubmit = () => {
        fetch('/redeem_cards', {
            method: 'POST',
            body: JSON.stringify({card: addCardInput, email: addEmailInput}),
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
            navigate(`/redeem_cards/${urlName}`,{ state:{data} })
        })
        .catch(error => {
            console.log(error)
        })
    }


return (
    <div>
        <RedeemForm cardInput={ addCardInput } emailInput={ addEmailInput }
        onFormChangeCard={handleFormChangeCard} onFormChangeEmail={handleFormChangeEmail}
        onFormSubmit={handleFormSubmit}/>
    </div>
    )
}