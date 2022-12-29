import React, { useEffect } from 'react';
import Gift from '../Components/Gift';

export const GiftCards = () => {
    
     useEffect(() => {
        fetch('/gift_cards')
        .then(console.log("fetching"))
    }, [])

return (
    <div>
        {/* <RegisterForm userInput={userInput} onFormChange={handleFormChange} onFormSubmit={handleFormSubmit}/> */}
        <Gift/>
    </div>
    )
}