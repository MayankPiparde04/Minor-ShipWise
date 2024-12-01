import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const RouteTracker = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    sessionStorage.setItem("lastUrl", location.pathname);
  }, [location]);

  return children;
};

export default RouteTracker;
