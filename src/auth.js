// Dummy authentication function
export function authenticate(username, password) {
  // Replace this with real authentication logic or API call
  const validUser = "admin";
  const validPass = "password123";

  if (username === validUser && password === validPass) {
    // You can store a token or user info here
    localStorage.setItem("isAuthenticated", "true");
    return true;
  } else {
    return false;
  }
}

// Check if user is authenticated
export function isAuthenticated() {
  return localStorage.getItem("isAuthenticated") === "true";
}

// Log out
export function logout() {
  localStorage.removeItem("isAuthenticated");
}