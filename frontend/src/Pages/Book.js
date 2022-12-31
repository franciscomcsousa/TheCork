import React, { useState } from 'react';
import BookForm from '../Components/BookForm';

export const Book = () => {

    const [addEmailInput, setEmailInput] = useState('')
    const [addPasswordInput, setPasswordInput] = useState('')
    const [addRestaurantInput, setRestaurantInput] = useState('')

    const handleFormChangeEmail = (emailInput) => {
        setEmailInput(emailInput)
    }

    const handleFormChangePassword = (passwordInput) => {
        setPasswordInput(passwordInput)
    }

    const handleFormChangeRestaurant = (restaurantInput) => {
        setRestaurantInput(restaurantInput)
    }

    const handleFormSubmit = () => {
        fetch('/book', {
            method: 'POST',
            body: JSON.stringify({email: addEmailInput, password: addPasswordInput, restaurant: addRestaurantInput}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

return (
    <div>
       <BookForm emailInput={ addEmailInput } passwordInput={ addPasswordInput } restaurantInput={ addRestaurantInput}
        onFormChangeEmail={handleFormChangeEmail} onFormChangePassword={handleFormChangePassword} onFormChangeRestaurant={handleFormChangeRestaurant}
        onFormSubmit={handleFormSubmit}/>
    </div>
    )
}