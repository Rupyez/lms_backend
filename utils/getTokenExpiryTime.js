import jwt from "jsonwebtoken"
let getTokenExpiryTime = (token) => {
    try {
        const decodedToken = jwt.decode(token)
        if (!decodedToken || !decodedToken.exp) {
            console.error("Invalid token or missing expiry time")
            
        }

        return new Date(decodedToken.exp * 1000); 
        // const expiryTime = new Date(decodedToken.exp * 1000); // Convert UNIX timestamp to JavaScript Date object
        // return expiryTime;
    } catch (error) {
        console.error("Error decoding token or retrieving expiry time:", error);
       return null;
    }
}

export default getTokenExpiryTime;
