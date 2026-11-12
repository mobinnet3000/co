import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

interface User {
  id: number;
  username: string;
  email: string;
  full_name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('madanco_auth_token'));
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('madanco_auth_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const handleAuthChange = () => {
      const currentToken = localStorage.getItem('madanco_auth_token');
      const currentUser = localStorage.getItem('madanco_auth_user');
      setToken(currentToken);
      setUser(currentUser ? JSON.parse(currentUser) : null);
    };

    window.addEventListener('auth_state_changed', handleAuthChange);

    // Verify token on mount if exists
    if (token) {
      api.auth.getMe()
        .then((res) => {
          if (res.success && res.user) {
            setUser(res.user);
            localStorage.setItem('madanco_auth_user', JSON.stringify(res.user));
          }
        })
        .catch(() => {
          logout();
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }

    return () => {
      window.removeEventListener('auth_state_changed', handleAuthChange);
    };
  }, [token]);

  const login = async (username: string, password: string) => {
    const res = await api.auth.login({ username, password });
    if (res.success && res.token) {
      localStorage.setItem('madanco_auth_token', res.token);
      localStorage.setItem('madanco_auth_user', JSON.stringify(res.user));
      setToken(res.token);
      setUser(res.user);
    }
  };

  const logout = () => {
    localStorage.removeItem('madanco_auth_token');
    localStorage.removeItem('madanco_auth_user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
