import {Box, Text} from '../index.jsx'
import {IoAlertCircleOutline} from "react-icons/io5";

export const ALert = ({stateDelete}) => {
    return (
        <Box
            className={`w-[490px] flex items-center justify-start gap-3 p-4 bg-white shadow-lg rounded-lg absolute top-12 ${!stateDelete.alert ? '-translate-y-full opacity-0 -z-50' : 'translate-y-0 opacity-100 z-50'} transition-all duration-300`}>
            <IoAlertCircleOutline color='#00A790' size={20}/>
            <Text className='text-secondary'>Activity berhasil dihapus</Text>
        </Box>
    )
}