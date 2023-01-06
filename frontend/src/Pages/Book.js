import React, { useState } from 'react';
import BookForm from '../Components/BookForm';
import { useNavigate } from 'react-router-dom';
import * as Error from '../Error';

export const Book = () => {

    const [addEmailInput, setEmailInput] = useState('')
    const [addPeopleCountInput, setPeopleCountInput] = useState('')
    const [addRestaurantInput, setRestaurantInput] = useState('')

    const navigate = useNavigate();

    const handleFormChangeEmail = (emailInput) => {
        setEmailInput(emailInput)
    }

    const handleFormChangePeopleCount = (peopleCountInput) => {
        setPeopleCountInput(peopleCountInput)
    }

    const handleFormChangeRestaurant = (restaurantInput) => {
        setRestaurantInput(restaurantInput)
    }
    
    const handleFormSubmit = () => {
        fetch('/book', {
            method: 'POST',
            body: JSON.stringify({user_email: addEmailInput, people_count: addPeopleCountInput, restaurant_name: addRestaurantInput}),
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
       <BookForm emailInput={ addEmailInput } peopleCountInput={ addPeopleCountInput } restaurantInput={ addRestaurantInput}
        onFormChangeEmail={handleFormChangeEmail} onFormChangePeopleCount={handleFormChangePeopleCount} onFormChangeRestaurant={handleFormChangeRestaurant}
        onFormSubmit={handleFormSubmit}/>
    </div>
    )
}