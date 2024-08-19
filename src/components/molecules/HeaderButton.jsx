import {Box, Button, Text} from '../index.jsx';
import {GoPlus} from "react-icons/go";
import {memo} from "react";

export const HeaderButton = memo(({onCLick}) => {
    return (
        <Box>
            <Button
                type='button'
                aria-label='tambah activity'
                onClick={onCLick}
                className='flex items-center justify-center px-4 py-2 rounded-[45px] gap-2 bg-primary text-white'
            >
                <GoPlus aria-hidden='true' size={20} strokeWidth={1}/>
                <Text as='span' className='font-medium'>Tambah</Text>
            </Button>
        </Box>
    )
})