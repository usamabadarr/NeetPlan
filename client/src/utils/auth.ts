import { JwtPayload, jwtDecode } from 'jwt-decode';
import { UserData } from '../interfaces/UserData';

class AuthService {
    getProfile() {
        return jwtDecode<UserData>(this.getToken());
    }

    loggedIn() {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }

    isTokenExpired(token: string) {
        try {
            const decoded = jwtDecode<JwtPayload>(token);
            console.log(decoded);

            if (decoded?.exp && decoded?.exp < Date.now()/1000) {
                return true;
            } 
        } catch (error) {
            // if an error occurs in decoding the token due to improper format, we should treat the token as invalid so that the user is not logged in.
            return true;
        }
    }

    getToken(): string {
        const loggedUser = localStorage.getItem('id_token') || '';
        return loggedUser;
    }

    login(idToken: string) {
        localStorage.setItem('id_token', idToken);
        window.location.assign('/');
    }

    logout() {
        localStorage.removeItem('id_token');
        window.location.assign('/');
    }
}

export default new AuthService();