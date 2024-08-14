import {Outlet} from "react-router-dom";
import {Navbar} from "../index.jsx";

export const RootLayout = () => {
    return(
        <>
            <Navbar/>
            <main>
                <Outlet/>
            </main>
        </>
    )
}