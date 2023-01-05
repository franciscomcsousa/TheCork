import React, { useEffect } from 'react';
import Home from '../Components/Home';

export const Homepage = () => {
    
     useEffect(() => {
        fetch('/')
    }, [])

return (
    <div>
        <Home/>
    </div>
    )
}