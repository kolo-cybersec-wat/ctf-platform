import {Navigate, Outlet, useLoaderData, useLocation} from "react-router-dom";
import {getSessionData} from "../../fetchUtils";

export const protectedRouteGroupLoader = () => {
    return getSessionData()
}

const ProtectedRoute = () => {
    const {is_authenticated, username} = useLoaderData()
    const {pathname} = useLocation()

    if(!is_authenticated)
        return <Navigate to={`/auth/login?next=${pathname}`} />

    return <Outlet />
}

export default ProtectedRoute