import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        fetch('/api/auth/me', { headers: { Authorization: `Bearer ${parsedUser.token}` } })
          .then(async (response) => {
            if (!response.ok) throw new Error('Session expired');
            const body = await response.json();
            const refreshedUser = { ...body.data, token: parsedUser.token };
            setUser(refreshedUser);
            localStorage.setItem('user', JSON.stringify(refreshedUser));
          })
          .catch(() => {
            localStorage.removeItem('user');
            setUser(null);
          })
          .finally(() => setLoading(false));
        return;
      } catch {
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        setUser(data.data);
        localStorage.setItem('user', JSON.stringify(data.data));
        return { success: true, user: data.data };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: 'Server connection error' };
    }
  };

  const signup = async (email, password) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.status === 'success' || response.status === 201) {
        // Automatically log them in or return success
        setUser(data.data);
        localStorage.setItem('user', JSON.stringify(data.data));
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: 'Server connection error' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
