export function setItemLocalStorage(name, value) {
    localStorage.setItem(name, value)
}

export function getItemLocalStorage(name) {
    return localStorage.getItem(name)
}

export function removeItemLocalStorage(name) {
    localStorage.removeItem(name)
}