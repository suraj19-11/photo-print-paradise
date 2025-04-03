
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase, UserProfile, testConnection, isDevelopmentMode, mockStorage } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import { toast as sonnerToast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

type AuthContextType = {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any | null }>;
  signUp: (email: string, password: string, userData: { firstName: string; lastName: string }) => Promise<{ error: any | null }>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
  connectionError: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const { toast } = useToast();

  // Helper function to create a mock user for development mode
  const createMockUser = (email: string, id: string): User => {
    return {
      id,
      app_metadata: {},
      user_metadata: {},
      aud: 'authenticated',
      created_at: new Date().toISOString(),
      email,
      role: 'authenticated',
      email_confirmed_at: new Date().toISOString()
    } as User;
  };

  // Helper function to create a mock session for development mode
  const createMockSession = (userId: string): Session => {
    const expiresAt = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
    mockStorage.sessions.set(userId, {
      expires_at: expiresAt,
      user_id: userId
    });
    return {
      access_token: `mock_token_${userId}`,
      refresh_token: `mock_refresh_${userId}`,
      expires_in: 3600,
      expires_at: expiresAt,
      user: mockStorage.users.get(userId) ? createMockUser(mockStorage.users.get(userId)!.email, userId) : null
    } as Session;
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Test connection to Supabase
        const canConnect = await testConnection();
        
        if (isDevelopmentMode) {
          // In development mode, we'll load from localStorage
          const storedUserId = localStorage.getItem('mockUserId');
          if (storedUserId) {
            const mockUser = createMockUser(mockStorage.users.get(storedUserId)?.email || '', storedUserId);
            const mockSession = createMockSession(storedUserId);
            
            setUser(mockUser);
            setSession(mockSession);
            
            // Check if we have a stored profile
            const storedProfile = localStorage.getItem('mockUserProfile');
            if (storedProfile) {
              const profileData = JSON.parse(storedProfile) as UserProfile;
              setProfile(profileData);
              setIsAdmin(localStorage.getItem('mockUserIsAdmin') === 'true');
            }
          }
          
          setIsLoading(false);
        } else if (!canConnect) {
          // For real Supabase connection that fails
          setConnectionError("Unable to connect to the authentication service. Please check your internet connection or try again later.");
          setIsLoading(false);
          
          sonnerToast.error("Connection Error", {
            description: "Could not connect to the authentication service. Check your connection or try again later.",
            duration: 5000,
          });
          return;
        } else {
          // For real Supabase connection that succeeds
          const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
          
          if (sessionError) {
            console.error('Error getting session:', sessionError);
            setConnectionError("Error accessing authentication service.");
            setIsLoading(false);
            return;
          }
          
          setSession(sessionData.session);
          setUser(sessionData.session?.user ?? null);
          
          if (sessionData.session?.user) {
            await fetchUserProfile(sessionData.session.user.id);
            await checkAdminStatus(sessionData.session.user.id);
          }
          
          // Listen for auth changes with real Supabase
          const {
            data: { subscription },
          } = supabase.auth.onAuthStateChange(async (event, session) => {
            console.log('Auth state changed:', event, session?.user?.email);
            setSession(session);
            setUser(session?.user ?? null);
            
            if (session?.user) {
              await fetchUserProfile(session.user.id);
              await checkAdminStatus(session.user.id);
            } else {
              setProfile(null);
              setIsAdmin(false);
            }
          });

          return () => subscription.unsubscribe();
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Fatal error initializing auth:', error);
        setConnectionError("Could not initialize the authentication service");
        setIsLoading(false);
        
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: "Could not initialize the authentication service. Please try again later.",
        });
      }
    };

    initializeAuth();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    if (isDevelopmentMode) {
      // In development mode, get profile from mock storage
      const storedProfile = localStorage.getItem('mockUserProfile');
      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
      }
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
      } else if (data) {
        setProfile(data as UserProfile);
      }
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
    }
  };

  const checkAdminStatus = async (userId: string) => {
    if (isDevelopmentMode) {
      // In development mode, get admin status from mock storage
      setIsAdmin(localStorage.getItem('mockUserIsAdmin') === 'true');
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from('admins')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking admin status:', error);
      }
      
      setIsAdmin(!!data);
    } catch (error) {
      console.error('Error in checkAdminStatus:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    if (isDevelopmentMode) {
      // Mock sign-in for development mode
      console.log('Development mode: mock sign-in');
      
      // Find user by email
      let foundUserId: string | null = null;
      for (const [id, userData] of mockStorage.users.entries()) {
        if (userData.email === email) {
          foundUserId = id;
          break;
        }
      }
      
      if (!foundUserId || mockStorage.users.get(foundUserId)?.password !== password) {
        return { error: new Error('Invalid login credentials') };
      }
      
      // Create mock user and session
      const mockUser = createMockUser(email, foundUserId);
      const mockSession = createMockSession(foundUserId);
      
      setUser(mockUser);
      setSession(mockSession);
      
      // Store in localStorage for persistence
      localStorage.setItem('mockUserId', foundUserId);
      
      // Check for profile
      const storedProfile = localStorage.getItem('mockUserProfile');
      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
      }
      
      // Check for admin
      const isAdmin = localStorage.getItem('mockUserIsAdmin') === 'true';
      setIsAdmin(isAdmin);
      
      return { error: null };
    }
    
    try {
      // Test connection before trying to sign in
      const canConnect = await testConnection();
      if (!canConnect) {
        return { error: new Error("Unable to connect to the authentication service. Please try again later.") };
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.includes('fetch')) {
          return { error: new Error("Connection issue. Please check your internet and try again.") };
        }
        return { error };
      }

      return { error: null };
    } catch (error) {
      console.error('Error signing in:', error);
      return { error };
    }
  };

  const signUp = async (
    email: string,
    password: string,
    userData: { firstName: string; lastName: string }
  ) => {
    if (isDevelopmentMode) {
      // Mock sign-up for development mode
      console.log('Development mode: mock sign-up');
      
      // Check if email already exists
      for (const userData of mockStorage.users.values()) {
        if (userData.email === email) {
          return { error: new Error('User already registered') };
        }
      }
      
      // Create new mock user
      const userId = uuidv4();
      mockStorage.users.set(userId, { email, password, id: userId });
      
      // Create profile
      const now = new Date().toISOString();
      const profile: UserProfile = {
        id: userId,
        first_name: userData.firstName,
        last_name: userData.lastName,
        email: email,
        created_at: now,
        updated_at: now
      };
      
      mockStorage.profiles.set(userId, profile);
      
      // Store in localStorage for persistence
      localStorage.setItem('mockUserProfile', JSON.stringify(profile));
      localStorage.setItem('mockUserIsAdmin', 'false');
      
      return { error: null };
    }
    
    try {
      // Test connection before trying to sign up
      const canConnect = await testConnection();
      if (!canConnect) {
        return { error: new Error("Unable to connect to the authentication service. Please try again later.") };
      }
      
      // Sign up the user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        if (error.message.includes('fetch')) {
          return { error: new Error("Connection issue. Please check your internet and try again.") };
        }
        return { error };
      }

      if (data.user) {
        // Create a profile for the user
        const { error: profileError } = await supabase.from('profiles').insert({
          id: data.user.id,
          first_name: userData.firstName,
          last_name: userData.lastName,
          email: email,
        });

        if (profileError) {
          console.error('Error creating profile:', profileError);
          return { error: profileError };
        }
      }

      toast({
        title: 'Account created',
        description: 'Your account has been created. Please check your email for verification.',
      });

      return { error: null };
    } catch (error) {
      console.error('Error signing up:', error);
      return { error };
    }
  };

  const signOut = async () => {
    if (isDevelopmentMode) {
      // Mock sign-out for development mode
      console.log('Development mode: mock sign-out');
      setUser(null);
      setSession(null);
      setProfile(null);
      setIsAdmin(false);
      
      // Clear localStorage
      localStorage.removeItem('mockUserId');
      localStorage.removeItem('mockUserProfile');
      localStorage.removeItem('mockUserIsAdmin');
      
      return;
    }
    
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const value = {
    user,
    profile,
    session,
    isLoading,
    signIn,
    signUp,
    signOut,
    isAdmin,
    connectionError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
