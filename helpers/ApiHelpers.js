import Cookies from 'universal-cookie';
let isNode = require('detect-node')

const cookies = new Cookies();

export const getGeneralCookies = () => {
    let name = cookies.get('cookies-name')
    let phoneNumber = cookies.get('cookies-phoneNumber')
    let email = cookies.get('cookies-email')
    let token = cookies.get('cookies-token')

    return({
        'name': name,
        'phoneNumber': phoneNumber,
        'email': email,
        'token': token
    })
}

export const getGeneralApiParams = () => {
    let token = cookies.get('cookies-token')
    // city cookies is being set in TopBar.js
    let city = cookies.get("cities") == null ? "karachi" : cookies.get("cities")
    let selectedAddress = cookies.get('selected-address')
    let latitude = 0
    let longitude = 0
    let userId
    let headers = {
        'Accept': 'application/json',
        "Content-Type": "application/json",
    }

    // if user is logged in
    if (token) {
        // userId = cookies.get('cookies-userId')
        userId = cookies.get('guestUserId')
        // if user has a selected address, use that addresses's latitude longitude
        if(selectedAddress){
            latitude = selectedAddress.mapLat
            longitude = selectedAddress.mapLong
        }
        // if no address is selected or no address has been added, use default lat long 0
        headers = {
            ...headers,
            Authorization: "Bearer " + token
        }
    }
    // if its a guest
    else {
        userId = cookies.get('guestUserId')
        // if location enabled, use browser latitude and longitude, if not enabled, send 0 by default
        if (!isNode) {
            navigator.geolocation.getCurrentPosition((position) => {
                latitude = position.coords.latitude
                longitude = position.coords.longitude
            })
        }
        // headers = {
        //     "Content-Type": "application/json",
        // }
    }

    return ({
        'city': city,
        'selectedAddress': selectedAddress,
        'latitude': latitude,
        'longitude': longitude,
        'userId': userId,
        'headers': headers,
        'token': token
    })
}

export const logOutRemoveCookies = () => {
    cookies.remove("cookies-token")
    cookies.remove('selected-address')
    cookies.remove('guestUserId')
    cookies.remove('cookies-name')
    cookies.remove('cookies-userId')
    cookies.remove('cookies-phoneNumber')
    cookies.remove('cookies-email')
    localStorage.clear()
}