import { JwtPayload, jwtDecode } from 'jwt-decode';
import type { UserData } from '../interfaces/UserData';

class AuthService {
  getProfile() {
    // Return the decoded token as a UserData type
    return jwtDecode<UserData>(this.getToken());
  }

  loggedIn() {
    // Check if the user is logged in by verifying token presence and expiration
    const token = this.getToken();
    return token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);

      if (decoded?.exp && decoded?.exp < Date.now() / 1000) {
        return true; // Token has expired
      }
    } catch (err) {
      console.error('Error decoding token:', err);
    }

    return false; // Token is not expired or invalid
  }

  getToken(): string {
    // Retrieve the token from localStorage
    return localStorage.getItem('id_token') || ''; // Return empty string if no token exists
  }

  login(idToken: string) {
    // Store the token and redirect the user to the home page
    if (idToken) {
      localStorage.setItem('id_token', idToken);
      window.location.assign('/');
    } else {
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
