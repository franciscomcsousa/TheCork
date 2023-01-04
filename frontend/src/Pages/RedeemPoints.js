import React, { useState } from 'react';
import RedeemPointsForm from '../Components/RedeemPointsForm';
import { useNavigate } from 'react-router-dom';

export const RedeemPoints = () => {

    const [addPointsInput, setPointsInput] = useState('')
    const [addEmailInput, setEmailInput] = useState('')

    const navigate = useNavigate();

    // Loads the page with the user's email address in the URL
    const urlName = addEmailInput.substring(0, addEmailInput.indexOf('@'))

    const handleFormChangePoints = (pointsInput) => {
        setPointsInput(pointsInput)
    }

    const handleFormChangeEmail = (emailInput) => {
        setEmailInput(emailInput)
    }

    const handleFormSubmit = () => {
        fetch('/redeem_points', {
            method: 'POST',
            body: JSON.stringify({points: addPointsInput, email: addEmailInput}),
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
            navigate(`/redeem_points/${urlName}`,{ state:{data} })
        })
        .catch(error => {
            console.log(error)
        })
    }


return (
    <div>
        <RedeemPointsForm pointsInput={ addPointsInput } emailInput={ addEmailInput }
        onFormChangePoints={handleFormChangePoints} onFormChangeEmail={handleFormChangeEmail}
        onFormSubmit={handleFormSubmit}/>
    </div>
    )
}