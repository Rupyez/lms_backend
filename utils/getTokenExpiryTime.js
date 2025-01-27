import jwt from "jsonwebtoken"

const getTokenExpiryTime = (token) => {
    try {
        const decodedToken = jwt.decode(token);
        if (!decodedToken || !decodedToken.exp) {
            return new Date(Date.now() + 24 * 60 * 60 * 1000); // Default to 24 hours from now if no expiry
        }
        return new Date(decodedToken.exp * 1000);
    } catch (error) {
        console.error("Error decoding token or retrieving expiry time:", error);
        return new Date(Date.now() + 24 * 60 * 60 * 1000); // Default to 24 hours from now
    }
}

export default getTokenExpiryTime;
