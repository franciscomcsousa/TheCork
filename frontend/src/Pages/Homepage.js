import React, { useEffect } from 'react';
import Home from '../Components/Home';

export const Homepage = () => {
    
     useEffect(() => {
        fetch('/')
        .then(console.log("fetching"))
    }, [])

return (
    <div>
        {/* <RegisterForm userInput={userInput} onFormChange={handleFormChange} onFormSubmit={handleFormSubmit}/> */}
        <Home/>
    </div>
    )
}