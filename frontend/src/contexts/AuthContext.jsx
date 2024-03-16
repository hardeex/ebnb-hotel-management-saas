import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getUserFromLocalStorage());

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("userData", JSON.stringify(userData));
  };

  function getUserFromLocalStorage() {
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
  }

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userData");
    window.location = "/";
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export function useAuth() {
  return useContext(AuthContext);
}

{
  /* <img
style={{ height: "70%" }}
src={`${config.imageUrl}/${
  hotelImages.find((img) => img.hotelId === hotel.id)?.image
    ?.image_path
}`}
className="card-img-top"
alt=""
/> */
}
