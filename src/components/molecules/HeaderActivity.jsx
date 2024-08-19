import {Box, HeaderButton, Heading} from "../index.jsx";

export const HeaderActivity = ({onCLick}) => (
    <>
        <Box>
            <Heading as='h2' className='text-secondary text-3xl font-bold'>Activity</Heading>
        </Box>
        <HeaderButton onCLick={onCLick}/>
    </>
)