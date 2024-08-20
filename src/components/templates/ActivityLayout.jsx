import {Box, Header} from "../index.jsx";
import {Outlet} from "react-router-dom";
import {ActivityProvider} from "../../context/ActivityContext.jsx";
import {ActivityTodoProvider} from "../../context/ActivityTodoContext.jsx";

export const ActivityLayout = () => {

    return (
        <Box as="section">
            <ActivityProvider>
                <ActivityTodoProvider>
                    <Header />
                    <Box className="mt-6 lg:mt-12 w-full">
                        <Outlet/>
                    </Box>
                </ActivityTodoProvider>
            </ActivityProvider>
        </Box>
    );
};
