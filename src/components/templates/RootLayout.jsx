import {Outlet, useNavigation} from "react-router-dom";
import {Navbar} from "../index.jsx";
import {Loading} from "../organisms/Loading.jsx";

export const RootLayout = () => {
    const navigation = useNavigation();

    return (
        <>
            <Navbar/>
            {
                navigation.state === 'loading'
                    ? <Loading/>
                    : (
                        <main>
                            <Outlet/>
                        </main>
                    )
            }

        </>
    )
}