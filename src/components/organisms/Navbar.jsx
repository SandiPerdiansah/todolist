import {Box, Heading} from "../index.jsx";
import {Link} from "react-router-dom";

export const Navbar = () => (
    <Box
        as='header'
        className='w-full shadow-lg fixed top-0 left-0 right-0 z-10'
    >
        <Box
            as='nav'
            className='w-full p-4 lg:p-6 lg:ps-32 bg-primary'
            role='navigation'
            aria-label='main navigation'
            data-cy='navigation'
        >
            <Heading
                as='h1'
                className='font-bold text-white text-xl lg:text-2xl'
                aria-label='navigation title'
                data-cy='header-title'
            >
                <Link to='/' aria-label='back to home'>TO DO LIST APP</Link>
            </Heading>
        </Box>
    </Box>
);