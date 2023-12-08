import {
    createBrowserRouter, Outlet, RouteObject,
    RouterProvider,
} from "react-router-dom";

import RootLayout, {rootLayoutLoader} from "./components/common/RootLayout";

import CompetitionsPage, {competitionsPageLoader} from "./pages/CompetitionsPage";
import CompetitionLayout, {competitionLayoutLoader} from "./components/common/CompetitionLayout";
import CompetitionAboutPage from "./pages/competition/CompetitionAbout";
import CompetitionTasksPage, {competitionTasksPageLoader} from "./pages/competition/CompetitionTasks";
import LoginPage from "./pages/auth/LoginPage";
import ProtectedRoute, {protectedRouteGroupLoader} from "./components/common/ProtectedRoute";
import CompetitionStatsPage, {competitionStatsPageLoader} from "./pages/competition/CompetitionStats";

const protectedRoutes: RouteObject[] = [
    {
        path: '/',
        element: <ProtectedRoute />,
        loader: protectedRouteGroupLoader,
        children: [
            {
                path: "/competition/:competitionSlug",
                element: <CompetitionLayout/>,
                loader: competitionLayoutLoader,
                id: 'competition-layout',
                children: [
                    {
                        path: "",
                        element: <CompetitionAboutPage/>,
                    },
                    {
                        path: "tasks",
                        element: <CompetitionTasksPage/>,
                        loader: competitionTasksPageLoader
                    },
                    {
                        path: "stats",
                        element: <CompetitionStatsPage/>,
                        loader: competitionStatsPageLoader
                    },
                ]
            },
        ]
    }
]

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <RootLayout/>,
        loader: rootLayoutLoader,
        children: [
            {
                path: "/",
                element: <CompetitionsPage/>,
                loader: competitionsPageLoader,
            },
            ...protectedRoutes
        ],
    },
    {
        path: "/auth",
        element: <Outlet />,
        children: [
            {
                path: "login",
                element: <LoginPage/>
            }
        ],
    },
]

const router = createBrowserRouter(routes);

export default router