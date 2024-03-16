import { Navigate } from "react-router-dom";
import Cookies from 'js-cookie';

function ProtectedRoute({ isAuth, target, children }) {
    const token = Cookies.get('token');

    if (isAuth) {
        return token ? children : <Navigate to={target} replace />;
    }
    return token ? <Navigate to={target} replace /> : children;
}

export default ProtectedRoute;