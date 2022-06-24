import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const getGeneralApiParams = () => {
    let token = cookies.get('cookies-token')
    // city cookies is being set in TopBar.js
    let city = cookies.get('cities')
    let latitude = 0 
    let longitude = 0
    let userId
    let headers = {}

    // if user is logged in
    if(token){
        userId = cookies.get('cookies-userId')
        // if user has a selected address, use that addresses's latitude longitude
        // TODO
        // if no address is selected or no address has been added, use default lat long 0
        headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookies.get("cookies-token")
        }
    }
    // if its a guest
    else{
        userId = cookies.get('guestUserId')
        // if location enabled, use browser latitude and longitude, if not enabled, send 0 by default
        navigator.geolocation.getCurrentPosition((position)=> {
            latitude= position.coords.latitude
            longitude= position.coords.longitude
        })
        headers = {
            "Content-Type": "application/json",
        }
    }

    return({
        'city': city,
        'latitude': latitude,
        'longitude': longitude,
        'userId': userId,
        'headers': headers
    })
}