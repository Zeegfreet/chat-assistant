

export const getSecret = () => {
    const localKey = localStorage.getItem('@secret') || setSecret();
    return localKey;
}

const setSecret = () => {
    const secret = crypto.randomUUID();
    localStorage.setItem('@secret', secret);
    return secret;
}

export const encrypt = (data: string) => {
    const secret = getSecret();
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const secretBuffer = encoder.encode(secret);
    
    const encryptedData = dataBuffer.map((byte, index) => byte ^ secretBuffer[index % secretBuffer.length]);
    return btoa(String.fromCharCode(...encryptedData));
    
}

export const decrypt = (encryptedData: string) => {
    const secret = getSecret();
    const decoder = new TextDecoder();
    const encryptedBuffer = Uint8Array.from(atob(encryptedData), c => c.charCodeAt(0));
    const secretBuffer = new TextEncoder().encode(secret);
    
    const decryptedData = encryptedBuffer.map((byte, index) => byte ^ secretBuffer[index % secretBuffer.length]);
    return decoder.decode(decryptedData);
}