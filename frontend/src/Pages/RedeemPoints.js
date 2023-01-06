import React, { useState } from 'react';
import RedeemPointsForm from '../Components/RedeemPointsForm';

export const RedeemPoints = () => {

    const [addPointsInput, setPointsInput] = useState('')
    const [addEmailInput, setEmailInput] = useState('')

    const [data, setData] = useState('')

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
                //throw new Error(`This is an HTTP error: The status is ${response.status}`)
            }
            return response.json();
        })
        .then(data => {
            setData(data)
        })
        //.catch(error => {
        //   console.log(error)
        //})
    }


return (
    <div>
        <RedeemPointsForm pointsInput={ addPointsInput } emailInput={ addEmailInput }
        onFormChangePoints={handleFormChangePoints} onFormChangeEmail={handleFormChangeEmail}
        onFormSubmit={handleFormSubmit} userData={data}/>
    </div>
    )
}