import {createBrowserRouter, createRoutesFromElements, defer, Route, RouterProvider} from "react-router-dom";

// pages
import {Activity} from "./pages/activity.jsx";
import {ActivityTodo, activityTodoLoader} from "./pages/activityTodo.jsx";

// layouts
import {RootLayout} from "./components/templates/RootLayout.jsx";
import {ActivityLayout} from "./components/templates/ActivityLayout.jsx";
import {Loading} from "./components/organisms/Loading.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<RootLayout/>}>
            <Route element={<ActivityLayout/>}>
                <Route index element={<Activity/>}/>
                <Route
                    path=':id'
                    element={<ActivityTodo/>}
                    loader={({params}) => defer({
                        data: activityTodoLoader({params})
                    })}
                />
            </Route>
        </Route>
    )
)

export const App = () => {

    return (
        <RouterProvider router={router} fallbackElement={<Loading/>}/>
    )
}