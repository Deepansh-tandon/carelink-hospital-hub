
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "@/components/ui/sonner";

type UserRole = 'admin' | 'staff' | 'patient' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  role: UserRole;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const defaultUser = {
  admin: {
    id: 'admin-1',
    name: 'Admin User',
    email: 'admin@carelink.com',
    role: 'admin' as UserRole,
    avatar: '',
  },
  staff: {
    id: 'staff-1',
    name: 'Dr. Sarah Wilson',
    email: 'staff@carelink.com',
    role: 'staff' as UserRole,
    avatar: '',
  },
  patient: {
    id: 'patient-1',
    name: 'John Doe',
    email: 'patient@carelink.com',
    role: 'patient' as UserRole,
    avatar: '',
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check for existing session on load
  useEffect(() => {
    const storedUser = localStorage.getItem('carelink_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole): Promise<void> => {
    setIsLoading(true);
    
    // Simulate API request
    return new Promise((resolve) => {
      setTimeout(() => {
        // For demo purposes, simple validation
        if (email && password && role) {
          // Use the default user based on role
          const loggedInUser = defaultUser[role as keyof typeof defaultUser];
          setUser(loggedInUser);
          localStorage.setItem('carelink_user', JSON.stringify(loggedInUser));
          toast.success(`Welcome back, ${loggedInUser.name}`);
        } else {
          toast.error("Invalid login credentials");
        }
        setIsLoading(false);
        resolve();
      }, 800); // Simulate network delay
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('carelink_user');
    toast.info("You have been logged out");
  };

  const isAuthenticated = !!user;
  const role = user?.role || null;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, role, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
