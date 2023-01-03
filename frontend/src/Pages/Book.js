import React, { useState } from 'react';
import BookForm from '../Components/BookForm';
import { useNavigate } from 'react-router-dom';

export const Book = () => {

    const [addEmailInput, setEmailInput] = useState('')
    const [addPasswordInput, setPasswordInput] = useState('')
    const [addRestaurantInput, setRestaurantInput] = useState('')

    const navigate = useNavigate();

    // Loads the page with the name of the user TODO: make it so that the email has to be an email
    // TODO: change the url to the email before the @, it needs to be checked when registering
    const urlName = addEmailInput//.substring(0, addEmailInput.indexOf('@'))

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
        .then(response => {
            if (!response.ok) {
                throw new Error(`This is an HTTP error: The status is ${response.status}`)
            }
        return response.json();
        })
        .then(data => {
                //setData(data)
                navigate(`/book/${urlName}`,{ state:{data} })
        })
        .catch(error => {
            console.log(error)
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