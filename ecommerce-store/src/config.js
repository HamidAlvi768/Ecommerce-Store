// Base URL of the backend API.
// Override it without editing code by creating a .env file with:
//   REACT_APP_API_URL=http://localhost:5000/api
export const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// The backend's address without "/api" (images are served from here).
export const API_ORIGIN = API_URL.replace(/\/api\/?$/, "");

// Product images are stored as "/uploads/x.png"; turn them into full URLs.
export const assetUrl = (src) =>
  !src ? "" : /^(https?:|data:|blob:)/.test(src) ? src : `${API_ORIGIN}${src.startsWith("/") ? "" : "/"}${src}`;

// Header with the saved login token, for requests that need a logged-in user.
export const authHeader = () => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    return token ? { authorization: `bearer ${token}` } : {};
  } catch {
    return {};
  }
};
