import Restaurant from '../Components/Restaurant';
import { useNavigate } from 'react-router-dom';


export const RestaurantPage = () => {

    const navigate = useNavigate();

    // urlName is the current url
    const urlName = window.location.pathname.substring(12)

    // sends a POST request to the backend to change the availability of the restaurant
    const handleFormChangeAvailability = () => {
        fetch(`/restaurant/${urlName}`, {
            method: 'POST',
            body: JSON.stringify({availability: "changed"}),
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
                navigate(`/restaurant/${urlName}`,{ state:{data} })
        })
        .catch(error => {
            console.log(error)
        })
    }


return (
    <div>
        <Restaurant onFormChangeAvailability={handleFormChangeAvailability}/>
    </div>
    )
}