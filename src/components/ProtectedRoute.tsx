import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { firebaseUser, isLoading } = useAuth();

  // Wait for Firebase to restore the session before deciding anything
  if (isLoading) {
    return (
      <div className="relative min-h-screen flex items-center justify-center bg-[#0a0014]">
        <p className="text-purple-300 font-exo tracking-widest animate-pulse">LOADING...</p>
      </div>
    );
  }

  if (!firebaseUser) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
