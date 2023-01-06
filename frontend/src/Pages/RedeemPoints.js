import React, { useState } from 'react';
import RedeemPointsForm from '../Components/RedeemPointsForm';
import * as Error from '../Error';
import { useNavigate } from 'react-router-dom';

export const RedeemPoints = () => {

    const [addPointsInput, setPointsInput] = useState('')
    const [addEmailInput, setEmailInput] = useState('')

    const navigate = useNavigate();

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
        <RedeemPointsForm pointsInput={ addPointsInput } emailInput={ addEmailInput }
        onFormChangePoints={handleFormChangePoints} onFormChangeEmail={handleFormChangeEmail}
        onFormSubmit={handleFormSubmit} />
    </div>
    )
}