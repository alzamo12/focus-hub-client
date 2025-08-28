import { createBrowserRouter } from "react-router";
import SignIn from "../pages/SignIn/SignIn"
import SignUp from "../pages/SignUp/SignUp"
import RootLayout from "../layout/RootLayout";
import AuthLayout from "../layout/AuthLayout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,

            }
        ]
    },
    {
        path: '/auth',
        Component: AuthLayout,
        children: [
            {
                path: 'signin',
                Component: SignIn
            },
            {
                path: "signup",
                Component: SignUp
            }
        ]
    }
]);

export default router