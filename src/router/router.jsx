import { createBrowserRouter } from "react-router";
import SignIn from "../pages/SignIn/SignIn"
import SignUp from "../pages/SignUp/SignUp"
import RootLayout from "../layout/RootLayout";
import AuthLayout from "../layout/AuthLayout";
import Home from "../pages/home/Home";
import ClassScheduleTracker from "../pages/classScheduleTracker/ClassScheduleTracker";
import GenerateQuestions from "../pages/GenerateQuestions/GenerateQuestions";
import Budget from "../pages/Budget/Budget";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <PrivateRoute><RootLayout /></PrivateRoute>,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'class-schedule-tracker',
                Component: ClassScheduleTracker
            },
            {
                path: "generate-questions",
                Component: GenerateQuestions
            },
            {
                path: "budget",
                Component: Budget
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