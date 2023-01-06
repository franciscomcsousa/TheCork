import React, { useState } from 'react';
import RedeemCardsForm from '../Components/RedeemCardsForm';

export const RedeemCards = () => {

    const [addCardInput, setCardInput] = useState('')
    const [addEmailInput, setEmailInput] = useState('')

    const [data, setData] = useState('')

    const handleFormChangeCard = (cardInput) => {
        setCardInput(cardInput)
    }

    const handleFormChangeEmail = (emailInput) => {
        setEmailInput(emailInput)
    }

    const handleFormSubmit = () => {
        fetch('/redeem_cards', {
            method: 'POST',
            body: JSON.stringify({card: addCardInput, redeemer_email: addEmailInput}),
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
        <RedeemCardsForm cardInput={ addCardInput } emailInput={ addEmailInput }
        onFormChangeCard={handleFormChangeCard} onFormChangeEmail={handleFormChangeEmail}
        onFormSubmit={handleFormSubmit} userData={data}/>
    </div>
    )
}