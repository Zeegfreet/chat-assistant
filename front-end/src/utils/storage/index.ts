import { decrypt, encrypt } from "../crypotgraphy";

export const getItem = (key: string) => {
    const encryptedValue = localStorage.getItem(key);
    if (!encryptedValue) return null;
    try {
        return JSON.parse(decrypt(encryptedValue));
    } catch (error) {
        clear();
        return null;
    }
}

export const setItem = (key: string, value: string) => {
    const encryptedValue = encrypt(value);
    localStorage.setItem(key, encryptedValue);
}

export const removeItem = (key: string) => {
    localStorage.removeItem(key);
}

export const clear = () => {
    Object.keys(localStorage).forEach(key => {
        if(key.startsWith('@')) {
            localStorage.removeItem(key);
        }
    });
}