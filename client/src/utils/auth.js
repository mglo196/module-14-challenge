import { jwtDecode } from 'jwt-decode';
class AuthService {
    getProfile() {
        // Return the decoded token as a UserData type
        return jwtDecode(this.getToken());
    }
    loggedIn() {
        // Check if the user is logged in by verifying token presence and expiration
        const token = this.getToken();
        return token && !this.isTokenExpired(token);
    }
    isTokenExpired(token) {
        try {
            const decoded = jwtDecode(token);
            if (decoded?.exp && decoded?.exp < Date.now() / 1000) {
                return true; // Token has expired
            }
        }
        catch (err) {
            console.error('Error decoding token:', err);
        }
        return false; // Token is not expired or invalid
    }
    getToken() {
        // Retrieve the token from localStorage
        return localStorage.getItem('id_token') || ''; // Return empty string if no token exists
    }
    login(idToken) {
        // Store the token and redirect the user to the home page
        if (idToken) {
            localStorage.setItem('id_token', idToken);
            window.location.assign('/');
        }
        else {
            console.error('Invalid token');
        }
    }
    logout() {
        // Remove the token and redirect the user to the login page
        localStorage.removeItem('id_token');
        window.location.assign('/login');
    }
}
export default new AuthService();
