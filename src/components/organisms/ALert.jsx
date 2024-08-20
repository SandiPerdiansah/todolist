import {Box, Text} from '../index.jsx'
import {IoAlertCircleOutline} from "react-icons/io5";

export const Alert = ({stateDelete}) => {
    return (
        <Box
            data-cy='modal-information'
            role="alert"
            aria-live="assertive"
            className={`w-[300px] lg:w-[490px] flex items-center justify-start gap-3 p-2 lg:p-4 bg-white shadow-lg rounded-lg absolute top-12 ${!stateDelete.alert ? '-translate-y-full opacity-0 -z-50' : 'translate-y-0 opacity-100 z-50'} transition-all duration-300`}
        >
            <IoAlertCircleOutline color='#00A790' size={20} data-cy='modal-information-icon'/>
            <Text className='text-secondary lg:text-base text-[0.8rem]' data-cy='modal-information-title'>Activity berhasil dihapus</Text>
        </Box>
    )
}
