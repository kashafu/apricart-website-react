import Cookies from "universal-cookie";

const cookies = new Cookies()

export function setCookie(name, value) {
    cookies.set(name, value, { path: '/' })
}

export function getCookie(name) {
    return cookies.get(name)
}

export function removeCookie(name) {
    cookies.remove(name, { path: '/' })
}

export function clearCookies() {
    cookies.remove("cookies-token")
    cookies.remove('guestUserId')
    cookies.remove('user-initialized')
    cookies.remove('cookies-name')
    cookies.remove('cookies-phoneNumber')
    cookies.remove('cookies-email')
}