
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/use-toast';
import { toast as sonnerToast } from 'sonner';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { testConnection, isDevelopmentMode } from '@/lib/supabase';

// Modified schema to correctly handle the acceptTerms field
const formSchema = z.object({
  firstName: z.string().min(2, { message: 'First name is required' }),
  lastName: z.string().min(2, { message: 'Last name is required' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms and conditions to register',
  }),
});

type FormValues = z.infer<typeof formSchema>;

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const { signUp, connectionError: authConnectionError } = useAuth();
  const navigate = useNavigate();
  
  // Use the connection error from AuthContext if available
  useEffect(() => {
    if (authConnectionError) {
      setConnectionError(authConnectionError);
    }
  }, [authConnectionError]);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      acceptTerms: false,
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    setConnectionError(null);
    
    try {
      // In development mode, we'll skip the connection test
      let canConnect = true;
      if (!isDevelopmentMode) {
        canConnect = await testConnection();
        if (!canConnect) {
          setConnectionError("Unable to connect to the authentication service. Please try again later or contact support.");
          setIsLoading(false);
          return;
        }
      }
      
      const { error } = await signUp(
        data.email, 
        data.password, 
        { 
          firstName: data.firstName, 
          lastName: data.lastName 
        }
      );
      
      if (error) {
        if (error.message && error.message.includes('fetch')) {
          setConnectionError("Unable to connect to the authentication service. Please try again later.");
          console.error('Registration connection error:', error);
          sonnerToast.error("Connection Error", {
            description: "Could not connect to the authentication service. Please try again later.",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Registration failed",
            description: error.message || "An error occurred during registration. Please try again.",
          });
        }
      } else {
        toast({
          title: "Registration successful",
          description: "Welcome to PrintParadise! You can now sign in.",
        });
        sonnerToast.success("Account Created", {
          description: "Your account has been created successfully!",
        });
        
        navigate('/login');
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      
      if (error.message && error.message.includes('fetch')) {
        setConnectionError("Unable to connect to the authentication service. Please try again later.");
        sonnerToast.error("Connection Error", {
          description: "Could not connect to the authentication service. Check your connection and try again.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: error.message || "An error occurred during registration. Please try again.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Create an account</CardTitle>
        <CardDescription>Sign up to get started with PrintParadise</CardDescription>
        
        {isDevelopmentMode && (
          <div className="mt-2 text-xs text-amber-600 bg-amber-50 p-2 rounded">
            Running in development mode. All accounts are stored locally.
          </div>
        )}
      </CardHeader>
      <CardContent>
        {connectionError && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{connectionError}</AlertDescription>
          </Alert>
        )}
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="your.email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="acceptTerms"
              render={({ field }) => (
                <FormItem className="flex items-start space-x-2 pt-2">
                  <FormControl>
                    <Checkbox 
                      checked={field.value} 
                      onCheckedChange={(checked) => field.onChange(checked === true)}
                      id="terms"
                      aria-required="true"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel htmlFor="terms" className="text-sm font-normal cursor-pointer">
                      I agree to the{' '}
                      <Link to="/terms" className="text-primary hover:underline">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creating account...' : 'Create account'}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-center space-y-2">
        <div className="text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RegisterForm;
