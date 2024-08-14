import {Box, Heading} from "../index.jsx";
import {Link} from "react-router-dom";

export const Navbar = () => (
    <Box
        as='header'
        className='w-full shadow-lg fixed top-0 left-0 right-0 z-30'
    >
        <Box
            as='nav'
            className='w-full p-6 ps-32 bg-primary'
            role='navigation'
            aria-label='main navigation'
            data-cy='navigation'
        >
            <Heading
                as='h1'
                className='font-bold text-white text-2xl'
                aria-label='navigation title'
            >
                <Link to='/' aria-label='back to home'>TO DO LIST APP</Link>
            </Heading>
        </Box>
    </Box>
);