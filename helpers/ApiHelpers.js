import Cookies from 'universal-cookie';
let isNode = require('detect-node')
import { getCookie } from './Cookies';
import { getItemLocalStorage } from './Storage';

const cookies = new Cookies();

export const getGeneralCookies = () => {
    let name = getCookie('cookies-name')
    let phoneNumber = getCookie('cookies-phoneNumber')
    let email = getCookie('cookies-email')
    let token = getCookie('cookies-token')

    return ({
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
    let clientType = 'apricart'
    let prodType = ''
    let orderType = ''

    let selectedType = getCookie('selected-type')
    if (selectedType === 'bulk') {
        selectedType = 'bulk'
        prodType = 'b2b'
        orderType = 'delivery'
    }
    else if (selectedType === 'cnc') {
        selectedType = 'cnc'
        prodType = 'cus'
        orderType = 'pickup'
    }
    else {
        selectedType = 'home'
        prodType = 'cus'
        orderType = 'delivery'
    }

    let token = getCookie('cookies-token')
    let city = getCookie("cities") == null ? "karachi" : getCookie("cities")
    let selectedAddress = getCookie('selected-address')
    let selectedPickupLocation = typeof (getItemLocalStorage('selected-pickup-location')) === 'string' ? JSON.parse(getItemLocalStorage('selected-pickup-location')) : getItemLocalStorage('selected-pickup-location')
    let latitude = 0
    let longitude = 0
    let userId = getCookie('guestUserId')
    let headers = {
        'Accept': 'application/json',
        "Content-Type": "application/json",
    }

    let isUserInitialized = getCookie('user-initialized') ? true : false

    // if user is logged in
    if (token) {
        // if user has a selected address, use that addresses's latitude longitude
        if (selectedAddress) {
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
        selectedType,
        isUserInitialized,
        selectedPickupLocation
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