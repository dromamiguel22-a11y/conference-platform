// Real account system — talks to serverless functions backed by a
// Postgres database (see /api/auth/register.js and /api/auth/login.js).
// Both functions are async since they make a network request.

export async function registerUser({ name, email, password }) {
  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    return await response.json();
  } catch (err) {
    console.error('Registration request failed:', err);
    return { success: false, error: 'Could not reach the server. Please try again.' };
  }
}

export async function loginUser({ email, password }) {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return await response.json();
  } catch (err) {
    console.error('Login request failed:', err);
    return { success: false, error: 'Could not reach the server. Please try again.' };
  }
}