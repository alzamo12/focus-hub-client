import { createBrowserRouter } from "react-router";
import SignIn from "../pages/SignIn/SignIn"
import SignUp from "../pages/SignUp/SignUp"
import RootLayout from "../layout/RootLayout";
import AuthLayout from "../layout/AuthLayout";
import Home from "../pages/home/Home";
import ClassScheduleTracker from "../pages/classScheduleTracker/ClassScheduleTracker";
import GenerateQuestions from "../pages/GenerateQuestions/GenerateQuestions";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
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