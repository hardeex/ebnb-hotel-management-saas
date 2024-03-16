import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// Define the ProtectedRoute component
const ProtectedRoute = ({ element, roles }) => {
  const { user } = useAuth();

  // Check if the user is authenticated and has the required role
  const isAuthorized = () => user && roles.includes(user.role);

  // Render the route only if the user is authenticated and has the required role
  return isAuthorized() ? element : <Navigate to="/" replace />;
};

export default ProtectedRoute;
