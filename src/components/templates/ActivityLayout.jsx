import {Box} from "../index.jsx";
import {Outlet} from "react-router-dom";

export const ActivityLayout = () => {
    return(
        <Box as='section'>
            <Outlet/>
        </Box>
    )
}