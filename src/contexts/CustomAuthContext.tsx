
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { authService } from '../services/apiService';
import { useToast } from '@/components/ui/use-toast';

type UserProfile = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
};

type AuthContextType = {
  user: UserProfile | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any | null }>;
  signUp: (email: string, password: string, userData: { firstName: string; lastName: string }) => Promise<{ error: any | null }>;
  signOut: () => void;
  isAdmin: boolean;
};

const CustomAuthContext = createContext<AuthContextType | undefined>(undefined);

export const CustomAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const initAuth = () => {
      try {
        const currentUser = authService.getCurrentUser();
        if (currentUser) {
          setUser({
            id: currentUser.id,
            first_name: currentUser.firstName,
            last_name: currentUser.lastName,
            email: currentUser.email
          });
          setIsAdmin(currentUser.isAdmin || false);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const data = await authService.login(email, password);
      setUser({
        id: data.user.id,
        first_name: data.user.firstName,
        last_name: data.user.lastName,
        email: data.user.email
      });
      setIsAdmin(data.user.isAdmin || false);
      return { error: null };
    } catch (error: any) {
      console.error("Login error:", error);
      return { error };
    }
  };

  const signUp = async (
    email: string,
    password: string,
    userData: { firstName: string; lastName: string }
  ) => {
    try {
      await authService.register({
        email,
        password,
        firstName: userData.firstName,
        lastName: userData.lastName
      });
      
      toast({
        title: 'Account created',
        description: 'Your account has been created. Please log in.',
      });
      
      return { error: null };
    } catch (error: any) {
      console.error("Registration error:", error);
      return { error };
    }
  };

  const signOut = () => {
    authService.logout();
    setUser(null);
    setIsAdmin(false);
  };

  const value = {
    user,
    isLoading,
    signIn,
    signUp,
    signOut,
    isAdmin
  };

  return <CustomAuthContext.Provider value={value}>{children}</CustomAuthContext.Provider>;
};

export const useCustomAuth = () => {
  const context = useContext(CustomAuthContext);
  if (context === undefined) {
    throw new Error('useCustomAuth must be used within a CustomAuthProvider');
  }
  return context;
};
