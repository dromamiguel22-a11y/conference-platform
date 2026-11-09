import crypto from 'crypto';
import { sql } from '../lib/db.js';

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, error: 'Missing email or password.' });
  }

  try {
    const result = await sql`SELECT id, name, email, password_hash FROM users WHERE email = ${email.toLowerCase()}`;

    if (result.length === 0) {
      return res.status(200).json({ success: false, error: 'No account found with this email.' });
    }

    const user = result[0];
    const passwordHash = hashPassword(password);

    if (user.password_hash !== passwordHash) {
      return res.status(200).json({ success: false, error: 'Incorrect password.' });
    }

    res.status(200).json({ success: true, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, error: 'Something went wrong signing you in.' });
  }
}