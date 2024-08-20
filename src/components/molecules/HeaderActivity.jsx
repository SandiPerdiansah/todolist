import {Box, HeaderButton, Heading} from "../index.jsx";

export const HeaderActivity = ({onCLick}) => (
    <>
        <Box>
            <Heading as='h2' className='text-secondary text-xl lg:text-3xl font-bold' data-cy='activity-title'>Activity</Heading>
        </Box>
        <HeaderButton onCLick={onCLick} dataCy='activity-add-button'/>
    </>
)