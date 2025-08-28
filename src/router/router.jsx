import { createBrowserRouter } from "react-router";
import SignIn from "../pages/SignIn/SignIn"
import SignUp from "../pages/SignUp/SignUp"
import RootLayout from "../layout/RootLayout";

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
        path: "/signin",
        Component: SignIn
    },
    {
        path: "/signup",
        Component: SignUp
    }
]);

export default router