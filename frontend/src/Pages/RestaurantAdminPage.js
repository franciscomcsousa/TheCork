






import React, { useState, useEffect } from 'react';
import RestaurantProfile from '../Components/RestaurantProfile';

export const RestaurantAdminPage = () => {
    
    // const [addEmailInput, setEmailInput] = useState('')
    // const [addPasswordInput, setPasswordInput] = useState('') 
    const [data, setData] = useState([])


    // const handleFormChangeEmail = (emailInput) => {
    //     setEmailInput(emailInput)
    // }

    // const handleFormChangePassword = (passwordInput) => {
    //     setPasswordInput(passwordInput)
    // }

    // const handleFormSubmit = () => {
    //     fetch('/profile', {
    //         method: 'POST',
    //         body: JSON.stringify({email: addEmailInput, password: addPasswordInput}),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //     .then(response => {
    //         if (!response.ok) {
    //             throw new Error(`This is an HTTP error: The status is ${response.status}`)
    //         }   
    //     return response.json();
    //      })
    //     .then(data => {
    //             setData(data)
    //     })
    //     .catch(error => {
    //         console.log(error)
    //     })
    // };


    useEffect(() => {
        fetch('/restaurant', {
            method: 'POST',
            body: JSON.stringify({"smth": "smth"}),
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
                setData(data)
                console.log(data)
        })
        .catch(error => {
            console.log(error)
        })
    }, [])


return (
    <div>
        <RestaurantProfile userData={data}/>

        {/* <div className='item-container'>

              <div className='user'>
                <h3> {data.name} </h3>
                <h3> {data.email} </h3>
                <h3> {data.wallet} </h3>
              </div>
        </div> */}


    </div>
    )
}