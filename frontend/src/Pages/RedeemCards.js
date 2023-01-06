import React, { useState } from 'react';
import RedeemCardsForm from '../Components/RedeemCardsForm';
import * as Error from '../Error';
import { useNavigate } from 'react-router-dom';

export const RedeemCards = () => {

    const [addCardInput, setCardInput] = useState('')
    const [addEmailInput, setEmailInput] = useState('')

    const navigate = useNavigate();

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
        <RedeemCardsForm cardInput={ addCardInput } emailInput={ addEmailInput }
        onFormChangeCard={handleFormChangeCard} onFormChangeEmail={handleFormChangeEmail}
        onFormSubmit={handleFormSubmit}/>
    </div>
    )
}