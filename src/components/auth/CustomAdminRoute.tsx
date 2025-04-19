
import { Navigate } from "react-router-dom";
import { useCustomAuth } from "@/contexts/CustomAuthContext";

interface AdminRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

const CustomAdminRoute = ({ 
  children, 
  redirectTo = "/" 
}: AdminRouteProps) => {
  const { user, isLoading, isAdmin } = useCustomAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user || !isAdmin) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

export default CustomAdminRoute;
