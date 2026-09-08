

const USERS_KEY = 'linconference_users';

export function getUsers() {
  const saved = localStorage.getItem(USERS_KEY);
  return saved ? JSON.parse(saved) : [];
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function registerUser({ name, email, password }) {
  const users = getUsers();
  const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());

  if (exists) {
    return { success: false, error: 'An account with this email already exists.' };
  }

  const newUser = { name, email, password };
  saveUsers([...users, newUser]);
  return { success: true, user: { name, email } };
}

export function loginUser({ email, password }) {
  const users = getUsers();
  const match = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

  if (!match) {
    return { success: false, error: 'No account found with this email.' };
  }
  if (match.password !== password) {
    return { success: false, error: 'Incorrect password.' };
  }

  return { success: true, user: { name: match.name, email: match.email } };
}