import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";

// pages
import {Activity} from "./pages/activity.jsx";

// layouts
import {RootLayout} from "./components/templates/RootLayout.jsx";
import {ActivityLayout} from "./components/templates/ActivityLayout.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<RootLayout/>}>
            <Route element={<ActivityLayout/>}>
                <Route index element={<Activity/>}/>
            </Route>
        </Route>
    )
)

export const App = () => {

    return (
        <RouterProvider router={router}/>
    )
}