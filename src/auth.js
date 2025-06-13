// Dummy authentication function
export function authenticate(email, password) {
  // Demo credentials
  const demoUsers = [
    { email: "admin@demo.com", password: "admin123", role: "Admin" },
    { email: "manager@demo.com", password: "manager123", role: "Manager" }
  ];
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const found = users.find(user => user.email === email && user.password === password);
  if (found) {
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userRole", found.role || "Manager");
    return true;
  }
  const demo = demoUsers.find(u => u.email === email && u.password === password);
  if (demo) {
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userRole", demo.role);
    return true;
  }
  return false;
}

// Check if user is authenticated
export function isAuthenticated() {
  return localStorage.getItem("isAuthenticated") === "true";
}

// Log out
export function logout() {
  localStorage.removeItem("isAuthenticated");
}

export function getUserRole() {
  return localStorage.getItem("userRole") || "Manager";
}