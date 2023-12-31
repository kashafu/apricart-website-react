import { getItemSessionStorage, getItemLocalStorage, removeItemLocalStorage } from './Storage';
let isNode = require('detect-node')
import { getCookie, removeCookie } from './Cookies';

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
    let redirectSource = getItemSessionStorage('redirect-source')
    let redirectInformation = getItemSessionStorage('redirect-information') ? JSON.parse(getItemSessionStorage('redirect-information')) : {}

    let clientType = redirectSource === 'js_bank' ? 'jsstore' : 'apricart'
    let isShowSelectionScreen = true
    if (getItemSessionStorage('is_show_selection_screen')) {
        isShowSelectionScreen = getItemSessionStorage('is_show_selection_screen') === 'true' ? true : false
    }

    let prodType = ''
    let orderType = ''

    let selectedType = getItemLocalStorage('selected-type')
    // if (selectedType === 'bulk') {
    //     selectedType = 'bulk'
    //     prodType = 'b2b'
    //     orderType = 'delivery'
    // }
    // else if (selectedType === 'cnc') {
    //     selectedType = 'cnc'
    //     prodType = 'cus'
    //     orderType = 'pickup'
    // }
    // else {
    //     selectedType = 'home'
    //     prodType = 'cus'
    //     orderType = 'delivery'
    // }
    if (selectedType === 'cnc') {
        selectedType = 'cnc'
        prodType = 'cus'
        orderType = 'pickup'
    }
    else {
        selectedType = 'bulk'
        prodType = 'b2b'
        orderType = 'delivery'
    }

    let token = getCookie('cookies-token')
    let city = getItemLocalStorage("cities") == null ? "karachi" : getItemLocalStorage("cities")
    let selectedAddress = ''
    if (getItemLocalStorage('selected-address')) {
        if (typeof (getItemLocalStorage('selected-address')) === 'string') {
            selectedAddress = JSON.parse(getItemLocalStorage('selected-address'))
        }
        else {
            selectedAddress = getItemLocalStorage('selected-address')
        }
    }
    let selectedPickupLocation = ''
    if (getItemSessionStorage('selected-pickup-location')) {
        if (typeof (getItemSessionStorage('selected-pickup-location')) === 'string') {
            selectedPickupLocation = JSON.parse(getItemSessionStorage('selected-pickup-location'))
        }
        else {
            selectedPickupLocation = getItemSessionStorage('selected-pickup-location')
        }
    }
    let latitude = 0
    let longitude = 0
    let userId = getCookie('guestUserId')
    let headers = {
        'Accept': 'application/json',
        "Content-Type": "application/json",
    }

    let isUserInitialized = getCookie('user-initialized') ? true : false

    // If cnc is selected, lat long will be of selected pickup location
    if (selectedType === 'cnc') {
        if (selectedPickupLocation !== '') {
            latitude = selectedPickupLocation.mapLat
            longitude = selectedPickupLocation.mapLong
        }
        else {
            // if location enabled, use browser latitude and longitude, if not enabled, send 0 by default
            if (!isNode) {
                navigator.geolocation.getCurrentPosition((position) => {
                    latitude = position.coords.latitude
                    longitude = position.coords.longitude
                })
            }
        }
    }
    else {
        // if user is logged in
        if (token) {
            // if user has a selected address, use that addresses's latitude longitude
            if (selectedAddress) {
                latitude = selectedAddress.mapLat
                longitude = selectedAddress.mapLong
            }
            // if no address is selected or no address has been added, use default lat long 0
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
    }

    if (token) {
        headers = {
            ...headers,
            Authorization: "Bearer " + token
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
        selectedPickupLocation,
        redirectSource,
        redirectInformation,
        isShowSelectionScreen
    })
}

export const logOutRemoveCookies = () => {
    removeCookie("cookies-token")
    removeItemLocalStorage('selected-address')
    removeCookie('guestUserId')
    removeCookie('cookies-name')
    removeCookie('cookies-phoneNumber')
    removeCookie('cookies-email')
    removeCookie('user-initialized')
    localStorage.clear()
}