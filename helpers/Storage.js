export function setItemLocalStorage(name, value) {
    localStorage.setItem(name, value)
}

export function getItemLocalStorage(name) {
    if (typeof window !== 'undefined') {
        return localStorage.getItem(name)
    }
}

export function removeItemLocalStorage(name) {
    localStorage.removeItem(name)
}