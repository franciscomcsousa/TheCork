import React, { useState } from 'react';
import BookForm from '../Components/BookForm';
import { useNavigate } from 'react-router-dom';

export const Book = () => {

    const [addEmailInput, setEmailInput] = useState('')
    const [addPeopleCountInput, setPeopleCountInput] = useState('')
    const [addRestaurantInput, setRestaurantInput] = useState('')

    const navigate = useNavigate();

    // Loads the page with the user's email address in the URL
    const urlName = addRestaurantInput.replace(/\s+/g, '-').toLowerCase();

    const handleFormChangeEmail = (emailInput) => {
        setEmailInput(emailInput)
    }

    const handleFormChangePeopleCount = (peopleCountInput) => {
        setPeopleCountInput(peopleCountInput)
    }

    const handleFormChangeRestaurant = (restaurantInput) => {
        setRestaurantInput(restaurantInput)
    }
    
    console.log("user_email:" ,{addEmailInput}, "people_count:" ,{addPeopleCountInput}, "restaurant_name:" ,{addRestaurantInput})

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
       <BookForm emailInput={ addEmailInput } peopleCountInput={ addPeopleCountInput } restaurantInput={ addRestaurantInput}
        onFormChangeEmail={handleFormChangeEmail} onFormChangePeopleCount={handleFormChangePeopleCount} onFormChangeRestaurant={handleFormChangeRestaurant}
        onFormSubmit={handleFormSubmit}/>
    </div>
    )
}