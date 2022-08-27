import Cookies from "universal-cookie";

const cookies = new Cookies()

export function setCookie(name, value) {
    // cookies.remove(name)
    cookies.set(name, value)
}

export function getCookie(name) {
    return cookies.get(name)
}

export function removeCookie(name) {
    cookies.remove(name)
}