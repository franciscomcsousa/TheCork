import React, { useState } from 'react';
import RedeemForm from '../Components/RedeemForm';

export const RedeemCards = () => {

    const [addCardInput, setCardInput] = useState('')
    const [addEmailInput, setEmailInput] = useState('')

    const handleFormChangeCard = (cardInput) => {
        console.log(cardInput)
        setCardInput(cardInput)
    }

    const handleFormChangeEmail = (emailInput) => {
        console.log(emailInput)
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
    }


return (
    <div>
        <RedeemForm cardInput={ addCardInput } emailInput={ addEmailInput }
        onFormChangeCard={handleFormChangeCard} onFormChangeEmail={handleFormChangeEmail}
        onFormSubmit={handleFormSubmit}/>
    </div>
    )
}