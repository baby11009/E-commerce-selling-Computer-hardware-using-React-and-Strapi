

export const createLcItem = (key, value) => {
    localStorage.setItem(key,JSON.stringify(value))
}

export const getLcItem = (key) => {
    const data = localStorage.getItem(key)
    return data === 'undefined' ? null : JSON.parse(data) 
}

export const updateLcItem = (key, newValue) => {
    localStorage.setItem(key,JSON.stringify(newValue))
}

export const deleteLcItem = (key) => {
    localStorage.removeItem(key)
}