import Cookies from 'universal-cookie';
let isNode = require('detect-node')

const cookies = new Cookies();

export const getGeneralCookies = () => {
    let name = cookies.get('cookies-name')
    let phoneNumber = cookies.get('cookies-phoneNumber')
    let email = cookies.get('cookies-email')
    let token = cookies.get('cookies-token')

    return({
        name,
        phoneNumber,
        email,
        token
    })
}

/*
    city cookies is being set in CitySelector.js
    prod_type is being set in Header.js
    selectedType can be either 'bulk' 'home'
*/
export const getGeneralApiParams = () => {
    let prodType = cookies.get('prod-type')
    if(prodType === 'b2b'){
        prodType = 'b2b'
        cookies.set('prod-type', 'b2b')
    }
    else{
        prodType = 'cus'
        cookies.set('prod-type', 'cus')
    }

    let orderType = cookies.get('order-type')
    if(orderType === 'pickup'){
        orderType = 'pickup'
        cookies.set('order-type', 'pickup')
    }
    else{
        orderType = 'delivery'
        cookies.set('order-type', 'delivery')
    }

    let clientType = cookies.get('client-type')
    clientType = 'apricart'
    cookies.set('client-type', 'apricart')

    let selectedType = cookies.get('selected-type')
    if(prodType === 'b2b'){
        selectedType = 'bulk'
    }
    else if(prodType === 'cus'){
        selectedType = 'home'
    }

    let token = cookies.get('cookies-token')
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
    }

    return ({
        city,
        selectedAddress,
        latitude,
        longitude,
        userId,
        headers,
        token,
        prodType,
        orderType,
        clientType,
        selectedType
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