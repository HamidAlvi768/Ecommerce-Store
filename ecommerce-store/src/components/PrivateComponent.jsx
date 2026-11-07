import { API_URL, authHeader } from "../config";
import React, { useEffect, useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const clearLogin = () => {
  ["token", "user", "userEmail"].forEach((k) => localStorage.removeItem(k));
};

// Store pages need a logged-in customer. Checks the saved token with the backend.
export const PrivateComponent = () => {
  const [error, setError] = useState(null);
  const auth = localStorage.getItem('token');

  useEffect(() => {
    if (!auth) return;
    fetch(`${API_URL}/me`, { headers: authHeader() })
      .then((response) => {
        if (response.status === 401) {
          clearLogin();
          setError('Your session expired. Please log in again.');
        }
      })
      .catch(() => setError('Cannot reach the server. Is the backend running?'));
  }, [auth]);

  if (error) {
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <p>{error}</p>
        <a href="/login">Go to login</a>
      </div>
    );
  }

  return auth ? <Outlet /> : <Navigate to='/signup' />
}
