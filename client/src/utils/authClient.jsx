// >>------------------------>>
// Authentication Code Functions
// >>------------------------>>

// Used to decode a token and retrieve the  user"s information
import { jwtDecode } from "jwt-decode";

// create a new class to instantiate the user
class AuthService {
  // get user data
  getProfile() {
    const token = jwtDecode(this.getToken());
    console.log("Adding Token to Headers", token);
    return token;
  }
  // check if user"s logged in
  loggedIn() {
    const token = this.getToken();
    if (!token) {
      return false;
    }
  
    const isExpired = this.isTokenExpired(token);
    if (isExpired) {
      this.logout(); // clears the token and redirects to home
      return false;
    }
  
    return true;
  }

  // check if token is expired
  isTokenExpired(token) {
    try {
      const decoded = jwtDecode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // Retrieves the user token from localStorage
    const token = localStorage.getItem("id_token");
    console.log("Retrieved Token:", token);
    return token;
  }

  // refreshToken = async () => {
  //   try {
  //     const response = await fetch('/path/to/refresh', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ refreshToken: yourRefreshToken }),
  //     });
  
  //     const data = await response.json();
  //     if (data.token) {
  //       localStorage.setItem('id_token', data.token);
  //     } else {
  //       // Handle error, redirect to login, etc.
  //     }
  //   } catch (error) {
  //     console.error("Error refreshing token:", error);
  //     // Redirect to login or handle error
  //   }
  // }

  login(idToken) {
    // Saves user token to localStorage
    localStorage.setItem("id_token", idToken);
    window.location.assign("/");
  }

  signup(idToken) {
    // Saves user token to localStorage
    localStorage.setItem("id_token", idToken);
    window.location.replace("/profile");
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem("id_token");
    console.log("Logged Out")
    // this will reload the page and reassign the page to homePage
    window.location.assign("/");
  }
}

export default new AuthService();